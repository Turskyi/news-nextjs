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
  },
};
