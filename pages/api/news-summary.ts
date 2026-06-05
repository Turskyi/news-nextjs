import type { NextApiRequest, NextApiResponse } from 'next';
import { createHash } from 'crypto';
import { ConclusionArticle } from '../../models/ConclusionArticle';
import {
  NEWS_SUMMARY_SYSTEM_PROMPT,
  NEWS_SUMMARY_SYSTEM_PROMPT_UK,
  NEWS_SUMMARY_USER_PROMPT,
  NEWS_SUMMARY_USER_PROMPT_UK,
} from '../../constants/prompts';
import { getConclusionWithFallback } from '../../services/ai-orchestrator';

interface Input {
  articles: ConclusionArticle[];
  lang?: string;
  query?: string;
}

interface CacheEntry {
  summary: string;
  timestamp: number;
}

const cache: Record<string, CacheEntry> = {};

function getArticlesHash(articles: ConclusionArticle[]): string {
  const articleStrings = articles
    .map((a) => `${a.title}|${a.description}|${a.articleText}`)
    .join('||');
  return createHash('sha256').update(articleStrings).digest('hex');
}

function getCacheKey(
  lang: string,
  articlesHash: string,
  query?: string,
): string {
  const queryPart = query ? `:${query}` : '';
  return `${lang}:${articlesHash}${queryPart}`;
}

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
    return response.status(400).json({
      error: 'ಠ_ಠ Summary cannot be generated: No articles provided.',
    });
  }

  const now = Date.now();
  const fourHours = 4 * 60 * 60 * 1000;
  const articlesHash = getArticlesHash(input.articles);
  const cacheKey = getCacheKey(lang, articlesHash, input.query);

  if (cache[cacheKey] && now - cache[cacheKey].timestamp < fourHours) {
    return response.status(200).json({ summary: cache[cacheKey].summary });
  }

  const newsString = input.articles
    .map((article: ConclusionArticle) => {
      let articlePrompt = `Title: ${article.title}`;
      if (article.description)
        articlePrompt += `\nDescription: ${article.description}`;
      if (article.articleText)
        articlePrompt += `\nText: ${article.articleText}`;
      return articlePrompt;
    })
    .join('\n\n');

  const systemPrompt =
    lang === 'uk' ? NEWS_SUMMARY_SYSTEM_PROMPT_UK : NEWS_SUMMARY_SYSTEM_PROMPT;

  const userPrompt =
    lang === 'uk'
      ? NEWS_SUMMARY_USER_PROMPT_UK(newsString)
      : NEWS_SUMMARY_USER_PROMPT(newsString);

  let summary = await getConclusionWithFallback(systemPrompt, userPrompt);

  cache[cacheKey] = {
    summary,
    timestamp: now,
  };

  return response
    .setHeader('Content-Type', 'application/json')
    .status(200)
    .json({ summary });
}
