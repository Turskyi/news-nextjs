import type { NextApiRequest, NextApiResponse } from 'next';
import { ConclusionArticle } from '../../models/ConclusionArticle';
import { NEWS_CONCLUSION_SYSTEM_PROMPT, NEWS_CONCLUSION_USER_PROMPT } from '../../constants/prompts';
import { getConclusionWithFallback } from '../../services/ai-orchestrator';

interface Input {
  articles: ConclusionArticle[];
}

interface Cache {
  conclusion: string;
  timestamp: number;
}

let cache: Cache | null = null;

/**
 * API endpoint that provides news conclusions in plain text format.
 * Since this response may be used with the mobile app's text-to-speech feature,
 * we avoid using Markdown, emojis, or any non-text formatting.
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
    return response
      .status(400)
      .json({ error: 'Please provide a list of articles ಠ_ಠ' });
  }

  const now = Date.now();
  const fourHours = 4 * 60 * 60 * 1000;

  if (cache && now - cache.timestamp < fourHours) {
    return response.status(200).json({ conclusion: cache.conclusion });
  }

  const newsString = input.articles.map((article: ConclusionArticle) => {
    let content = `Title: ${article.title}`;
    if (article.description) {
      content += `\nDescription: ${article.description}`;
    }
    if (article.articleText) {
      content += `\nText: ${article.articleText}`;
    }
    return content;
  }).join('\n\n');

  const conclusion = await getConclusionWithFallback(
    NEWS_CONCLUSION_SYSTEM_PROMPT,
    NEWS_CONCLUSION_USER_PROMPT(newsString),
  );

  cache = {
    conclusion,
    timestamp: now,
  };

  return response
    .setHeader('Content-Type', 'application/json')
    .status(200)
    .json({ conclusion });
}
