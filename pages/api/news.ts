// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { DEFAULT_COUNTRY_CODE } from '@/constants';
import { NewsResponse } from '@/models/NewsArticles';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
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

  const countryCode = request.query.country || DEFAULT_COUNTRY_CODE;

  const result = await fetch(
    `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${process.env.NEWS_API_KEY}`,
  );
  const newsResponse: NewsResponse = await result.json();
  return response.status(200).json(newsResponse.articles);
}
