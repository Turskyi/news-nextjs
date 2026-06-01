import { NewsArticle } from '@/models/NewsArticles';

const NEWS_API_TRUNCATION_MARKER = /\s*\[\+\d+\s*chars\]\s*$/i;

export function cleanNewsApiContent(
  rawContent?: string | null,
): string | null | undefined {
  if (rawContent === null || rawContent === undefined) {
    return rawContent;
  }

  return rawContent.replace(NEWS_API_TRUNCATION_MARKER, '').trimEnd();
}

export function cleanNewsArticle(article: NewsArticle): NewsArticle {
  return {
    ...article,
    content: cleanNewsApiContent(article.content),
  };
}
