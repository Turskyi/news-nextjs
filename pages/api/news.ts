import { DEFAULT_COUNTRY_CODE } from '@/constants';
import { NewsArticle, NewsResponse } from '@/models/NewsArticles';
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
  let countryCode: string =
    typeof countryCodeQuery === 'string'
      ? countryCodeQuery
      : DEFAULT_COUNTRY_CODE;

  let articles: NewsArticle[] = [];

  try {
    if (countryCode.toLowerCase() === 'ua' || countryCode.toLowerCase() === 'uk') {
      // Use GNews for Ukrainian news as NewsAPI has limited coverage
      const gNewsUrl = `https://gnews.io/api/v4/top-headlines?category=general&lang=uk&country=ua&apikey=${process.env.GNEWS_API_KEY}`;
      const result = await fetch(gNewsUrl);

      if (result.ok) {
        const data = await result.json();
        const gNewsArticles = data.articles || [];
        articles = gNewsArticles.map((article: any) => ({
          title: article.title,
          description: article.description,
          content: article.content,
          url: article.url,
          urlToImage: article.image, // Map 'image' to 'urlToImage'
          publishedAt: article.publishedAt,
        }));
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
        const sources = 'bbc-news,cnn,reuters,al-jazeera-english,the-wall-street-journal';
        url = `https://newsapi.org/v2/top-headlines?sources=${sources}&apiKey=${process.env.NEWS_API_KEY}`;
      } else {
        url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&apiKey=${process.env.NEWS_API_KEY}`;
      }

      const result = await fetch(url);
      if (result.ok) {
        const newsResponse: NewsResponse = await result.json();
        articles = newsResponse.articles || [];
      } else {
        console.error('News API error:', await result.text());
      }
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }

  return response.status(200).json(articles);
}
