import { Mistral } from '@mistralai/mistralai';

const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

export const getMistralConclusion = async (systemPrompt: string, userPrompt: string): Promise<string> => {
  const chatResponse = await client.chat.complete({
    model: 'mistral-small-latest',
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
  });

  const content = chatResponse.choices?.[0]?.message?.content;
  if (typeof content === 'string') {
    return content.trim();
  }
  return '';
};
