import { NewsArticle } from '@/models/NewsArticles';
import { Card } from 'react-bootstrap';
import Image from 'next/image';
import placeholderImage from '@/assets/images/news_article_placeholder.jpeg';
import styles from '@/styles/NewsArticleEntry.module.css';
import { Language, translations } from '@/constants/translations';
import { useRouter } from 'next/router';

interface NewsArticleEntryProps {
  article: NewsArticle;
}

const NewsArticleEntry = ({
  article: { title, description, url, urlToImage },
}: NewsArticleEntryProps) => {
  const router = useRouter();
  const lang = (router.query.lang as Language) || 'en';
  const t = translations[lang];

  const validImageUrl =
    urlToImage?.startsWith('http://') || urlToImage?.startsWith('https://')
      ? urlToImage
      : undefined;

  return (
    <a
      href={url || '#'}
      className="no-underline hover:no-underline"
      style={{ textDecoration: 'none' }}
    >
      <Card className="h-100 overflow-hidden border-0 shadow-sm transition-transform duration-300 hover:scale-[1.02] rounded-[1.5rem]">
        <Image
          unoptimized
          src={validImageUrl || placeholderImage}
          width={500}
          height={200}
          alt="News article image"
          className={`card-img-top ${styles.image}`}
          style={{ height: '200px' }}
        />
        <Card.Body className="p-5">
          <Card.Title className="mb-3 line-clamp-2 font-bold text-slate-800">
            {title || t.noTitle}
          </Card.Title>
          <Card.Text className="line-clamp-3 text-sm text-slate-600">
            {description || t.noDescription}
          </Card.Text>
        </Card.Body>
      </Card>
    </a>
  );
};

export default NewsArticleEntry;
