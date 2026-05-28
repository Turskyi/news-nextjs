import type { NextApiRequest, NextApiResponse } from 'next';
import { ConclusionArticle } from '../../models/ConclusionArticle';
import { NEWS_SUMMARY_SYSTEM_PROMPT, NEWS_SUMMARY_USER_PROMPT } from '../../constants/prompts';
import { getConclusionWithFallback } from '../../services/ai-orchestrator';

interface Input {
  articles: ConclusionArticle[];
  lang?: string;
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  // ... (headers code)

  const input: Input = request.body;
  const lang = input.lang || 'en';

  if (!input || !input.articles || input.articles.length === 0) {
    return response.status(400).json({
      error: 'ಠ_ಠ Summary cannot be generated: No articles provided.',
    });
  }

  const newsString = input.articles
    .map((article: ConclusionArticle) => {
      let articlePrompt = `Title: ${article.title}`;
      if (article.description) articlePrompt += `\nDescription: ${article.description}`;
      if (article.articleText) articlePrompt += `\nText: ${article.articleText}`;
      return articlePrompt;
    })
    .join('\n\n');

  const systemPrompt = lang === 'uk'
    ? `${NEWS_SUMMARY_SYSTEM_PROMPT}\n\nIMPORTANT: Respond ONLY in Ukrainian language.`
    : NEWS_SUMMARY_SYSTEM_PROMPT;

  const summary = await getConclusionWithFallback(
    systemPrompt,
    NEWS_SUMMARY_USER_PROMPT(newsString),
  );

  return response
    .setHeader('Content-Type', 'application/json')
    .status(200)
    .json({ summary });
}
