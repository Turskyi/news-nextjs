import type { NextApiRequest, NextApiResponse } from 'next';
import { ConclusionArticle } from '../../models/ConclusionArticle';
import { NEWS_CONCLUSION_SYSTEM_PROMPT, NEWS_CONCLUSION_USER_PROMPT } from '../../constants/prompts';
import { getConclusionWithFallback } from '../../services/ai-orchestrator';
import { ActionableInsight, SignalLevel, InsightCategory } from '../../models/ActionableInsight';

interface Input {
  articles: ConclusionArticle[];
  lang?: string;
}

interface CacheEntry {
  conclusion: string;
  timestamp: number;
}

const cache: Record<string, CacheEntry> = {};

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

  const input: Input = request.body;
  const lang = input.lang || 'en';

  if (!input || !input.articles || input.articles.length === 0) {
    return response
      .status(400)
      .json({ error: 'Please provide a list of articles ಠ_ಠ' });
  }

  const now = Date.now();
  const fourHours = 4 * 60 * 60 * 1000;

  if (cache[lang] && now - cache[lang].timestamp < fourHours) {
    return response.status(200).json({ conclusion: cache[lang].conclusion });
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

  const langInstruction = input.lang === 'uk'
    ? 'IMPORTANT: The response MUST be in Ukrainian.'
    : 'IMPORTANT: The response MUST be in English.';

  const conclusion = await getConclusionWithFallback(
    NEWS_CONCLUSION_SYSTEM_PROMPT + '\n' + langInstruction,
    NEWS_CONCLUSION_USER_PROMPT(newsString),
  );

  cache[lang] = {
    conclusion,
    timestamp: now,
  };

  return response
    .setHeader('Content-Type', 'application/json')
    .status(200)
    .json({ conclusion });
}
