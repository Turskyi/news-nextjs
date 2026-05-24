// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { DEFAULT_COUNTRY_CODE } from '@/constants';
import { NewsResponse } from '@/models/NewsArticles';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  response.setHeader(
    'Access-Control-Allow-Origin',
    'https://news-glance-ai.web.app',
  );
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization',
  );

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  const countryCodeQuery = request.query.country;
  const countryCode: string =
    typeof countryCodeQuery === 'string'
      ? countryCodeQuery
      : DEFAULT_COUNTRY_CODE;

  let url: string;
  if (
    countryCode.toLowerCase() === 'intl' ||
    countryCode.toLowerCase() === 'international'
  ) {
    const sources =
      'bbc-news,cnn,reuters,al-jazeera-english,the-wall-street-journal';
    url = `https://newsapi.org/v2/top-headlines?sources=${sources}&apiKey=${process.env.NEWS_API_KEY}`;
  } else {
    url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${process.env.NEWS_API_KEY}`;
  }

  const result = await fetch(url);

  if (!result.ok) {
    const errorData = await result.json();
    console.error('News API error:', errorData);
    return response.status(result.status).json(errorData);
  }

  const newsResponse: NewsResponse = await result.json();
  return response.status(200).json(newsResponse.articles || []);
}
