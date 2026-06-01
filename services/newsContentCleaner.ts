import { NewsArticle } from '@/models/NewsArticles';

const NEWS_API_TRUNCATION_MARKER = /\s*\[\+\d+\s*chars\]\s*$/i;
const MINIMUM_READABLE_WORD_COUNT = 3;
const MINIMUM_READABLE_LETTER_COUNT = 15;
const MINIMUM_READABLE_LENGTH = 40;

export function cleanNewsApiContent(
  rawContent?: string | null,
): string | null | undefined {
  if (rawContent === null || rawContent === undefined) {
    return rawContent;
  }

  const cleanedContent = rawContent
    .replace(NEWS_API_TRUNCATION_MARKER, '')
    .trim();

  if (!cleanedContent) {
    return null;
  }

  return isLikelyUnreadableContent(cleanedContent) ? null : cleanedContent;
}

function isLikelyUnreadableContent(content: string): boolean {
  const letters = content.match(/\p{L}/gu)?.length ?? 0;
  const words = content.match(/\p{L}+/gu)?.length ?? 0;

  if (letters === 0) {
    return true;
  }

  return (
    content.length >= MINIMUM_READABLE_LENGTH &&
    (words < MINIMUM_READABLE_WORD_COUNT ||
      letters < MINIMUM_READABLE_LETTER_COUNT)
  );
}

export function cleanNewsArticle(article: NewsArticle): NewsArticle {
  return {
    ...article,
    content: cleanNewsApiContent(article.content),
  };
}
