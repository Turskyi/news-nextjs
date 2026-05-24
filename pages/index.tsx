import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { NewsArticle } from '@/models/NewsArticles';
import { ConclusionArticle } from '@/models/ConclusionArticle';
import NewsArticleGrid from '@/components/NewsArticleGrid';
import ActionableInsightCard from '@/components/ActionableInsightCard';
import { ActionableInsight } from '@/models/ActionableInsight';
import { useState, useEffect, useCallback } from 'react';
import useSWR from 'swr';
import { BASE_URL, DEFAULT_COUNTRY_CODE, NEWS_MAX } from '../constants';

interface NewsPageProps {
  newsArticles: NewsArticle[];
}

export const getServerSideProps: GetServerSideProps<
  NewsPageProps
> = async (context) => {
  const host = context.req.headers.host;
  const protocol = host?.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}/`;

  const response = await fetch(
    baseUrl + 'api/news?country=' + DEFAULT_COUNTRY_CODE,
  );

  if (!response.ok) {
    console.error('Failed to fetch news:', response.statusText);
    return {
      props: { newsArticles: [] },
    };
  }

  const newsResponse: NewsArticle[] = await response.json();
  return {
    props: { newsArticles: newsResponse },
  };
};

export default function NewsPage({ newsArticles }: NewsPageProps) {
  const [insight, setInsight] = useState<ActionableInsight | null>(null);

  const fetchConclusion = useCallback(async () => {
    const articles: ConclusionArticle[] = newsArticles
      .slice(0, NEWS_MAX)
      .map((article) => ({
        title: article.title ?? '',
        description: article.description ?? '',
        articleText: article.content ?? '',
      }));

    const payload = JSON.stringify({ articles });

    try {
      // Try the new structured insight endpoint first
      const response = await fetch('/api/actionable-insight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
      });

      if (response.ok) {
        return (await response.json()) as ActionableInsight;
      }

      // If new endpoint fails, fallback to legacy news-conclusion
      const fallbackResponse = await fetch('/api/news-conclusion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
      });

      if (fallbackResponse.ok) {
        const legacyData = await fallbackResponse.json();
        return {
          conclusion: legacyData.conclusion,
          level: 'NEUTRAL' as any, // Fallback to basic level
          probability: 0,
          category: 'GENERAL' as any,
        } as ActionableInsight;
      }
    } catch (error) {
      console.error('Failed to fetch insight, even with fallback:', error);
    }

    return null;
  }, [newsArticles]);

  const { data, isLoading } = useSWR<ActionableInsight | null>(
    newsArticles.length > 0 ? '/api/actionable-insight' : null,
    fetchConclusion,
  );

  useEffect(() => {
    if (data) {
      setInsight(data);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title key="title">News Glance</title>
        <meta
          name="description"
          content="A website that displays top ten news articles and uses modern AI to generate a conclusion based on the first five titles."
        />
        <meta
          name="keywords"
          content="Next.js, News, AI, Conclusion, Headlines, News Glance"
        />
        <meta property="og:title" content="News Glance" />
        <meta
          property="og:description"
          content="A website that displays top ten news articles and uses modern AI to generate a conclusion based on the first five titles."
        />
        <meta
          property="og:image"
          content={`${BASE_URL}_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnews_article_placeholder.0b951b56.jpeg&w=1080&q=75`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="News Glance" />
        <meta
          name="twitter:description"
          content="A website that displays top ten news articles and uses modern AI to generate a conclusion based on the first five titles."
        />
        <meta
          name="twitter:image"
          content={`${BASE_URL}_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnews_article_placeholder.0b951b56.jpeg&w=1080&q=75`}
        />
      </Head>
      <main className="container mx-auto max-w-5xl px-4 py-10">
        <header className="mb-12 text-center">
          <h1
            className="mb-2 text-6xl font-bold tracking-tight"
            style={{ fontFamily: 'Bree Serif' }}
          >
            News Glance
          </h1>
          {insight && (
            <p className="text-slate-500 transition-opacity duration-1000">
              AI-powered actionable insights from today's comprehensive news
              analysis
            </p>
          )}
        </header>

        {isLoading && !insight && (
          <div className="mb-10 animate-pulse rounded-2xl bg-slate-100 p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-slate-200"></div>
              <div className="space-y-2">
                <div className="h-3 w-32 rounded bg-slate-200"></div>
                <div className="h-3 w-48 rounded bg-slate-200"></div>
              </div>
            </div>
            <div className="h-6 w-3/4 rounded bg-slate-200"></div>
          </div>
        )}

        {insight && <ActionableInsightCard insight={insight} />}

        <NewsArticleGrid articles={newsArticles} />
      </main>
    </>
  );
}
