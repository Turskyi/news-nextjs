import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { NewsArticle, NewsResponse } from '@/models/NewsArticles';
import NewsArticleGrid from '@/components/NewsArticleGrid';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

interface NewsPageProps {
  newsArticles: NewsArticle[];
}

export const getServerSideProps: GetServerSideProps<
  NewsPageProps
> = async () => {
  const response = await fetch(
    'https://newsapi.org/v2/top-headlines?country=ca&apiKey=' +
      process.env.NEWS_API_KEY,
  );
  const newsResponse: NewsResponse = await response.json();
  return {
    props: { newsArticles: newsResponse.articles },
  };
  // let error go to 500 page
};

export default function NewsPage({ newsArticles }: NewsPageProps) {
  // Create a state variable for the conclusion data
  const [conclusion, setConclusion] = useState('');

  // Use the useSWR hook to fetch the data from the "news-conclusion" endpoint
  useSWR('/api/news-conclusion', async () => {
    // Use the first news articles' titles as the prompt
    const prompt = newsArticles
      .slice(0, 5)
      .map((article) => article.title)
      .join('; ');

    // Encode the prompt as a query parameter
    const encodedPrompt = encodeURIComponent(prompt);

    // Make a request to the API endpoint with the prompt
    const response = await fetch(
      '/api/news-conclusion?prompt=' + encodedPrompt,
    );
    const data = await response.json();

    // Update the conclusion state with the response data
    setConclusion(data.conclusion);
  });

  return (
    <>
      <Head>
        <title key="title">News</title>
      </Head>
      <main>
        <h1>News</h1>
        {/* Display the title for the conclusion using a <h2> tag */}
        {conclusion && (
          <h2 style={{ textAlign: 'center', color: 'green' }}>
            Conclusion from News Headlines
          </h2>
        )}
        {/* Display the conclusion from the conclusion state using a <p> tag */}
        <p style={{ fontSize: '36px', fontWeight: 'bold' }}>{conclusion}</p>
        {/* This page uses getServerSideProps to fetch data server-side on every request
            This allows search engines to crawl the page content and improves SEO. */}
        <NewsArticleGrid articles={newsArticles} />
      </main>
    </>
  );
}
