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
import { Language, translations } from '@/constants/translations';
import { useRouter } from 'next/router';

interface NewsPageProps {
  newsArticles: NewsArticle[];
  lang: Language;
}

export const getServerSideProps: GetServerSideProps<
  NewsPageProps
> = async (context) => {
  const host = context.req.headers.host;
  const protocol = host?.includes('localhost') ? 'http' : 'https';
  const baseUrl = `${protocol}://${host}/`;

  const lang = (context.query.lang as Language) || 'en';
  const countryCode = lang === 'uk' ? 'ua' : DEFAULT_COUNTRY_CODE;

  const response = await fetch(
    baseUrl + 'api/news?country=' + countryCode,
  );

  if (!response.ok) {
    console.error('Failed to fetch news:', response.statusText);
    return {
      props: { newsArticles: [], lang },
    };
  }

  const newsResponse: NewsArticle[] = await response.json();
  return {
    props: { newsArticles: newsResponse, lang },
  };
};

export default function NewsPage({ newsArticles, lang }: NewsPageProps) {
  const [insight, setInsight] = useState<ActionableInsight | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'insight' | 'summary'>('insight');
  const router = useRouter();
  const t = translations[lang];

  const fetchConclusion = useCallback(async () => {
    const articles: ConclusionArticle[] = newsArticles
      .slice(0, NEWS_MAX)
      .map((article) => ({
        title: article.title ?? '',
        description: article.description ?? '',
        articleText: article.content ?? '',
      }));

    const payload = JSON.stringify({ articles, lang });

    try {
      const response = await fetch('/api/actionable-insight', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
      });

      if (response.ok) {
        return (await response.json()) as ActionableInsight;
      }
    } catch (error) {
      console.error('Failed to fetch insight:', error);
    }

    return null;
  }, [newsArticles, lang]);

  const fetchSummary = useCallback(async () => {
    const articles: ConclusionArticle[] = newsArticles
      .slice(0, NEWS_MAX)
      .map((article) => ({
        title: article.title ?? '',
        description: article.description ?? '',
        articleText: article.content ?? '',
      }));

    const payload = JSON.stringify({ articles, lang });

    try {
      const response = await fetch('/api/news-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
      });

      if (response.ok) {
        const data = await response.json();
        return data.summary as string;
      }
    } catch (error) {
      console.error('Failed to fetch summary:', error);
    }

    return null;
  }, [newsArticles, lang]);

  const { data: insightData, isLoading: isInsightLoading } = useSWR<ActionableInsight | null>(
    newsArticles.length > 0 ? [`/api/actionable-insight`, lang] : null,
    fetchConclusion,
  );

  const { data: summaryData, isLoading: isSummaryLoading } = useSWR<string | null>(
    newsArticles.length > 0 ? [`/api/news-summary`, lang] : null,
    fetchSummary,
  );

  useEffect(() => {
    if (insightData) {
      setInsight(insightData);
    }
  }, [insightData]);

  useEffect(() => {
    if (summaryData) {
      setSummary(summaryData);
    }
  }, [summaryData]);

  return (
    <>
      <Head>
        <title key="title">{t.title}</title>
        <meta name="description" content={t.description} />
        <meta
          name="keywords"
          content="Next.js, News, AI, Conclusion, Headlines, News Glance"
        />
        <meta property="og:title" content={t.title} />
        <meta property="og:description" content={t.description} />
        <meta
          property="og:image"
          content={`${BASE_URL}_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fnews_article_placeholder.0b951b56.jpeg&w=1080&q=75`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.title} />
        <meta name="twitter:description" content={t.description} />
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
            {t.title}
          </h1>
          {(insight || summary) && (
            <p className="text-slate-500 transition-opacity duration-1000">
              {t.aiSubtitle}
            </p>
          )}
        </header>

        <div className="mb-10 flex justify-center">
          <div className="inline-flex rounded-xl bg-slate-100 p-1 shadow-inner">
            <button
              onClick={() => setViewMode('insight')}
              className={`rounded-lg px-6 py-2 text-sm font-bold transition-all ${
                viewMode === 'insight'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t.actionableInsight}
            </button>
            <button
              onClick={() => setViewMode('summary')}
              className={`rounded-lg px-6 py-2 text-sm font-bold transition-all ${
                viewMode === 'summary'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t.conversationalSummary}
            </button>
          </div>
        </div>

        {((viewMode === 'insight' && isInsightLoading && !insight) ||
          (viewMode === 'summary' && isSummaryLoading && !summary)) && (
          <div className="mb-10 animate-pulse rounded-[3rem] bg-slate-100 p-12 md:p-20">
            <div className="mb-8 flex items-center gap-6">
              <div className="h-20 w-20 rounded-[1.5rem] bg-slate-200"></div>
              <div className="space-y-3">
                <div className="h-4 w-32 rounded bg-slate-200"></div>
                <div className="h-4 w-48 rounded bg-slate-200"></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-6 w-full rounded bg-slate-200"></div>
              <div className="h-6 w-5/6 rounded bg-slate-200"></div>
            </div>
            <p className="mt-4 text-sm text-slate-400">{t.loadingInsight}</p>
          </div>
        )}

        {viewMode === 'insight' && insight && (
          <div style={{ marginBottom: '8rem' }}>
            <ActionableInsightCard insight={insight} lang={lang} />
          </div>
        )}

        {viewMode === 'summary' && summary && (
          <div
            style={{
              marginBottom: '8rem',
              backgroundColor: '#f8fafc',
              border: '2px solid #e2e8f0',
              borderRadius: '3.5rem',
              padding: '3rem 4rem',
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}
          >
            <div
              style={{
                fontSize: '1.25rem',
                lineHeight: 1.6,
                color: '#334155',
              }}
            >
              <ReactMarkdown>{summary}</ReactMarkdown>
            </div>
          </div>
        )}

        <div style={{ marginTop: '2rem' }}>
          <NewsArticleGrid articles={newsArticles} />
        </div>
      </main>
    </>
  );
}
