
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

export interface UpdateArticleForm {
  title: string;
  domain: string;
  content: string;
  tags: string;
}

export async function updateArticle(formData: UpdateArticleForm) {
  // Replace '/api/articles' with your real endpoint, e.g. `/api/articles/${id}`
  const response = await fetch('/api/articles', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });

  if (!response.ok) {
    // You can tailor the error message or response parsing as needed
    throw new Error('Failed to update article');
  }
}

