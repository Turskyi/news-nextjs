import type { NextApiRequest, NextApiResponse } from 'next';
import { ConclusionArticle } from '../../models/ConclusionArticle';
import { NEWS_CONCLUSION_SYSTEM_PROMPT, NEWS_CONCLUSION_USER_PROMPT } from '../../constants/prompts';
import { getConclusionWithFallback } from '../../services/ai-orchestrator';

interface Input {
  articles: ConclusionArticle[];
}

/**
 * API endpoint for generating news conclusions.
 * No server-side caching is implemented as this endpoint is designed to work
 * exclusively with SWR (stale-while-revalidate) caching on the web client.
 */
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

  const input: Input = request.body;

  if (!input || !input.articles || input.articles.length === 0) {
    return response.status(400).json({
      error:
        'ಠ_ಠ Conclusion cannot be generated: ' +
        'Did not get a list of articles.',
    });
  }

  const newsString = input.articles
    .map((article: ConclusionArticle) => {
      let articlePrompt = `Title: ${article.title}`;

      if (article.description) {
        articlePrompt += `\nDescription: ${article.description}`;
      }

      if (article.articleText) {
        articlePrompt += `\nText: ${article.articleText}`;
      }

      return articlePrompt;
    })
    .join('\n\n');

  const conclusion = await getConclusionWithFallback(
    NEWS_CONCLUSION_SYSTEM_PROMPT,
    NEWS_CONCLUSION_USER_PROMPT(newsString),
  );

  return response
    .setHeader('Content-Type', 'application/json')
    .status(200)
    .json({ conclusion });
}
