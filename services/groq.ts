import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const getGroqConclusion = async (systemPrompt: string, userPrompt: string): Promise<string> => {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: userPrompt,
      },
    ],
    model: 'llama-3.3-70b-versatile',
  });

  return chatCompletion.choices[0]?.message?.content?.trim() || '';
};
