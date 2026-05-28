import Link from 'next/link';
import { Container, Nav, Navbar } from 'react-bootstrap';
import Image from 'next/image';
import logoImage from '@/assets/images/news_glance_logo.png';
import { Language, translations } from '@/constants/translations';
import { useRouter } from 'next/router';

const NavBar = () => {
  const router = useRouter();
  const lang = (router.query.lang as Language) || 'en';
  const t = translations[lang];

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'uk' : 'en';
    router.push({
      pathname: router.pathname,
      query: { ...router.query, lang: newLang },
    });
  };

  return (
    <Navbar
      bg="dark"
      variant="dark"
      sticky="top"
      expand="sm"
      collapseOnSelect={true}
    >
      <Container>
        <Image
          style={{ marginRight: 10 }}
          src={logoImage}
          alt="Logo image"
          width={48}
          height={48}
        />
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} href={lang === 'en' ? '/' : `/?lang=${lang}`}>
              {t.nav.news}
            </Nav.Link>
            <Nav.Link as={Link} href={lang === 'en' ? '/search' : `/search?lang=${lang}`}>
              {t.nav.search}
            </Nav.Link>
            <Nav.Link as={Link} href={lang === 'en' ? '/contact' : `/contact?lang=${lang}`}>
              {t.nav.contact}
            </Nav.Link>
          </Nav>
          <Nav className="align-items-center">
            <button
              onClick={toggleLanguage}
              type="button"
              className="mx-2 rounded-full border border-slate-500 px-3 py-1 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            >
              {t.switchLanguage}
            </button>
            <a
              href="https://play.google.com/store/apps/details?id=com.turskyi.news_glance"
              target="_blank"
              className="ms-2"
            >
              <Image
                src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                alt="Get it on Google Play"
                width={124}
                height={48}
              />
            </a>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
