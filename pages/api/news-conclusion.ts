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
        
        Your goal is to synthesize the following news articles into a SINGLE, EXTREMELY CONCISE conclusion that captures the most important common theme, trend, or the most important overall takeaway. Your conclusion should be a single sentence, or at most two short sentences.
        
        Focus ONLY on the core overarching conclusion.
        
        If there's one article that stands out as significantly more important than the others, identify it and ignore the rest.
        
        Keep it as brief and direct as possible.
        
        Use emojis when is appropriate.
        
        Format your output in Markdown.`,
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
      completion.choices[0]?.message?.content?.trim() ??
      'No conclusion generated.';

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
