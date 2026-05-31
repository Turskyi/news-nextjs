import type { NextApiRequest, NextApiResponse } from 'next';
import { ConclusionArticle } from '../../models/ConclusionArticle';
import { ACTIONABLE_INSIGHT_SYSTEM_PROMPT, ACTIONABLE_INSIGHT_USER_PROMPT } from '../../constants/prompts';
import { getConclusionWithFallback } from '../../services/ai-orchestrator';
import { ActionableInsight, SignalLevel, InsightCategory } from '../../models/ActionableInsight';

interface Input {
  articles: ConclusionArticle[];
  lang?: string;
}

interface CacheEntry {
  insight: ActionableInsight;
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
    return response.status(400).json({ error: 'Missing articles' });
  }

  const now = Date.now();
  const fourHours = 4 * 60 * 60 * 1000;

  if (cache[lang] && now - cache[lang].timestamp < fourHours) {
    return response.status(200).json(cache[lang].insight);
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

  const rawResponse = await getConclusionWithFallback(
    ACTIONABLE_INSIGHT_SYSTEM_PROMPT + '\n' + langInstruction,
    ACTIONABLE_INSIGHT_USER_PROMPT(newsString),
  );

  try {
    const jsonString = rawResponse.replace(/```json\n?|\n?```/g, '').trim();
    const insight: ActionableInsight = JSON.parse(jsonString);

    cache[lang] = {
      insight,
      timestamp: now,
    };

    return response.status(200).json(insight);
  } catch (error) {
    console.error('Failed to parse AI response:', rawResponse);
    const fallback: ActionableInsight = {
      conclusion: rawResponse,
      level: SignalLevel.NEUTRAL,
      probability: 0,
      category: InsightCategory.GENERAL,
    };
    return response.status(200).json(fallback);
  }
}
