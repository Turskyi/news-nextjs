import { NewsArticle } from '@/models/NewsArticles';

export class NewsArticleDeduplicator {
  public static deduplicate(articles: NewsArticle[]): NewsArticle[] {
    const seenTitles: Set<string> = new Set();
    const seenDescriptions: Set<string> = new Set();
    const uniqueArticles: NewsArticle[] = [];

    for (const article of articles) {
      const title: string = (article.title ?? '').trim().toLowerCase();
      const description: string = (article.description ?? '').trim().toLowerCase();

      const isTitleDuplicate: boolean = title !== '' && seenTitles.has(title);
      const isDescriptionDuplicate: boolean =
        description !== '' &&
        description.length > 20 &&
        seenDescriptions.has(description);

      if (isTitleDuplicate || isDescriptionDuplicate) {
        continue;
      }

      if (title !== '') {
        seenTitles.add(title);
      }

      if (description !== '' && description.length > 20) {
        seenDescriptions.add(description);
      }

      uniqueArticles.push(article);
    }

    return uniqueArticles;
  }
}
