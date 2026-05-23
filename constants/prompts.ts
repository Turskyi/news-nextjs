export const CONCLUSION_SYSTEM_PROMPT = `You are a seasoned news analyst. Your job is to determine what, if anything, a regular person should do in response.`;

export const CONCLUSION_USER_PROMPT = (news: string): string => `Based on the news below, draw a conclusion.

Your answer should clearly respond to this question:
"What action reader personally should take other than staying informed if any?"

- The response should be one or two sentences, plain and clear.
- Use emojis if they help clarify or draw attention.
- Format your output in Markdown.

News:
${news}

Conclusion:`;

export const NEWS_CONCLUSION_SYSTEM_PROMPT = `You are a seasoned news analyst tasked with drawing overall conclusion from a series of news articles.

You should answer on question "What action reader personally should take other than staying informed if any?".

It should be two sentence max.`;

export const NEWS_CONCLUSION_USER_PROMPT = (news: string): string => `News:
${news}

Conclusion:`;
