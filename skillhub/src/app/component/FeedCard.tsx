"use client";
import * as React from 'react';
import {
  Box,
  Card,
  Avatar,
  Typography,
  IconButton,
  Chip,
  Button
} from '@mui/material';
import { red } from '@mui/material/colors';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ShareIcon from '@mui/icons-material/Share';
import {useRouter} from 'next/navigation';
import { downvoteArticle, getVotes, upvoteArticle } from '@/services/api';

/** Define an Article interface to specify the data shape. */
export interface Article {
  id: string;
  authorName: string;
  authorAvatarUrl: string;
  authorLevel: string;
  domain: string;
  tags: string[];
  title: string;
  shortSnippet: string;
  longSnippet: string;
  timeAgo: string;
  articleUrl?: string; // optionally have a URL for sharing
}

interface FeedCardProps {
  article: Article;  // The article data to display
}

/**
 * FeedCard: A reusable card that shows a snippet, upvote/downvote, etc.
 */
export default function FeedCard({ article }: FeedCardProps) {
  const [upvotes, setUpvotes] = React.useState(0);
  const [downvotes, setDownvotes] = React.useState(0);
  const [expanded, setExpanded] = React.useState(false);
  const router=useRouter();
  const handleTitleClick = () => {
    router.push(`/feed/articles/${article.id}`);
  };
  const {
    authorName,
    authorAvatarUrl,
    authorLevel,
    domain,
    tags,
    title,
    shortSnippet,
    longSnippet,
    timeAgo,
    articleUrl
  } = article;

  React.useEffect(() => {
    (async () => {
      try {
        const { upvotes: up, downvotes: down } = await getVotes(article.id);
        setUpvotes(up);
        setDownvotes(down);
      } catch (error) {
        console.error('Failed to get votes', error);
      }
    })();
  }, [article.id]);

  const handleUpvote = async () => {
    try {
      setUpvotes((prev) => prev + 1); 
      await upvoteArticle(article.id);
    } catch (error) {
      setUpvotes((prev) => prev - 1); 
      console.error('Failed to get votes', error);

    }
  };
  
  
  const handleDownvote = async () => {
    try {
      setDownvotes((prev) => prev + 1);
      await downvoteArticle(article.id);
    } catch (error) {
      console.error('Failed to downvote', error);
      alert('Failed to downvote');
      setDownvotes((prev) => (prev > 0 ? prev - 1 : 0));
    }
  };
  
  
  
  const handleExpandToggle = () => setExpanded((prev) => !prev);

  /** Copies the article URL (if available) to the clipboard. */
  const handleShare = async () => {
    if (!articleUrl) {
      alert('No URL available for this article.');
      return;
    }
    try {
      const fullUrl = window.location.origin + articleUrl;
      await navigator.clipboard.writeText(fullUrl);
      alert('Link copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy link: ', error);
      alert('Unable to copy. Please copy manually.');
    }
  };

  // Show short snippet unless expanded
  const displayedSnippet = expanded ? longSnippet : shortSnippet;
  const voteScore = upvotes - downvotes;

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 2,
        marginY: 2
      }}
    >
      {/* Avatar (left side) */}
      <Avatar
        alt={authorName}
        src={authorAvatarUrl}
        sx={{ bgcolor: red[500], width: 56, height: 56, marginRight: 2 }}
      />

      {/* Main content (right side) */}
      <Box sx={{ flex: 1 }}>
        {/* Author, time, domain */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, marginRight: 1 }}>
            {authorName}
          </Typography>
          {/* Example: Show the author level next to the name. */}
          <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic', marginRight: 2 }}>
            {authorLevel}
          </Typography>

          <Typography variant="caption" sx={{ color: 'text.secondary', marginRight: 2 }}>
            {timeAgo}
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
            {domain}
          </Typography>
        </Box>

        {/* Title */}
        <Typography variant="h5" sx={{ fontWeight: 700, marginBottom: 1 }}
        onClick={handleTitleClick}>
          {title}
          
        </Typography>

        {/* Tags as chips */}
        <Box sx={{ marginBottom: 1 }}>
          {Array.isArray(tags) && tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              variant="outlined"
              sx={{ marginRight: 1, marginBottom: 1 }}
            />
          ))}
        </Box>

        {/* Snippet (short or full) */}
        <Typography variant="body1" sx={{ color: 'text.secondary', marginBottom: 1 }}>
          {displayedSnippet}
        </Typography>

        {/* Expand / Collapse Button */}
        <Button variant="text" onClick={handleExpandToggle}>
          {expanded ? 'Show Less' : 'Read More'}
        </Button>

        {/* Upvote / Downvote / Share row */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
          <IconButton onClick={handleUpvote}>
            <ArrowUpwardIcon />
          </IconButton>
          {/* Score */}
          <Typography variant="body2" sx={{ minWidth: 30, textAlign: 'center' }}>
            {voteScore}
          </Typography>
          <IconButton onClick={handleDownvote}>
            <ArrowDownwardIcon />
          </IconButton>

          {/* Push share button to the far right */}
          <Box sx={{ flex: 1 }} />

          {/* Share button */}
          <IconButton onClick={handleShare}>
            <ShareIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}
