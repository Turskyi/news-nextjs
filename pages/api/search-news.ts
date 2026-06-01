// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NewsArticle, NewsResponse } from '@/models/NewsArticles';
import type { NextApiRequest, NextApiResponse } from 'next';
import { cleanNewsArticle } from '@/services/newsContentCleaner';
import { NewsArticleDeduplicator } from '@/services/NewsArticleDeduplicator';

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

  const searchQuery: string | undefined = request.query.q?.toString();
  const isDebugModeEnabled: boolean = request.query.debug === 'true';

  if (isDebugModeEnabled) {
    console.log('[Search-News] Incoming search query:', searchQuery);
  }

  if (!searchQuery) {
    return response
      .status(400)
      .json({ errorMessage: 'Please provide a search query' });
  } else {
    const apiUrl: string = `https://newsapi.org/v2/everything?q=${searchQuery}&apiKey=${process.env.NEWS_API_KEY}`;

    if (isDebugModeEnabled) {
      console.log('[Search-News] Requesting NewsAPI URL:', apiUrl);
    }

    const result: Response = await fetch(apiUrl);

    if (!result.ok) {
      const errorData: unknown = await result.json();
      console.error('[Search-News] API error:', errorData);
      return response.status(result.status).json(errorData);
    }

    const newsResponse: NewsResponse = await result.json();
    const articles: NewsArticle[] = (newsResponse.articles || []).map(
      cleanNewsArticle,
    );
    const uniqueArticles: NewsArticle[] =
      NewsArticleDeduplicator.deduplicate(articles);

    if (isDebugModeEnabled) {
      console.log('[Search-News] Response status:', result.status);
      console.log('[Search-News] Articles found:', articles.length);
      console.log('[Search-News] Unique articles:', uniqueArticles.length);
    }

    return response.status(200).json(uniqueArticles);
  }
}
