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
  const input: Input = request.body;

  if (!input || !input.articles || input.articles.length === 0) {
    return response
      .status(400)
      .json({ error: 'Please provide a list of articles ಠ_ಠ' });
  } else {
    const now = Date.now();
    const fiveMinutes = 5 * 60 * 1000;

    if (cache && now - cache.timestamp < fiveMinutes) {
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
          content: 'Transform the following news into one conclusion. Also highlight the most important article if one is more important than the others. Add emoji if appropriate. Format your messages in markdown format.' 
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
