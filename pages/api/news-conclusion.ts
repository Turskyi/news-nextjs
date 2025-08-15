import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface Article {
  title: string;
  description: string;
  articleText: string;
}

interface Input {
  articles: Article[];
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
  } else {
    const now = Date.now();

    const fourHours = 4 * 60 * 60 * 1000;

    if (cache && now - cache.timestamp < fourHours) {
      return response.status(200).json({ conclusion: cache.conclusion });
    }

    const messages = input.articles.map((article: Article) => {
      let content = `Title: ${article.title}`;
      if (article.description) {
        content += `\nDescription: ${article.description}`;
      }
      if (article.articleText) {
        content += `\nText: ${article.articleText}`;
      }
      return {
        role: 'user' as const,
        content,
      };
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a seasoned news analyst tasked with drawing overall conclusion from a series of news articles.
    
         You should answer on question "What action reader personally should take other than staying informed if any?".
        
        It should be two sentence max.`,
        },
        ...messages,
        { role: 'user', content: 'Conclusion:' },
      ],
      max_tokens: 500,
      temperature: 1,
      presence_penalty: 0,
      frequency_penalty: 0,
    });

    const conclusion =
      completion.choices[0]?.message?.content?.trim() ?? 'No conclusion.';

    cache = {
      conclusion,
      timestamp: now,
    };

    return response
      .setHeader('Content-Type', 'application/json')
      .status(200)
      .json({ conclusion });
  }
}
