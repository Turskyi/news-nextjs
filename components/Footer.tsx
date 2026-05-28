import Link from 'next/link';
import { Language, translations } from '@/constants/translations';
import { useRouter } from 'next/router';

export default function Footer() {
  const router = useRouter();
  const lang = (router.query.lang as Language) || 'en';
  const t = translations[lang];

  return (
    <footer
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: '1rem',
      }}
    >
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <Link href={lang === 'en' ? '/privacy-policy' : `/privacy-policy?lang=${lang}`}>
          {t.nav.privacy}
        </Link>
      </nav>
      <nav style={{ display: 'flex', gap: '1rem' }}>
        <Link href={lang === 'en' ? '/about' : `/about?lang=${lang}`}>
          {t.nav.about}
        </Link>
      </nav>
    </footer>
  );
}
