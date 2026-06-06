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

  return isLikelyUnreadableContent(cleanedContent) ? '' : cleanedContent;
}

function isLikelyUnreadableContent(content: string): boolean {
  const normalizedContent = content.replace(/[\r\n]+/g, ' ').trim();
  const letters = normalizedContent.match(/\p{L}/gu)?.length ?? 0;
  const words = normalizedContent.match(/\p{L}+/gu)?.length ?? 0;
  const tokens = normalizedContent
    .split(/\s+/)
    .filter((token) => token.length > 0);

  if (letters === 0 || words < MINIMUM_READABLE_WORD_COUNT) {
    return true;
  }

  if (letters < MINIMUM_READABLE_LETTER_COUNT) {
    return true;
  }

  if (containsContentMarkers(normalizedContent)) {
    return true;
  }

  if (hasLowLetterDensity(normalizedContent, letters)) {
    return true;
  }

  if (hasTooManyShortTokens(tokens)) {
    return true;
  }

  if (isGarbageText(normalizedContent)) {
    return true;
  }

  return false;
}

function containsContentMarkers(content: string): boolean {
  const patterns = [
    /https?:\/\//i,
    /\bt\.me\b/i,
    /\btelegram\b/i,
    /\bwhatsapp\b/i,
    /\bclick here\b/i,
    /\bsubscribe\b/i,
    /\bjoin us\b/i,
  ];

  return patterns.some((pattern) => pattern.test(content));
}

function hasLowLetterDensity(content: string, letterCount: number): boolean {
  const length = content.length;
  if (length === 0) {
    return true;
  }

  const letterDensity = letterCount / length;
  return letterDensity < 0.4;
}

function hasTooManyShortTokens(tokens: string[]): boolean {
  if (tokens.length < 8) {
    return false;
  }

  const shortTokenCount = tokens.filter((token) => token.length <= 2).length;
  const symbolOnlyTokenCount = tokens.filter(
    (token) => !/\p{L}/u.test(token),
  ).length;
  const shortTokenRatio = shortTokenCount / tokens.length;
  const symbolOnlyTokenRatio = symbolOnlyTokenCount / tokens.length;

  return shortTokenRatio > 0.35 || symbolOnlyTokenRatio > 0.25;
}

function isGarbageText(content: string): boolean {
  const specialCharCount = (content.match(/[^\p{L}\p{N}\s]/gu) || []).length;
  const letters = content.match(/\p{L}/gu)?.length ?? 0;
  const specialCharRatio = letters > 0 ? specialCharCount / letters : 0;

  if (specialCharRatio > 0.5) {
    return true;
  }

  const repeatedPatterns =
    /(\(\s*-\s*-\s*\)|(-\s*,\s*,)|(:\s*,\s*:)|(\.\s*\.\s*\.))+/g;
  const patternMatches: string[] = content.match(repeatedPatterns) || [];
  const totalPatternLength = patternMatches.reduce(
    (sum, m) => sum + m.length,
    0,
  );

  if (content.length > 0 && totalPatternLength / content.length > 0.2) {
    return true;
  }

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
