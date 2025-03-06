"use client";
import * as React from 'react';
import {
  Box,
  TextField,
  Button,
  Typography
} from '@mui/material';

interface NewArticleForm {
  title: string;
  domain: string;
  content: string;
  tags: string;     
  
}

export default function CreateArticlePage() {
 

  const [formData, setFormData] = React.useState<NewArticleForm>({
    title: '',
    domain: '',
    content: '',
    tags: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Submit the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Example: POST to some endpoint
      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to create article');
      }

      alert('Article created successfully!');

      // Optionally redirect or reset the form
      // const newArticle = await response.json();
      // router.push(`/feed/articles/${newArticle.id}`);

    } catch (error) {
      console.error(error);
      alert('Error creating article.');
    }
  };

  return (
    <Box sx={{ padding: 3, maxWidth: 800, margin: '0 auto' }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Create New Article
      </Typography>

     
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
         
          
        />

        {/* Domain */}
        <TextField
          label="Domain"
          name="domain"
          value={formData.domain}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        {/* Tags */}
        <TextField
          label="Tags (comma-separated)"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        {/* Content (bigger multiline) */}
        <TextField
          label="Content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={8}  // bigger text area
          required
        />

    

        <Button 
          type="submit" 
          variant="contained" 
          sx={{ marginTop: 2 }}
        >
          Create Article
        </Button>
      </form>
    </Box>
  );
}
