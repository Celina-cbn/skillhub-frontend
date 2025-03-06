"use client"; 
import * as React from 'react';
import { Box, Card, Avatar, Typography, Chip, IconButton } from '@mui/material';
import { red } from '@mui/material/colors';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useParams } from 'next/navigation';

interface SingleArticle {
  id: string;
  authorName: string;
  authorAvatarUrl: string;
  authorLevel: string;
  domain: string;
  tags: string[];
  title: string;
  content: string; // Full content instead of short/long snippet
  timeAgo: string;
  articleUrl?: string;
}

export default function SingleArticlePage() {
  // We'll keep the article in state
  const params=useParams();
  const articleId=params.articleId as string ;
  const [article, setArticle] = React.useState<SingleArticle | null>(null);
  const [upvotes, setUpvotes] = React.useState<number>(0);
  const [downvotes, setDownvotes] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(true);
//for mock data 
  React.useEffect(() => {
    // Simulate fetching a single article (replace with your real API)
    (async () => {
      try {
        setLoading(true);
        // Fake a 1-second delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Mocked single-article data
        const mockArticle: SingleArticle = {
          id:articleId ,
          authorName: 'Arvind Kumar',
          authorAvatarUrl: '/static/images/avatar1.jpg',
          authorLevel: 'lvl: 9999',
          domain: 'Programming',
          tags: ['Java', 'Interview', 'Advanced'],
          title: 'Deep Dive into Java Interview Q&A',
          content:
            'This article covers concurrency, memory management, and more. Understanding these ' +
            'concepts significantly improves your performance in advanced Java interviews. Dive ' +
            'into common concurrency pitfalls, how the JVM manages memory, and how to write ' +
            'efficient multi-threaded code.',
          timeAgo: '21h ago',
          articleUrl:  `/feed/articles/${articleId}`
        };

        // Set that in state
        setArticle(mockArticle);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  },[articleId]);


  // Handler for up/down vote
  const handleUpvote = () => setUpvotes((prev) => prev + 1);
  const handleDownvote = () => setDownvotes((prev) => prev + 1);

  // If still loading, show a placeholder (e.g., spinner)
  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Typography>Loading article...</Typography>
      </Box>
    );
  }

  // If no article was found/fetched
  if (!article) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Typography variant="h6" color="error">
          Article not found.
        </Typography>
      </Box>
    );
  }

  // Render the single article in a Card
  return (
    <Box sx={{ padding: 2, maxWidth: 800, margin: '0 auto' }}>
      <Card sx={{ padding: 2 }}>
        {/* Author info row */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', marginBottom: 2 }}>
          <Avatar
            alt={article.authorName}
            src={article.authorAvatarUrl}
            sx={{ bgcolor: red[500], width: 56, height: 56, marginRight: 2 }}
          />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {article.authorName}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary', marginRight: 1 }}>
              {article.timeAgo}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', fontStyle: 'italic', marginLeft: 1 }}
            >
              {article.domain}
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', fontStyle: 'italic', marginLeft: 2 }}
            >
              {article.authorLevel}
            </Typography>
          </Box>
        </Box>

        {/* Title */}
        <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 2 }}>
          {article.title}
        </Typography>

        {/* Tags as Chips */}
        <Box sx={{ marginBottom: 2 }}>
          {article.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              variant="outlined"
              sx={{ marginRight: 1, marginBottom: 1 }}
            />
          ))}
        </Box>

        {/* Full content */}
        <Typography variant="body1" sx={{ color: 'text.secondary', marginBottom: 2 }}>
          {article.content}
        </Typography>

        {/* Upvote / Downvote row */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton onClick={handleUpvote}>
            <ArrowUpwardIcon />
          </IconButton>
          <Typography variant="body2" sx={{ minWidth: 30, textAlign: 'center' }}>
            {upvotes - downvotes}
          </Typography>
          <IconButton onClick={handleDownvote}>
            <ArrowDownwardIcon />
          </IconButton>
        </Box>
      </Card>
    </Box>
  );
}
