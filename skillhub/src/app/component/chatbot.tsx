import React, { useState } from 'react';
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

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { text: message, sender: 'user' }]);
      setMessage('');
    }
  };

  return (
    <Box>
      {!open && (
        <IconButton
          color="primary"
          onClick={() => setOpen(true)}
          sx={{ position: 'fixed', bottom: 20, right: 20, backgroundColor: 'blue', '&:hover': { backgroundColor: 'darkblue' } }}
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
            {messages.reverse().map((msg, index) => (
              <Box key={index} sx={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                {msg.sender !== 'user' && (
                  <Box sx={{ marginRight: 1 }}>
                    <img src="https://img.freepik.com/vecteurs-libre/robot-vectoriel-graident-ai_78370-4114.jpg" alt="sender" style={{ width: 30, height: 30, borderRadius: '50%' }} />
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
                  {msg.text}
                </Typography>
              </Box>
            ))}
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
