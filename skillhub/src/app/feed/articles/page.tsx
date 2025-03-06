"use client";
import * as React from 'react';
import FeedCard, { Article } from '../../component/FeedCard';
import { alpha, AppBar, Box, IconButton, InputBase, styled, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';


// ----- MUI Search styles from the snippet -----
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '14ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
// ----- End of MUI Search styles -----

export default function ArticlesPage() {
  // Local state for articles array and loading indicator
  const [articles, setArticles] = React.useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = React.useState<string>("");

  React.useEffect(() => {
    (async () => {
      try {
       
        // Mock data
        const mockApiData: Article[] = [
          {
            id: '007',
            authorLevel: 'lv: 99999',
            authorName: 'Arvind Kumar',
            authorAvatarUrl: '/static/images/avatar1.jpg',
            domain: 'Programming',
            tags: ['Java', 'Interview', 'Q&A'],
            title: 'Java Interview QnA (Part-3)',
            shortSnippet: 'Quick summary about concurrency, memory management...',
            longSnippet:
              'These advanced Java interview questions provide deeper insights into concurrency...',
            timeAgo: '21h ago',
            articleUrl: '/articles/java-qna-part3'
          },
          {
            id: '008',
            authorLevel: 'lv: 100',
            authorName: 'Jane Doe',
            authorAvatarUrl: '/static/images/avatar2.jpg',
            domain: 'Web Development',
            tags: ['React', 'Hooks', 'UI'],
            title: 'Mastering React Hooks',
            shortSnippet: 'An introduction to React Hooks and why they matter...',
            longSnippet:
              'React Hooks drastically simplify the way we manage state and lifecycle in functional components...',
            timeAgo: '1 day ago',
            articleUrl: '/articles/mastering-react-hooks'
          }
        ];

        // Set mock data
        setArticles(mockApiData);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  
 // return (
 //   <Box sx={{ padding: 2, maxWidth: 800, margin: '0 auto' }}>
 //     {articles.map((article) => (
 //       <FeedCard key={article.id} article={article} />
 //     ))}
 //   </Box>
 // );
 // Filter articles based on the searchTerm (case-insensitive, by title)
 const filteredArticles = (() => {
  const term = searchTerm.toLowerCase().trim();
  if (!term) return articles; // No search => show all
  return articles.filter(
    (article) =>
      article.title.toLowerCase().includes(term) ||
      article.authorName.toLowerCase().includes(term)
  );
})();

return (
 <Box sx={{minHeight: '100vh', padding: 2 }}>
   {/* MUI AppBar with custom search styling */}
   <AppBar position="static">
     <Toolbar>
       {/* Example Menu Icon Button */}
       <IconButton
         size="large"
         edge="start"
         color="inherit"
         aria-label="open drawer"
         sx={{ mr: 2 }}
       >
         <MenuIcon />
       </IconButton>

       {/* Page/brand title */}
       <Typography
         variant="h6"
         noWrap
         component="div"
         sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
       >
         MUI
       </Typography>

       {/* Our Search "box" */}
       <Search>
         <SearchIconWrapper>
           <SearchIcon />
         </SearchIconWrapper>
         <StyledInputBase
           placeholder="Search…"
           inputProps={{ 'aria-label': 'search' }}
           value={searchTerm}
           onChange={(e) => setSearchTerm(e.target.value)}
         />
       </Search>
     </Toolbar>
   </AppBar>

   {/* Render articles (filtered by search) */}
   <Box sx={{ maxWidth: 800, margin: '0 auto', marginTop: 2 }}>
     {filteredArticles.map((article) => (
       <FeedCard key={article.id} article={article} />
     ))}
   </Box>
 </Box>
);
  
}
