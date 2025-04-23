import Head from 'next/head';

const ContactPage = () => {
  return (
    <>
      <Head>
        <title key="title">Contact us</title>
      </Head>
      <main>
        <h1>Contact us</h1>
        <p className="mb-6">
          If you have any issues, questions, or feedback about News Glance, feel free to reach out through any of the channels below.
        </p>
        {/* Create a div element for the contact information */}
        <div className="mx-auto max-w-lg">
          {/* Create a p element for the phone number */}
          <p className="mb-4">
            <span className="font-bold">Phone:</span> +1 (437) 985-2581
          </p>
          <div className="mb-4">
            <p className="text-lg font-bold mb-1">Address:</p>
            <address className="not-italic leading-relaxed">
              Harmony Village, <br />
              3035 Finch West Avenue, <br />
              North York, Ontario, <br />
              M9M 0A3, Canada
            </address>
          </div>

          {/* Create a p element for the website */}
          <p className="mb-4">
            <span className="font-bold">Support Form:</span>{' '}
            <a href="https://turskyi.com/#/support" className="text-blue-500">
              turskyi.com/support
            </a>
          </p>
          {/* Create a p element for the email */}
          <p className="mb-4">
            <span className="font-bold">Email:</span>{' '}
            <a href="mailto:dmytro@turskyi.com" className="text-blue-500">
              dmytro@turskyi.com
            </a>
          </p>
          <p className="mb-4">
            <span className="font-bold">Telegram Support:</span>{' '}
            <a
              href="https://t.me/+HrCX6YD2-X82MzIy"
              className="text-blue-500 underline"
            >
              Join our support channel
            </a>
          </p>
        </div>
      </main>
    </>
  );
};

export default ContactPage;
