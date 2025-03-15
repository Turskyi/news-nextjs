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

    const completion = await openai.completions.create({
      model: 'gpt-3.5-turbo-instruct',
      prompt: `Summarize the following news articles into a brief conclusion, highlighting the most important point. Be concise and avoid retelling the entire stories.\n\n
      Use emojis when appropriate to enhance the message.\n\n
      ${prompt}\n\nConclusion:`,
      max_tokens: 300,
      temperature: 0.7,
      presence_penalty: 0,
      frequency_penalty: 0,
      stop: ['\n'],
    });

    const conclusion = completion.choices[0].text.trim();
    return response
      .setHeader('Content-Type', 'application/json')
      .status(200)
      .json({ conclusion });
  }
}
