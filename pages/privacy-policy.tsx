import Head from 'next/head';
import { Language, translations } from '@/constants/translations';
import { useRouter } from 'next/router';

export default function PrivacyPolicy() {
  const router = useRouter();
  const lang = (router.query.lang as Language) || 'en';
  const t = translations[lang].privacy;

  return (
    <div>
      <Head>
        <title>{t.title}</title>
      </Head>

      <main>
        <h1>{t.header}</h1>
        <section>
          <h2>{t.tableOfContents}</h2>
          <ul>
            <li>
              <a href="#introduction">{t.introduction}</a>
            </li>
            <li>
              <a href="#information-we-collect">{t.informationWeCollect}</a>
            </li>
            <li>
              <a href="#data-retention">{t.dataRetention}</a>
            </li>
            <li>
              <a href="#third-party-services">{t.thirdPartyServices}</a>
            </li>
            <li>
              <a href="#analytics-tracking">{t.analyticsTracking}</a>
            </li>
            <li>
              <a href="#user-rights">{t.userRights}</a>
            </li>
            <li>
              <a href="#updates-to-this-policy">{t.updatesToThisPolicy}</a>
            </li>
            <li>
              <a href="#contact-us">{t.contactUs}</a>
            </li>
          </ul>
        </section>

        <section id="introduction">
          <h2>{t.introduction}</h2>
          <p>{t.introductionText}</p>
          <p>
            <strong>{t.lastRevised}</strong>
          </p>
        </section>

        <section id="information-we-collect">
          <h2>{t.informationWeCollect}</h2>
          <p>{t.informationWeCollectText}</p>
        </section>

        <section id="data-retention">
          <h2>{t.dataRetention}</h2>
          <p>{t.dataRetentionText}</p>
        </section>

        <section id="third-party-services">
          <h2>{t.thirdPartyServices}</h2>
          <p>{t.thirdPartyServicesText}</p>
        </section>

        <section id="analytics-tracking">
          <h2>{t.analyticsTracking}</h2>
          <p>{t.analyticsTrackingText}</p>
        </section>

        <section id="user-rights">
          <h2>{t.userRights}</h2>
          <p>{t.userRightsText}</p>
          <p>{t.userRightsNote}</p>
        </section>

        <section id="updates-to-this-policy">
          <h2>{t.updatesToThisPolicy}</h2>
          <p>{t.updatesToThisPolicyText}</p>
        </section>

        <section id="contact-us">
          <h2>{t.contactUs}</h2>
          <p>
            {t.contactUsText}{' '}
            <a href="mailto:dmytro@turskyi.com">dmytro@turskyi.com</a>.
          </p>
        </section>
      </main>
    </div>
  );
}
