export type Language = 'en' | 'uk';

export interface Translations {
  title: string;
  description: string;
  aiSubtitle: string;
  loadingInsight: string;
  readMore: string;
  actionableInsight: string;
  conversationalSummary: string;
  summary: string;
  probability: string;
  category: string;
  level: string;
  conclusion: string;
  switchLanguage: string;
  categories: Record<string, string>;
  nav: {
    news: string;
    search: string;
    contact: string;
    privacy: string;
    about: string;
  };
  noTitle: string;
  noDescription: string;
  searchTitle: string;
  searchQueryLabel: string;
  searchPlaceholder: string;
  searchButtonText: string;
  searchError: string;
  searchNoResults: string;
  about: {
    title: string;
    header: string;
    description: string;
    keyFeatures: string;
    features: string[];
    whoItsFor: string;
    whoItsForDescription: string;
    screenshotsExplained: string;
    screenshots: string[];
    support: string;
    supportText: string;
    supportPage: string;
    telegramChannel: string;
  };
  contact: {
    title: string;
    header: string;
    description: string;
    phone: string;
    address: string;
    supportForm: string;
    email: string;
    telegramSupport: string;
    joinChannel: string;
  };
  privacy: {
    title: string;
    header: string;
    tableOfContents: string;
    introduction: string;
    introductionText: string;
    lastRevised: string;
    informationWeCollect: string;
    informationWeCollectText: string;
    dataRetention: string;
    dataRetentionText: string;
    thirdPartyServices: string;
    thirdPartyServicesText: string;
    analyticsTracking: string;
    analyticsTrackingText: string;
    userRights: string;
    userRightsText: string;
    userRightsNote: string;
    updatesToThisPolicy: string;
    updatesToThisPolicyText: string;
    contactUs: string;
    contactUsText: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    title: 'News Glance',
    description:
      'A website that displays top news articles and uses modern AI to generate a conclusion.',
    aiSubtitle:
      "AI-powered actionable insights from today's comprehensive news analysis",
    loadingInsight: 'Analyzing news for insights...',
    readMore: 'Read more',
    actionableInsight: 'Actionable Insight',
    conversationalSummary: 'Conversational Summary',
    summary: 'Summary',
    probability: 'Probability',
    category: 'Category',
    level: 'Signal Level',
    conclusion: 'Conclusion',
    switchLanguage: 'Українська',
    categories: {
      SAFETY: 'Safety',
      FINANCE: 'Finance',
      HEALTH: 'Health',
      TRAVEL: 'Travel',
      LIFESTYLE: 'Lifestyle',
      GENERAL: 'General',
    },
    nav: {
      news: 'News',
      search: 'Search',
      contact: 'Contact us',
      privacy: 'Privacy',
      about: 'About',
    },
    noTitle: 'No Title Available',
    noDescription: 'No description available.',
    searchTitle: 'Search News',
    searchQueryLabel: 'Search query',
    searchPlaceholder: 'e.g. politics, sports, ...',
    searchButtonText: 'Search',
    searchError: 'Something went wrong. Please try again.',
    searchNoResults: 'Nothing found. Try a different query.',
    about: {
      title: 'About',
      header: 'About News Glance',
      description:
        "News Glance is a minimalist, modern AI-powered news app that gives you the one thing you need every day: a smart, simple conclusion. At the top of the app, you'll find a single-sentence summary of today’s most important news — helping you understand the world at a glance.",
      keyFeatures: 'Key Features',
      features: [
        '🧠 Modern AI-generated daily conclusion, based on top global news',
        '📰 Scrollable list of curated headlines with summaries',
        '🔗 Read full articles directly from trusted sources',
        '📲 Home screen widget to keep the conclusion always visible',
        '⚡️ Clean, fast, and distraction-free design',
      ],
      whoItsFor: "Who It's For",
      whoItsForDescription:
        "News Glance is for anyone who wants to stay informed — without the overwhelm. If you're busy, distracted, or just tired of endless headlines, this app gives you clarity in seconds.",
      screenshotsExplained: 'Screenshots Explained',
      screenshots: [
        '🟩 Conclusion summary: instantly see the top takeaway of the day',
        '📄 Article view: read a full summary and visit the source link',
        '🌐 Web view: explore the full article in a browser-style page',
        '🏠 Widget: view the daily conclusion directly from your home screen',
      ],
      support: 'Support',
      supportText: 'For any questions or feedback, please visit our ',
      supportPage: 'support page',
      telegramChannel: 'Telegram support channel',
    },
    contact: {
      title: 'Contact us',
      header: 'Contact us',
      description:
        'If you have any issues, questions, or feedback about News Glance, feel free to reach out through any of the channels below.',
      phone: 'Phone',
      address: 'Address',
      supportForm: 'Support Form',
      email: 'Email',
      telegramSupport: 'Telegram Support',
      joinChannel: 'Join our support channel',
    },
    privacy: {
      title: 'Privacy Policy - News Glance',
      header: 'Privacy Policy',
      tableOfContents: 'Table of Contents',
      introduction: 'Introduction',
      introductionText:
        'At News Glance, we are committed to protecting your personal information and your right to privacy. This Privacy Policy applies to all information collected through our app and website, including mobile, web, and desktop platforms.',
      lastRevised: 'Last Revised: April 22, 2025',
      informationWeCollect: 'Information We Collect',
      informationWeCollectText:
        'We do not collect any personal information from users of our app or website. News Glance does not require you to sign up, log in, or provide any personal data to access its core features.',
      dataRetention: 'Data Retention',
      dataRetentionText:
        'Since we do not collect any personal information, we do not retain any user data. No personal data is stored or processed on our servers.',
      thirdPartyServices: 'Third-Party Services',
      thirdPartyServicesText:
        'News Glance does not collect or share any personal information. However, we utilize third-party AI providers including Groq, Mistral, and Google (Gemini) as data processors to generate news conclusions. These providers process news article content to provide summaries and insights. Additionally, third-party platforms such as the Apple App Store, embedded web views, and other third-party services may collect data in accordance with their own privacy policies. This may include tracking information, cookies, or location data. We encourage users to review the privacy practices of these third-party services.',
      analyticsTracking: 'Analytics and Tracking',
      analyticsTrackingText:
        'News Glance does not collect personal information, but we may use third-party analytics services, such as Google Analytics or Firebase, to track app performance and usage data. These services collect anonymous usage data, which helps us improve the app experience. The data collected by these services is subject to their respective privacy policies.',
      userRights: 'User Rights',
      userRightsText:
        'Since News Glance does not collect or process personal information, we do not store any user data. However, depending on your location, including under the General Data Protection Regulation (GDPR) or the California Consumer Privacy Act (CCPA), you may have certain rights regarding your personal data, which would apply to third-party services that collect data (such as the Apple App Store or external web views).',
      userRightsNote:
        'Please note that if you navigate to external sites via the WebView, any data collection or actions on those websites are outside of our control and responsibility.',
      updatesToThisPolicy: 'Updates to this Policy',
      updatesToThisPolicyText:
        'We may update this privacy policy from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible.',
      contactUs: 'Contact Us',
      contactUsText:
        'If you have questions or comments about this policy, you may email us at',
    },
  },
  uk: {
    title: 'Огляд Новин',
    description:
      'Веб-сайт, який відображає головні новини та використовує сучасний ШІ для створення висновків.',
    aiSubtitle:
      'Аналітичні висновки на основі ШІ з сьогоднішнього огляду новин',
    loadingInsight: 'Аналіз новин для отримання висновків...',
    readMore: 'Читати далі',
    actionableInsight: 'Практичні висновки',
    conversationalSummary: 'Дружній огляд',
    summary: 'Підсумок',
    probability: 'Ймовірність',
    category: 'Категорія',
    level: 'Рівень сигналу',
    conclusion: 'Висновок',
    switchLanguage: 'English',
    categories: {
      SAFETY: 'Безпека',
      FINANCE: 'Фінанси',
      HEALTH: "Здоров'я",
      TRAVEL: 'Подорожі',
      LIFESTYLE: 'Стиль життя',
      GENERAL: 'Загальне',
    },
    nav: {
      news: 'Новини',
      search: 'Пошук',
      contact: "Зворотній зв'язок",
      privacy: 'Конфіденційність',
      about: 'Про нас',
    },
    noTitle: 'Заголовок відсутній',
    noDescription: 'Опис відсутній.',
    searchTitle: 'Пошук новин',
    searchQueryLabel: 'Запит для пошуку',
    searchPlaceholder: 'напр. політика, спорт, ...',
    searchButtonText: 'Пошук',
    searchError: 'Щось пішло не так. Будь ласка, спробуйте ще раз.',
    searchNoResults: 'Нічого не знайдено. Спробуйте інший запит.',
    about: {
      title: 'Про нас',
      header: 'Про Огляд Новин',
      description:
        'Огляд Новин - це мінімалістичний, сучасний додаток для новин на базі ШІ, який дає вам одну річ, яка вам потрібна щодня: розумний, простий висновок. У верхній частині додатка ви знайдете резюме найважливіших новин дня одним реченням, що допоможе вам зрозуміти світ з першого погляду.',
      keyFeatures: 'Ключові особливості',
      features: [
        '🧠 Сучасний щоденний висновок, згенерований ШІ на основі головних світових новин',
        '📰 Список заголовків з резюме, що можна прокручувати',
        '🔗 Читайте повні статті безпосередньо з надійних джерел',
        '📲 Віджет на головному екрані, щоб висновок завжди був перед очима',
        '⚡️ Чистий, швидкий дизайн без відволікань',
      ],
      whoItsFor: 'Для кого це',
      whoItsForDescription:
        'Огляд Новин для тих, хто хоче залишатися в курсі подій без перевантаження. Якщо ви зайняті, розсіяні або просто втомилися від нескінченних заголовків, цей додаток дасть вам ясність за лічені секунди.',
      screenshotsExplained: 'Пояснення скріншотів',
      screenshots: [
        '🟩 Резюме висновку: миттєво дізнайтеся головний підсумок дня',
        '📄 Перегляд статті: прочитайте повне резюме та перейдіть за посиланням на джерело',
        '🌐 Веб-перегляд: читайте повну статтю на сторінці в стилі браузера',
        '🏠 Віджет: переглядайте щоденний висновок безпосередньо з головного екрана',
      ],
      support: 'Підтримка',
      supportText:
        'З будь-яких питань або для зворотного зв’язку, будь ласка, відвідайте нашу ',
      supportPage: 'сторінку підтримки',
      telegramChannel: 'канал підтримки в Telegram',
    },
    contact: {
      title: "Зворотній зв'язок",
      header: "Зворотній зв'язок",
      description:
        "Якщо у вас є будь-які питання, проблеми або відгуки про Огляд Новин, зв'яжіться з нами через будь-який з наступних каналів.",
      phone: 'Телефон',
      address: 'Адреса',
      supportForm: 'Форма підтримки',
      email: 'Електронна пошта',
      telegramSupport: 'Підтримка в Telegram',
      joinChannel: 'Приєднайтеся до нашого каналу підтримки',
    },
    privacy: {
      title: 'Політика конфіденційності - Огляд Новин',
      header: 'Політика конфіденційності',
      tableOfContents: 'Зміст',
      introduction: 'Вступ',
      introductionText:
        "У Огляді Новин ми прив'язані до захисту ваших персональних даних та вашого права на конфіденційність. Ця Політика конфіденційності застосовується до всієї інформації, зібраної через наш додаток та веб-сайт, включаючи мобільні, веб- та настільні платформи.",
      lastRevised: 'Останнє оновлення: 22 квітня 2025 р.',
      informationWeCollect: 'Інформація, яку ми збираємо',
      informationWeCollectText:
        'Ми не збираємо будь-яку персональну інформацію від користувачів нашого додатка або веб-сайту. Огляд Новин не вимагає від вас реєстрацію, вхід або надання будь-яких персональних даних для доступу до його основних функцій.',
      dataRetention: 'Зберігання даних',
      dataRetentionText:
        'Оскільки ми не збираємо персональну інформацію, ми не зберігаємо дані користувачів. Жодні персональні дані не зберігаються та не обробляються на наших серверах.',
      thirdPartyServices: 'Послуги третіх сторін',
      thirdPartyServicesText:
        'Огляд Новин не збирає та не ділиться персональною інформацією. Однак ми використовуємо постачальників ШІ третіх сторін, включаючи Groq, Mistral та Google (Gemini), як обробників даних для створення висновків новин. Ці постачальники обробляють вміст новинних статей для надання резюме та аналітики. Крім того, платформи третіх сторін, такі як Apple App Store, вбудовані веб-представлення та інші послуги третіх сторін можуть збирати дані відповідно до своїх політик конфіденційності. Це може включати інформацію про відстеження, файли cookie або дані про місцезнаходження. Ми рекомендуємо користувачам ознайомитися з практикою конфіденційності цих послуг третіх сторін.',
      analyticsTracking: 'Аналітика та відстеження',
      analyticsTrackingText:
        'Огляд Новин не збирає персональну інформацію, але ми можемо використовувати послуги аналітики третіх сторін, такі як Google Analytics або Firebase, для відстеження продуктивності додатка та даних про використання. Ці послуги збирають анонімні дані про використання, які допомагають нам поліпшити взаємодію з додатком. Дані, зібрані цими послугами, підпадають під їхні відповідні політики конфіденційності.',
      userRights: 'Права користувачів',
      userRightsText:
        'Оскільки Огляд Новин не збирає та не обробляє персональну інформацію, ми не зберігаємо дані користувачів. Однак залежно від вашого місцезнаходження, включаючи Загальне положення про захист даних (GDPR) або Закон про захист конфіденційності споживачів Каліфорнії (CCPA), у вас можуть бути певні права щодо ваших персональних даних, які застосовуватимуться до послуг третіх сторін, які збирають дані (наприклад, Apple App Store або зовнішні веб-представлення).',
      userRightsNote:
        'Зауважте, що якщо ви переходите на зовнішні сайти через WebView, будь-яка збірка даних або дії на цих веб-сайтах знаходяться поза нашою контролем та відповідальністю.',
      updatesToThisPolicy: 'Оновлення цієї Політики',
      updatesToThisPolicyText:
        'Ми можемо оновлювати цю політику конфіденційності час від часу. Оновлена версія буде позначена оновленою датою "Переглянуто" і оновлена версія набирає чинності, як тільки вона стає доступною.',
      contactUs: "Зв'яжіться з нами",
      contactUsText:
        'Якщо у вас є питання або коментарі щодо цієї політики, ви можете написати нам на',
    },
  },
};
