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
    return response.status(400).json({
      error:
        'ಠ_ಠ Conclusion cannot be generated: Did not get a list of articles.',
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
          content: `You are a helpful assistant generating a single-sentence, plain-language "daily heads-up" for people who don’t follow the news.`,
        },
        {
          role: 'user',
          content: `You are a helpful assistant generating a single-sentence, plain-language "daily heads-up" for people who don’t follow the news.

          Carefully read **all** of the following news articles before writing your answer. Think deeply about their overall meaning.
          
          Your task is to write **one clear sentence** that captures the most important thing a person should know today. Don't summarize every article. Don’t just take the first or last item. Instead, figure out what matters most in the big picture — the thing that might affect people's thinking, mood, or decisions.
          
          Write like a smart friend giving a quick heads-up. Use plain language, and include an emoji if it helps. Format your response in markdown format.
          
          News:
          ${prompt}
          
          Conclusion:`,
        },
      ],
      max_tokens: 80,
      temperature: 0.6,
      stop: ['\n'],
    });

    const conclusion = completion.choices?.[0]?.message?.content?.trim() ?? '';
    return response
      .setHeader('Content-Type', 'application/json')
      .status(200)
      .json({ conclusion });
  }
}
