import { NewsArticle } from '@/models/NewsArticles';

const NEWS_API_TRUNCATION_MARKER = /\s*\[\+?\d+\s*chars\]\s*$/i;
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

  // Check for garbage text patterns
  if (isGarbageText(content)) {
    return true;
  }

  return (
    content.length >= MINIMUM_READABLE_LENGTH &&
    (words < MINIMUM_READABLE_WORD_COUNT ||
      letters < MINIMUM_READABLE_LETTER_COUNT)
  );
}

function isGarbageText(content: string): boolean {
  // Check for excessive special characters and punctuation
  const specialCharCount = (content.match(/[^\p{L}\p{N}\s]/gu) || []).length;
  const letters = content.match(/\p{L}/gu)?.length ?? 0;
  const specialCharRatio = letters > 0 ? specialCharCount / letters : 0;

  // If special characters are more than 50% of letters, likely garbage
  if (specialCharRatio > 0.5) {
    return true;
  }

  // Check for repeated patterns like "( - - )" or "- , , ,"
  const repeatedPatterns =
    /(\(\s*-\s*-\s*\)|(-\s*,\s*,)|(:\s*,\s*:)|(\.\s*\.\s*\.))+/g;
  const patternMatches = content.match(repeatedPatterns) || [];
  const totalPatternLength = patternMatches.reduce(
    (sum, m) => sum + m.length,
    0,
  );

  // If repeated garbage patterns make up more than 20% of content, filter it
  if (content.length > 0 && totalPatternLength / content.length > 0.2) {
    return true;
  }

  // Check for excessive non-ASCII or control characters
  const nonPrintableCount = (
    content.match(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g) || []
  ).length;
  if (nonPrintableCount > 0) {
    return true;
  }

  return false;
}

export function cleanNewsArticle(article: NewsArticle): NewsArticle {
  return {
    ...article,
    content: cleanNewsApiContent(article.content),
  };
}
