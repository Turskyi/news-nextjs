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
      prompt: `Transform the following news into a conclusion, highlighting the most important news if one is more important than the others.\n\n${prompt}\n\nConclusion:`,
      max_tokens: 500,
      temperature: 1,
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
