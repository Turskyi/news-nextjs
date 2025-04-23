import Head from 'next/head';
import Image from 'next/image';
import screenshot1 from '../screenshots/screenshot1.png';
import screenshot2 from '../screenshots/screenshot2.png';
import screenshot3 from '../screenshots/screenshot3.png';
import screenshot4 from '../screenshots/screenshot4.png';

const AboutPage = () => {
  return (
    <>
      <Head>
        <title key="title">About</title>
      </Head>
      <main className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">About News Glance</h1>
        <p className="mb-4">
          <strong>News Glance</strong> is a minimalist, AI-powered news app that
          gives you the one thing you need every day: a smart, simple
          conclusion. At the top of the app, you&apos;ll find a single-sentence
          summary of today’s most important news — helping you understand the
          world at a glance.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">Key Features</h2>
        <ul className="list-disc pl-6 mb-4">
          <li>🧠 AI-generated daily conclusion, based on top global news</li>
          <li>📰 Scrollable list of curated headlines with summaries</li>
          <li>🔗 Read full articles directly from trusted sources</li>
          <li>📲 Home screen widget to keep the conclusion always visible</li>
          <li>⚡️ Clean, fast, and distraction-free design</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-2">Who It&apos;s For</h2>
        <p className="mb-4">
          News Glance is for anyone who wants to stay informed — without the
          overwhelm. If you&apos;re busy, distracted, or just tired of endless
          headlines, this app gives you clarity in seconds.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">
          Screenshots Explained
        </h2>
        <ul className="list-disc pl-6 mb-4">
          <li>
            🟩 Conclusion summary: instantly see the top takeaway of the day
          </li>
          <li>
            📄 Article view: read a full summary and visit the source link
          </li>
          <li>🌐 Web view: explore the full article in a browser-style page</li>
          <li>
            🏠 Widget: view the daily conclusion directly from your home screen
          </li>
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
        <h2 className="text-2xl font-semibold mt-6 mb-2 pt-4">Support</h2>
        <p>
          For any questions or feedback, please visit our{' '}
          <a
            href="https://turskyi.com/#/support"
            className="text-blue-500 underline"
          >
            support page
          </a>{' '}
          or join our{' '}
          <a
            href="https://t.me/+HrCX6YD2-X82MzIy"
            className="text-blue-500 underline"
          >
            Telegram support channel
          </a>
          .
        </p>
      </main>
    </>
  );
};

export default AboutPage;
