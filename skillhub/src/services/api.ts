
export const BASE_URL = 'https://my-backend.com/api'; 



export async function getArticleById(articleId: string) {
  const response = await fetch(`${BASE_URL}/articles/${articleId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch article');
  }
  return response.json(); 
}


export async function getAllArticles() {
  const response = await fetch(`${BASE_URL}/articles`);
  if (!response.ok) {
    throw new Error('Failed to fetch articles');
  }
  return response.json(); 
}


