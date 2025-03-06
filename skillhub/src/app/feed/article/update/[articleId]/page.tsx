"use client";
import * as React from 'react';
import {
  Box,
  TextField,
  Button,
  Typography
} from '@mui/material';
import { updateArticle } from '@/services/api';
import NavBar from '@/app/component/NavBar';



// You can customize the interface fields as needed
interface UpdateArticleForm {
  title: string;
  domain: string;
  content: string;
  tags: string;     
}

export default function UpdateArticlePage() {
    const [searchTerm, setSearchTerm] = React.useState<string>("");
  
  // State for your form
  const [formData, setFormData] = React.useState<UpdateArticleForm>({
    title: '',
    domain: '',
    content: '',
    tags: '',
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Submit the form with a PUT request
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        await updateArticle(formData);
      alert('Article updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Error updating article.');
    }
  };

  return (
    <><NavBar
      searchTerm={searchTerm}
      onSearchTermChange={(newTerm) => setSearchTerm(newTerm)} /><Box sx={{ padding: 3, maxWidth: 800, margin: '0 auto' }}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          Update Article
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
            required />

          {/* Domain */}
          <TextField
            label="Domain"
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            fullWidth
            margin="normal" />

          {/* Tags */}
          <TextField
            label="Tags (comma-separated)"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            fullWidth
            margin="normal" />

          {/* Content */}
          <TextField
            label="Content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={8}
            required />

          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: 2 }}
          >
            Update Article
          </Button>
        </form>
      </Box></>
  );
}
