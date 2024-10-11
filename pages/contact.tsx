import Head from 'next/head';

const ContactPage = () => {
  return (
    <>
      <Head>
        <title key="title">Contact us</title>
      </Head>
      <main>
        <h1>Contact us</h1>
        {/* Create a div element for the contact information */}
        <div className="mx-auto max-w-lg">
          {/* Create a p element for the phone number */}
          <p className="mb-4">
            <span className="font-bold">Phone:</span> +1 (437) 985-2581
          </p>
          <p className="mb-4">
            <span className="text-lg font-bold">Address:</span>
            <address className="mt-2 block not-italic leading-relaxed">
              3035 Finch West Avenue, <br />
              North York, Ontario, <br />
              M9M 0A3, Canada
            </address>
          </p>

          {/* Create a p element for the website */}
          <p className="mb-4">
            <span className="font-bold">Website:</span>{' '}
            <a href="https://turskyi.com" className="text-blue-500">
              turskyi.com
            </a>
          </p>
          {/* Create a p element for the email */}
          <p className="mb-4">
            <span className="font-bold">Email:</span>{' '}
            <a href="mailto:dmytro@turskyi.com" className="text-blue-500">
              dmytro@turskyi.com
            </a>
          </p>
        </div>
      </main>
    </>
  );
};

export default ContactPage;
