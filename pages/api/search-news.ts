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
    let articles: NewsArticle[] = [];

    if (!result.ok) {
      const errorData: unknown = await result.json().catch(() => null);
      console.error('[Search-News] API error:', errorData);

      if (isRateLimitError(errorData, result.status)) {
        articles = await fetchGNewsSearchResults(
          searchQuery,
          isDebugModeEnabled,
        );
        if (articles.length === 0) {
          return response.status(502).json({
            status: 'error',
            message:
              'NewsAPI rate limited and GNews fallback did not return results.',
          });
        }
      } else {
        return response
          .status(result.status)
          .json(errorData || { message: 'Unexpected NewsAPI error' });
      }
    } else {
      const newsResponse: NewsResponse = await result.json();
      articles = (
        Array.isArray(newsResponse.articles) ? newsResponse.articles : []
      ).map(cleanNewsArticle);
    }

    const uniqueArticles: NewsArticle[] =
      NewsArticleDeduplicator.deduplicate(articles);

    if (isDebugModeEnabled) {
      console.log('[Search-News] Response status:', result.status);
      console.log('[Search-News] Articles found:', articles.length);
      console.log('[Search-News] Unique articles:', uniqueArticles.length);
    }

    return response.status(200).json(uniqueArticles);

    async function fetchGNewsSearchResults(
      searchQuery: string,
      isDebugModeEnabled: boolean,
    ): Promise<NewsArticle[]> {
      const gnewsApiKey = process.env.GNEWS_API_KEY;
      if (!gnewsApiKey) {
        console.error(
          '[Search-News] Missing GNEWS_API_KEY for fallback search',
        );
        return [];
      }

      const encodedQuery = encodeURIComponent(searchQuery);
      const gNewsUrl = `https://gnews.io/api/v4/search?q=${encodedQuery}&lang=en&max=12&apikey=${gnewsApiKey}`;

      if (isDebugModeEnabled) {
        console.log('[Search-News] Falling back to GNews URL:', gNewsUrl);
      }

      const result = await fetch(gNewsUrl);
      if (!result.ok) {
        console.error(
          '[Search-News] GNews fallback error:',
          await result
            .text()
            .catch(() => 'Failed to parse GNews fallback response'),
        );
        return [];
      }

      const data = await result.json();
      const gNewsArticles = Array.isArray(data.articles) ? data.articles : [];

      return gNewsArticles
        .map((article: any) => ({
          author: article.source?.name ?? null,
          title: article.title ?? null,
          description: article.description ?? null,
          url: article.url,
          urlToImage: article.image ?? null,
          publishedAt: article.publishedAt ?? null,
          content: article.content ?? null,
        }))
        .map(cleanNewsArticle);
    }

    function isRateLimitError(errorData: unknown, status: number): boolean {
      if (status === 429) {
        return true;
      }

      if (!errorData || typeof errorData !== 'object') {
        return false;
      }

      const data = errorData as Record<string, unknown>;
      return (
        data.code === 'rateLimited' ||
        (typeof data.message === 'string' &&
          data.message.toLowerCase().includes('rate limit'))
      );
    }
  }
}
