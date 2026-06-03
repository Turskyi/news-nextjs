import { DEFAULT_COUNTRY_CODE } from '@/constants';
import { NewsArticle, NewsResponse } from '@/models/NewsArticles';
import { cleanNewsArticle } from '@/services/newsContentCleaner';
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

  const countryCodeQuery = request.query.country;
  let countryCode: string =
    typeof countryCodeQuery === 'string'
      ? countryCodeQuery
      : DEFAULT_COUNTRY_CODE;

  let articles: NewsArticle[] = [];

  try {
    if (
      countryCode.toLowerCase() === 'ua' ||
      countryCode.toLowerCase() === 'uk'
    ) {
      // Use GNews for Ukrainian news as NewsAPI has limited coverage.
      // The `max=12` is ignored as per https://gnews.io/pricing and returns
      // only 10.
      const gNewsUrl = `https://gnews.io/api/v4/top-headlines?category=general&lang=uk&country=ua&max=12&apikey=${process.env.GNEWS_API_KEY}`;
      const result = await fetch(gNewsUrl);

      if (result.ok) {
        const data = await result.json();
        const gNewsArticles = data.articles || [];

        articles = gNewsArticles
          .map((article: any) => ({
            title: article.title,
            description: article.description,
            content: article.content,
            url: article.url,
            urlToImage: article.image, // Map 'image' to 'urlToImage'
            publishedAt: article.publishedAt,
          }))
          .map(cleanNewsArticle);
      } else {
        console.error('GNews API error:', await result.text());
      }
    } else {
      // Use NewsAPI for international/other news
      let url: string;
      if (
        countryCode.toLowerCase() === 'intl' ||
        countryCode.toLowerCase() === 'international'
      ) {
        const sources =
          'bbc-news,cnn,reuters,al-jazeera-english,the-wall-street-journal,kyivpost';
        url = `https://newsapi.org/v2/top-headlines?sources=${sources}&apiKey=${process.env.NEWS_API_KEY}`;
      } else {
        url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${process.env.NEWS_API_KEY}`;
      }

      const result = await fetch(url);
      if (result.ok) {
        const newsResponse: NewsResponse = await result.json();
        articles = (
          Array.isArray(newsResponse.articles) ? newsResponse.articles : []
        ).map(cleanNewsArticle);
      } else {
        const errorData = await result.json().catch(() => null);
        console.error('News API error:', errorData);

        if (isRateLimitError(errorData, result.status)) {
          articles = await fetchGNewsTopHeadlinesFallback(countryCode);
        }
      }
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }

  return response.status(200).json(articles.filter(isArticleUseful));
}

async function fetchGNewsTopHeadlinesFallback(
  countryCode: string,
): Promise<NewsArticle[]> {
  const gnewsApiKey = process.env.GNEWS_API_KEY;
  if (!gnewsApiKey) {
    console.error('[news] Missing GNEWS_API_KEY for fallback');
    return [];
  }

  const normalizedCountry = countryCode.toLowerCase();
  const isInternational =
    normalizedCountry === 'intl' || normalizedCountry === 'international';

  let gNewsUrl =
    'https://gnews.io/api/v4/top-headlines?lang=en&max=12&apikey=' +
    encodeURIComponent(gnewsApiKey);

  if (!isInternational) {
    gNewsUrl =
      'https://gnews.io/api/v4/top-headlines?lang=en&max=12&country=' +
      encodeURIComponent(normalizedCountry) +
      '&apikey=' +
      encodeURIComponent(gnewsApiKey);
  }

  const result = await fetch(gNewsUrl);
  if (!result.ok) {
    console.error(
      '[news] GNews fallback error:',
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
      content: article.content ?? null,
      url: article.url,
      urlToImage: article.image ?? null,
      publishedAt: article.publishedAt ?? null,
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

function isArticleUseful(article: NewsArticle): boolean {
  const title: string = article.title ?? '';
  const description: string = article.description ?? '';
  const url: string = article.url ?? '';

  if (title.toLowerCase() === '[removed]') {
    return false;
  } else {
    const uselessPhrases: string[] = [
      'log in to your',
      'sign in to your',
      'subscribe to',
      'create an account',
      'for a more personal',
      'cookie policy',
      'privacy policy',
      'terms of service',
    ];

    const lowercaseTitle: string = title.toLowerCase();
    const lowercaseDescription: string = description.toLowerCase();

    const isUseless: boolean = uselessPhrases.some(
      (phrase: string) =>
        lowercaseTitle.includes(phrase) ||
        lowercaseDescription.includes(phrase),
    );

    if (isUseless) {
      return false;
    } else {
      const uselessUrlKeywords: string[] = [
        '/login',
        '/signup',
        '/subscribe',
        'all-access',
      ];
      const lowercaseUrl: string = url.toLowerCase();
      if (
        uselessUrlKeywords.some((keyword: string) =>
          lowercaseUrl.includes(keyword),
        )
      ) {
        return false;
      } else {
        return true;
      }
    }
  }
}
