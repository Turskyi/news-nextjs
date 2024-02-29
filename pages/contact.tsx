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
          {/* Create a p element for the address */}
          <p className="mb-4">
            <span className="font-bold">Address:</span> 500 Sherbourne St.,
            Unit. 2701 Toronto Ontario M4X1L1 Canada
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
