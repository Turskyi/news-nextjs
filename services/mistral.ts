import { Mistral } from '@mistralai/mistralai';

const client = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

export const getMistralConclusion = async (systemPrompt: string, userPrompt: string): Promise<{ content: string; model: string }> => {
  const model = 'mistral-small-latest';
  const chatResponse = await client.chat.complete({
    model: model,
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
  return {
    content: typeof content === 'string' ? content.trim() : '',
    model: model,
  };
};
