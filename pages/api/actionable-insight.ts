import type { NextApiRequest, NextApiResponse } from 'next';
import { createHash } from 'crypto';
import { ConclusionArticle } from '../../models/ConclusionArticle';
import { ACTIONABLE_INSIGHT_SYSTEM_PROMPT, ACTIONABLE_INSIGHT_USER_PROMPT } from '../../constants/prompts';
import { getConclusionWithFallback, cleanAIText } from '../../services/ai-orchestrator';
import { ActionableInsight, SignalLevel, InsightCategory } from '../../models/ActionableInsight';

interface Input {
  articles: ConclusionArticle[];
  lang?: string;
  query?: string;
}

interface CacheEntry {
  insight: ActionableInsight;
  timestamp: number;
}

const cache: Record<string, CacheEntry> = {};

function getArticlesHash(articles: ConclusionArticle[]): string {
  const articleStrings = articles.map(a => `${a.title}|${a.description}|${a.articleText}`).join('||');
  return createHash('sha256').update(articleStrings).digest('hex');
}

function getCacheKey(lang: string, articlesHash: string, query?: string): string {
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
    return response.status(400).json({ error: 'Missing articles' });
  }

  const now = Date.now();
  const fourHours = 4 * 60 * 60 * 1000;
  const articlesHash = getArticlesHash(input.articles);
  const cacheKey = getCacheKey(lang, articlesHash, input.query);

  if (cache[cacheKey] && now - cache[cacheKey].timestamp < fourHours) {
    return response.status(200).json(cache[cacheKey].insight);
  }

  const newsString = input.articles.map((article: ConclusionArticle) => {
    let content = `Title: ${article.title}`;
    if (article.description) content += `\nDescription: ${article.description}`;
    if (article.articleText) content += `\nText: ${article.articleText}`;
    return content;
  }).join('\n\n');

  const langInstruction = input.lang === 'uk'
    ? 'IMPORTANT: The "conclusion" field MUST be in Ukrainian. The "level" and "category" fields MUST remain in English as defined in the rules.'
    : 'IMPORTANT: The "conclusion" field MUST be in English.';

  const { content: rawResponse, model } = await getConclusionWithFallback(
    ACTIONABLE_INSIGHT_SYSTEM_PROMPT + '\n' + langInstruction,
    ACTIONABLE_INSIGHT_USER_PROMPT(newsString),
  );

  try {
    // Robustly extract the LAST balanced JSON object from the response
    // This ignores thoughts or conversational text before or after the JSON
    const extractJson = (text: string): string | null => {
      let stack = 0;
      let lastEnd = text.lastIndexOf('}');
      if (lastEnd === -1) return null;

      for (let i = lastEnd; i >= 0; i--) {
        if (text[i] === '}') stack++;
        else if (text[i] === '{') stack--;

        if (stack === 0 && text[i] === '{') {
          return text.substring(i, lastEnd + 1);
        }
      }
      return null;
    };

    const jsonString = extractJson(rawResponse);
    if (!jsonString) {
      throw new Error('No valid JSON object found in response');
    }

    const insight: ActionableInsight = JSON.parse(jsonString);
    insight.conclusion = cleanAIText(insight.conclusion);
    insight.model = model;

    cache[cacheKey] = {
      insight,
      timestamp: now,
    };

    return response.status(200).json(insight);
  } catch (error) {
    console.error('Failed to parse AI response:', rawResponse);
    const fallback: ActionableInsight = {
      conclusion: cleanAIText(rawResponse),
      level: SignalLevel.NEUTRAL,
      probability: 0,
      category: InsightCategory.GENERAL,
      model: model,
    };
    return response.status(200).json(fallback);
  }
}
