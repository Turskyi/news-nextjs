import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Script from 'next/script';
import styles from '@/styles/App.module.css';
import NavBar from '@/components/NavBar';
import NextNProgress from 'nextjs-progressbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.className} app-container`}>
      <Head>
        <title key="title">News Glance</title>
        <meta name="description" key="description" content="News" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-WE3W9B9FZN"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-WE3W9B9FZN');
        `}
      </Script>
      <NextNProgress />
      <NavBar />
      <div className="content-container">
        <div className={styles.pageContainer}>
          <Component {...pageProps} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
