import { getGroqConclusion } from './groq';
import { getMistralConclusion } from './mistral';
import { getGeminiConclusion } from './gemini';

export const getConclusionWithFallback = async (
  systemPrompt: string,
  userPrompt: string,
): Promise<{ content: string; model: string }> => {
  const cleanContent = (content: string) => {
    // Strip <think> or <thought> tags, even if they aren't closed (handles truncation)
    return content
      .replace(/<(?:think|thought)>[\s\S]*?(?:<\/(?:think|thought)>|$)/gi, '')
      .trim();
  };

  try {
    const groqResponse = await getGroqConclusion(systemPrompt, userPrompt);
    if (groqResponse.content) {
      return {
        content: cleanContent(groqResponse.content),
        model: groqResponse.model,
      };
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
        return {
          content: cleanContent(mistralResponse.content),
          model: mistralResponse.model,
        };
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
          return {
            content: cleanContent(geminiResponse.content),
            model: geminiResponse.model,
          };
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
