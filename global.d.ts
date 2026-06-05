declare module '*.css';
declare module '*.module.css';
declare module '*.scss';
declare module '*.module.scss';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';

interface ImportMeta {
  readonly env: { [key: string]: string | undefined };
}
