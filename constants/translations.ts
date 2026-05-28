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
}

export const translations: Record<Language, Translations> = {
  en: {
    title: 'News Glance',
    description: 'A website that displays top news articles and uses modern AI to generate a conclusion.',
    aiSubtitle: 'AI-powered actionable insights from today\'s comprehensive news analysis',
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
  },
  uk: {
    title: 'Огляд Новин',
    description: 'Веб-сайт, який відображає головні новини та використовує сучасний ШІ для створення висновків.',
    aiSubtitle: 'Аналітичні висновки на основі ШІ з сьогоднішнього огляду новин',
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
      HEALTH: 'Здоров\'я',
      TRAVEL: 'Подорожі',
      LIFESTYLE: 'Стиль життя',
      GENERAL: 'Загальне',
    },
    nav: {
      news: 'Новини',
      search: 'Пошук',
      contact: 'Зворотній зв\'язок',
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
  },
};
