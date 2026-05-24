export interface NewsArticle {
    author?: string | null,
    title?: string | null,
    description?: string | null,
    url?: string,
    urlToImage?: string | null,
    publishedAt?: string | null,
    content?: string | null,
}

export interface NewsResponse {
    articles: NewsArticle[],
}