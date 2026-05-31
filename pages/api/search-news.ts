// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NewsResponse } from '@/models/NewsArticles';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization',
  );

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  const searchQuery = request.query.q?.toString();
  if (!searchQuery) {
    return response.status(400).json({ errorMessage: 'Please provide a search query' });
  } else {
    const result = await fetch(
      `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${process.env.NEWS_API_KEY}`,
    );

    if (!result.ok) {
      const errorData = await result.json();
      console.error('Search API error:', errorData);
      return response.status(result.status).json(errorData);
    }

    const newsResponse: NewsResponse = await result.json();
    return response.status(200).json(newsResponse.articles || []);
  }
}
