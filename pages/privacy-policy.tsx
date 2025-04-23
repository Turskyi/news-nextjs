import Head from 'next/head';

export default function PrivacyPolicy() {
  return (
    <div>
      <Head>
        <title>Privacy Policy - News Glance</title>
      </Head>

      <main>
        <h1>Privacy Policy</h1>
        <section>
          <h2>Table of Contents</h2>
          <ul>
            <li>
              <a href="#introduction">Introduction</a>
            </li>
            <li>
              <a href="#information-we-collect">Information We Collect</a>
            </li>
            <li>
              <a href="#data-retention">Data Retention</a>
            </li>
            <li>
              <a href="#third-party-services">Third-Party Services</a>
            </li>
            <li>
              <a href="#analytics-tracking">Analytics and Tracking</a>
            </li>
            <li>
              <a href="#user-rights">User Rights</a>
            </li>
            <li>
              <a href="#updates-to-this-policy">Updates to this Policy</a>
            </li>
            <li>
              <a href="#contact-us">Contact Us</a>
            </li>
          </ul>
        </section>

        <section id="introduction">
          <h2>Introduction</h2>
          <p>
            At News Glance, we are committed to protecting your personal
            information and your right to privacy. This Privacy Policy applies
            to all information collected through our app and website, including
            mobile, web, and desktop platforms.
          </p>
          <p>
            <strong>Last Revised: April 22, 2025</strong>
          </p>
        </section>

        <section id="information-we-collect">
          <h2>Information We Collect</h2>
          <p>
            We do not collect any personal information from users of our app or
            website. News Glance does not require you to sign up, log in, or
            provide any personal data to access its core features.
          </p>
        </section>

        <section id="data-retention">
          <h2>Data Retention</h2>
          <p>
            Since we do not collect any personal information, we do not retain
            any user data. No personal data is stored or processed on our
            servers.
          </p>
        </section>

        <section id="third-party-services">
          <h2>Third-Party Services</h2>
          <p>
            News Glance does not collect or share any personal information.
            However, third-party platforms such as the Apple App Store, embedded
            web views, and other third-party services may collect data in
            accordance with their own privacy policies. This may include
            tracking information, cookies, or location data. We encourage users
            to review the privacy practices of these third-party services.
          </p>
        </section>

        <section id="analytics-tracking">
          <h2>Analytics and Tracking</h2>
          <p>
            News Glance does not collect personal information, but we may use
            third-party analytics services, such as Google Analytics or
            Firebase, to track app performance and usage data. These services
            collect anonymous usage data, which helps us improve the app
            experience. The data collected by these services is subject to their
            respective privacy policies.
          </p>
        </section>

        <section id="user-rights">
          <h2>User Rights</h2>
          <p>
            Since News Glance does not collect or process personal information,
            we do not store any user data. However, depending on your location,
            including under the General Data Protection Regulation (GDPR) or the
            California Consumer Privacy Act (CCPA), you may have certain rights
            regarding your personal data, which would apply to third-party
            services that collect data (such as the Apple App Store or external
            web views).
          </p>
          <p>
            Please note that if you navigate to external sites via the WebView,
            any data collection or actions on those websites are outside of our
            control and responsibility.
          </p>
        </section>

        <section id="updates-to-this-policy">
          <h2>Updates to this Policy</h2>
          <p>
            We may update this privacy policy from time to time. The updated
            version will be indicated by an updated &quot;Revised&quot; date and
            the updated version will be effective as soon as it is accessible.
          </p>
        </section>

        <section id="contact-us">
          <h2>Contact Us</h2>
          <p>
            If you have questions or comments about this policy, you may email
            us at <a href="mailto:dmytro@turskyi.com">dmytro@turskyi.com</a>.
          </p>
        </section>
      </main>
    </div>
  );
}
