import Head from 'next/head';
import { Language, translations } from '@/constants/translations';
import { useRouter } from 'next/router';

const ContactPage = () => {
  const router = useRouter();
  const lang = (router.query.lang as Language) || 'en';
  const t = translations[lang].contact;

  return (
    <>
      <Head>
        <title key="title">{t.title}</title>
      </Head>
      <main>
        <h1>{t.header}</h1>
        <p className="mb-6">{t.description}</p>
        {/* Create a div element for the contact information */}
        <div className="mx-auto max-w-lg">
          {/* Create a p element for the phone number */}
          <p className="mb-4">
            <span className="font-bold">{t.phone}:</span> +1 (437) 985-2581
          </p>
          <div className="mb-4">
            <p className="text-lg font-bold mb-1">{t.address}:</p>
            <address className="not-italic leading-relaxed">
              Harmony Village, <br />
              3035 Finch West Avenue, <br />
              North York, Ontario, <br />
              M9M 0A3, Canada
            </address>
          </div>

          {/* Create a p element for the website */}
          <p className="mb-4">
            <span className="font-bold">{t.supportForm}:</span>{' '}
            <a href="https://turskyi.com/#/support" className="text-blue-500">
              turskyi.com/support
            </a>
          </p>
          {/* Create a p element for the email */}
          <p className="mb-4">
            <span className="font-bold">{t.email}:</span>{' '}
            <a href="mailto:dmytro@turskyi.com" className="text-blue-500">
              dmytro@turskyi.com
            </a>
          </p>
          <p className="mb-4">
            <span className="font-bold">{t.telegramSupport}:</span>{' '}
            <a
              href="https://t.me/+HrCX6YD2-X82MzIy"
              className="text-blue-500 underline"
            >
              {t.joinChannel}
            </a>
          </p>
        </div>
      </main>
    </>
  );
};

export default ContactPage;
