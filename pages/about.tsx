import Head from 'next/head';
import Image from 'next/image';
import screenshot1 from '../screenshots/screenshot1.png';
import screenshot2 from '../screenshots/screenshot2.png';
import screenshot3 from '../screenshots/screenshot3.png';
import screenshot4 from '../screenshots/screenshot4.png';
import { Language, translations } from '@/constants/translations';
import { useRouter } from 'next/router';

const AboutPage = () => {
  const router = useRouter();
  const lang = (router.query.lang as Language) || 'en';
  const t = translations[lang].about;

  return (
    <>
      <Head>
        <title key="title">{t.title}</title>
      </Head>
      <main className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">{t.header}</h1>
        <p className="mb-4">
          <strong>News Glance</strong> {t.description}
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">{t.keyFeatures}</h2>
        <ul className="list-disc pl-6 mb-4">
          {t.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-2">{t.whoItsFor}</h2>
        <p className="mb-4">{t.whoItsForDescription}</p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">
          {t.screenshotsExplained}
        </h2>
        <ul className="list-disc pl-6 mb-4">
          {t.screenshots.map((screenshot, index) => (
            <li key={index}>{screenshot}</li>
          ))}
        </ul>
        <div className="flex justify-center overflow-x-auto mb-8">
          <div className="flex w-max gap-2">
            <Image
              src={screenshot1}
              alt="Conclusion screen"
              width={250}
              height={500}
              className="rounded-lg"
            />
            <Image
              src={screenshot2}
              alt="News details screen"
              width={250}
              height={500}
              className="rounded-lg"
            />
            <Image
              src={screenshot3}
              alt="Web view screen"
              width={250}
              height={500}
              className="rounded-lg"
            />
            <Image
              src={screenshot4}
              alt="Widget on home screen"
              width={250}
              height={500}
              className="rounded-lg"
            />
          </div>
        </div>
        <h2 className="text-2xl font-semibold mt-6 mb-2 pt-4">{t.support}</h2>
        <p>
          {t.supportText}
          <a
            href="https://turskyi.com/#/support"
            className="text-blue-500 underline"
          >
            {t.supportPage}
          </a>{' '}
          or join our{' '}
          <a
            href="https://t.me/+HrCX6YD2-X82MzIy"
            className="text-blue-500 underline"
          >
            {t.telegramChannel}
          </a>
          .
        </p>
      </main>
    </>
  );
};

export default AboutPage;
