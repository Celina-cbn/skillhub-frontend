"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Box, IconButton, TextField, Button, Typography, Paper, Divider } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';

type Message = {
  text: string;
  sender: string;
};

const FloatingChatWindow = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [animatedMessage, setAnimatedMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement | null>(null); // Reference to scroll to the bottom

  const handleSend = async () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: 'user' }]);
      setMessage('');

      let history = messages.length
        ? messages.map((msg) => `role :${msg.sender}, content :${msg.text}\n`).join('')
        : message;

      let type = messages.length ? 'start' : '';
      console.log(history);
      console.log(message);
      try {
        const response = await fetch('http://2080-94-228-190-38.ngrok-free.app/chatbot/chatbot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ history: history, type: type, message: `role : user, ${message}` }),
        });

        if (response.ok) {
          const data = await response.json();
          setMessages((prevMessages) => [...prevMessages, { text: '', sender: 'assistant' }]);
          animateMessage(data.summary);
        } else {
          console.error('Failed to send message');
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const animateMessage = (text: string) => {
    let index = 0;
    setAnimatedMessage('');

    const interval = setInterval(() => {
      setAnimatedMessage((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          updatedMessages[updatedMessages.length - 1].text = text;
          return updatedMessages;
        });
        setAnimatedMessage('');
      }
    }, 10);
  };

  // Scroll to the bottom whenever a new message is added or after animation is complete
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, animatedMessage]); // Trigger scroll when messages or animatedMessage changes

  return (
    <Box>
      {!open && (
        <IconButton
          color="primary"
          onClick={() => setOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            backgroundColor: 'blue',
            '&:hover': { backgroundColor: 'darkblue' },
          }}
        >
          <ChatIcon sx={{ color: 'white' }} />
        </IconButton>
      )}

      {open && (
        <Box
          component={Paper}
          sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            width: 300,
            height: 400,
            padding: 2,
            boxShadow: 3,
            borderRadius: 2,
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Chat</Typography>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider sx={{ marginY: 1 }} />
          <Box
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              marginBottom: 1,
              border: 'solid lightgray',
              padding: 1,
            }}
          >
            {messages.map((msg, index) => (
              <Box key={index} sx={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                {msg.sender !== 'user' && (
                  <Box sx={{ marginRight: 1 }}>
                    <img
                      src="https://img.freepik.com/vecteurs-libre/robot-vectoriel-graident-ai_78370-4114.jpg"
                      alt="sender"
                      style={{ width: 30, height: 30, borderRadius: '50%' }}
                    />
                  </Box>
                )}
                <Typography
                  variant="body2"
                  sx={{
                    backgroundColor: msg.sender === 'user' ? 'lightblue' : 'lightgray',
                    padding: 1,
                    borderRadius: 1,
                    wordWrap: 'break-word',
                  }}
                >
                  {msg.sender === 'assistant' && index === messages.length - 1 && animatedMessage
                    ? animatedMessage
                    : msg.text}
                </Typography>
              </Box>
            ))}
            <div ref={chatEndRef} /> {/* Invisible div to scroll to the bottom */}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              variant="outlined"
              label="Your Question"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={handleSend} color="primary" size="small" startIcon={<SendIcon />} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default FloatingChatWindow;
