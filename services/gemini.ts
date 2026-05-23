import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const getGeminiConclusion = async (systemPrompt: string, userPrompt: string): Promise<string> => {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite' });

  const result = await model.generateContent(`${systemPrompt}\n\n${userPrompt}`);
  const response = await result.response;
  return response.text().trim();
};
