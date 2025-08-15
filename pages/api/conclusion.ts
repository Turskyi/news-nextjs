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
  } else {
    const prompt = input.articles
      .map((article: Article) => {
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

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are a seasoned news analyst. Your job is to determine what, if anything, a regular person should do in response.`,
        },
        {
          role: 'user',
          content: `Based on the news below, draw a conclusion.

Your answer should clearly respond to this question:  
"What action you personally should take other than staying informed if any?"

- The response should be one or two sentences, plain and clear.
- Use emojis if they help clarify or draw attention.
- Format your output in Markdown.

News:
${prompt}

Conclusion:`,
        },
      ],
      max_tokens: 80,
      temperature: 0.6,
      stop: ['\n'],
    });

    const conclusion =
      completion.choices?.[0]?.message?.content?.trim() ?? 'No conclusion.';
    return response
      .setHeader('Content-Type', 'application/json')
      .status(200)
      .json({ conclusion });
  }
}
