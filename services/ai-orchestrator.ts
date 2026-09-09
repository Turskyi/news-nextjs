import { getGroqConclusion } from './groq';
import { getMistralConclusion } from './mistral';
import { getGeminiConclusion } from './gemini';

export const cleanAIText = (content: string) => {
  // Strip <think> or <thought> tags, even if they aren't closed (handles truncation)
  return content
    .replace(/<(?:think|thought)>[\s\S]*?(?:<\/(?:think|thought)>|$)/gi, '')
    .trim();
};

export const getConclusionWithFallback = async (
  systemPrompt: string,
  userPrompt: string,
): Promise<{ content: string; model: string }> => {
  try {
    const groqResponse = await getGroqConclusion(systemPrompt, userPrompt);
    if (groqResponse.content) {
      return groqResponse;
    }
    throw new Error('Groq returned empty response');
  } catch (groqError) {
    console.error('Groq failed, trying Mistral:', groqError);
    try {
      const mistralResponse = await getMistralConclusion(
        systemPrompt,
        userPrompt,
      );
      if (mistralResponse.content) {
        return mistralResponse;
      }
      throw new Error('Mistral returned empty response');
    } catch (mistralError) {
      console.error('Mistral failed, trying Gemini:', mistralError);
      try {
        const geminiResponse = await getGeminiConclusion(
          systemPrompt,
          userPrompt,
        );
        if (geminiResponse.content) {
          return geminiResponse;
        }
        throw new Error('Gemini returned empty response');
      } catch (geminiError) {
        console.error('All AI providers failed:', geminiError);
        return {
          content: 'No conclusion available at the moment. Please try again later.',
          model: 'none',
        };
      }
    }
  }
};
