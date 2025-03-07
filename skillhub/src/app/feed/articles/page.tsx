"use client";
import * as React from 'react';
import FeedCard, { Article } from '../../component/FeedCard';
import { Box } from '@mui/material';
//import  { useRouter } from 'next/navigation';
import NavBar from '@/app/component/NavBar';



  

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

  
  const filteredArticles = React.useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return articles; // if no search, show all
    return articles.filter((article) =>
      article.title.toLowerCase().includes(term) ||
      article.authorName.toLowerCase().includes(term)
    );
  }, [searchTerm, articles]);



  
  

return (
   <><NavBar
    searchTerm={searchTerm}
    onSearchTermChange={(newTerm) => setSearchTerm(newTerm)} /><Box sx={{ padding: 2, maxWidth: 800, margin: '0 auto' }}>

      <Box sx={{ minHeight: '100vh', padding: 2 }}>

        {/* Render articles (filtered by search) */}
        <Box sx={{ maxWidth: 800, margin: '0 auto', marginTop: 2 }}>
          {filteredArticles.map((article) => (
            <FeedCard key={article.id} article={article} />

          ))}
        </Box>
      </Box>
    </Box></>
 
);
  
}
