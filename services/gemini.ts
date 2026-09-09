import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export const getGeminiConclusion = async (systemPrompt: string, userPrompt: string): Promise<{ content: string; model: string }> => {
  const modelName = 'gemini-3.5-flash-lite';
  const model = genAI.getGenerativeModel({
    model: modelName,
    systemInstruction: systemPrompt,
  });

  const result = await model.generateContent(userPrompt);
  const response = await result.response;
  return {
    content: response.text().trim(),
    model: modelName,
  };
};
