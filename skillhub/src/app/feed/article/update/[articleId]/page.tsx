"use client";
import * as React from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress} from '@mui/material';
import { getArticleById, updateArticle } from '@/services/api';
import NavBar from '@/app/component/NavBar';
import { useParams } from 'next/navigation';



// You can customize the interface fields as needed
interface UpdateArticleForm {
  title: string;
  domain: string;
  content: string;
  tags: string;     
}

export default function UpdateArticlePage() {
    const [searchTerm, setSearchTerm] = React.useState<string>("");
    const params = useParams();
    const articleId = params.articleId as string;
  
  // State for your form
  const [formData, setFormData] = React.useState<UpdateArticleForm>({
    title: '',
    domain: '',
    content: '',
    tags: '',
  });

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);


 React.useEffect(() => {
  (async () => {
    try {
      setError(null);
      setLoading(true);
      const existingArticle = await getArticleById(articleId);
      setFormData({
        title: existingArticle.title || '',
        domain: existingArticle.domain || '',
        content: existingArticle.content || '',
        tags: existingArticle.tags || '',
      });
    } catch (err) {
      console.error(err);
      setError('Failed to load the article.');
    } finally {
      setLoading(false);
    }
  })();
}, [articleId]);

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
      // If `article` is in your props or state, you have `article.id`
      await updateArticle(articleId, formData);
      alert('Article updated successfully!');
    } catch (error) {
      console.error(error);
      alert('Error updating article.');
    }
  };
  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

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
