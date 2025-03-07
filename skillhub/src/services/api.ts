
export const BASE_URL = 'https://my-backend.com/api'; 

export interface ArticleForm {
  title: string;
  domain: string;
  content: string;
  tags: string;
}
export interface VoteData {
  upvotes: number;
  downvotes: number;
}

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
export async function createArticle(formData: ArticleForm): Promise<void> {
  const response = await fetch(`${BASE_URL}/articles`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error('Failed to create article');
  }
}
export async function updateArticle(articleId: string, formData: ArticleForm): Promise<void> {
  const response = await fetch(`${BASE_URL}/articles/${articleId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error('Failed to update article');
  }
}
export async function deleteArticle(articleId: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/articles/${articleId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete article');
  }
}
export async function upvoteArticle(articleId: string): Promise<void> {
  // Adjust the URL and request body to match your real back end
  const response = await fetch('/votes/upvote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ articleId })
  });
  if (!response.ok) {
    throw new Error('Failed to upvote article');
  }
}
export async function downvoteArticle(articleId: string): Promise<void> {
  const response = await fetch('/votes/downvote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ articleId })
  });
  if (!response.ok) {
    throw new Error('Failed to downvote article');
  }
}
export async function getVotes(articleId: string): Promise<VoteData> {
  const response = await fetch(`/votes/${articleId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch votes');
  }
  return response.json(); 
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getLeaderboard(): Promise<any> {
  const response = await fetch(`${BASE_URL}/leaderboard`);
  if (!response.ok) {
    throw new Error('Failed to fetch leaderboard');
  }
  return response.json(); // shape depends on your server's response
}
