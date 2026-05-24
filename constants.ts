export const INPUT_MAX_LENGTH = 500;
export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/'
    : 'https://news.turskyi.com/';
export const NEWS_MAX = 6;
export const DEFAULT_COUNTRY_CODE = 'intl';
