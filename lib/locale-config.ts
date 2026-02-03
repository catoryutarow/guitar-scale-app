/**
 * ロケール設定
 * 多言語SEO対応のための定数と型定義
 */

export const locales = ['ja', 'en', 'zh', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ja';

/**
 * ロケールが有効かどうかをチェック
 */
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

/**
 * ロケール名（表示用）
 */
export const localeNames: Record<Locale, string> = {
  ja: '日本語',
  en: 'English',
  zh: '中文',
  es: 'Español',
};

/**
 * OpenGraph用のロケール
 */
export const ogLocales: Record<Locale, string> = {
  ja: 'ja_JP',
  en: 'en_US',
  zh: 'zh_CN',
  es: 'es_ES',
};
