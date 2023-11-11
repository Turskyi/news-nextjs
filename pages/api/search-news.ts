// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NewsResponse } from '@/models/NewsArticles';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const searchQuery = request.query.q?.toString();
  if (!searchQuery) {
    return response.status(400).json({ errorMessage: 'Please provide a search query' });
  } else {
    const result = await fetch(`https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${process.env.NEWS_API_KEY}`);
    const newsResponse: NewsResponse = await result.json();
    return response.status(200).json(newsResponse.articles);
  }
}
