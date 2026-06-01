import NewsArticleGrid from '@/components/NewsArticleGrid';
import { NewsArticle } from '@/models/NewsArticles';
import Head from 'next/head';
import { FormEvent, useState } from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';
import { Language, translations } from '@/constants/translations';
import { useRouter } from 'next/router';

const SearchNewsPage = () => {
  const router = useRouter();
  const lang = (router.query.lang as Language) || 'en';
  const t = translations[lang];

  const [searchResults, setSearchResults] = useState<NewsArticle[] | null>(
    null,
  );
  const [searchResultsLoading, setSearchResultsLoading] =
    useState<boolean>(false);
  const [searchResultsLoadingIsError, setSearchResultsLoadingIsError] =
    useState<boolean>(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get('searchQuery')?.toString().trim();
    if (searchQuery) {
      try {
        setSearchResults(null);
        setSearchResultsLoadingIsError(false);
        setSearchResultsLoading(true);

        const response = await fetch(
          '/api/search-news?q=' + encodeURIComponent(searchQuery),
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          console.error('[Search-News] API response error:', errorData);
          setSearchResultsLoadingIsError(true);
          return;
        }

        const articles = await response.json();
        if (!Array.isArray(articles)) {
          console.error('[Search-News] Invalid payload received:', articles);
          setSearchResultsLoadingIsError(true);
          return;
        }

        setSearchResults(articles);
      } catch (error) {
        console.error(error);
        setSearchResultsLoadingIsError(true);
      } finally {
        setSearchResultsLoading(false);
      }
    }
  }

  return (
    <>
      <Head>
        <title key="title">{t.searchTitle}</title>
      </Head>
      <main>
        <h1>{t.searchTitle}</h1>
        {/*     This is page uses client-side data fetching to show fresh data for every search.
                    Requests are handled by our backend via API routes. */}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="search-input">
            <Form.Label>{t.searchQueryLabel}</Form.Label>
            <Form.Control
              name="searchQuery"
              placeholder={t.searchPlaceholder}
            />
          </Form.Group>
          <Button
            type="submit"
            className="mb-3"
            disabled={searchResultsLoading}
          >
            {t.searchButtonText}
          </Button>
        </Form>
        <div className="d-flex flex-column align-items-center">
          {searchResultsLoading && <Spinner animation="border" />}
          {searchResultsLoadingIsError && <p>{t.searchError}</p>}
          {searchResults?.length === 0 && <p>{t.searchNoResults}</p>}
          {searchResults && <NewsArticleGrid articles={searchResults} />}
        </div>
      </main>
    </>
  );
};

export default SearchNewsPage;
