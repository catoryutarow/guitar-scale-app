import { MetadataRoute } from 'next';
import { locales, defaultLocale, type Locale } from '@/lib/locale-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.guitar-scale.com';

  // 各ページの最終更新日（実際の更新日を管理）
  const pageLastModified: Record<string, string> = {
    '': '2025-01-25',
    '/about': '2025-01-20',
    '/articles': '2025-01-22',
    '/analysis': '2025-01-20',
    '/contact': '2025-01-15',
    '/terms': '2025-01-15',
    '/privacy': '2025-01-15',
    '/company': '2025-01-15',
    '/articles/pentatonic-basics': '2025-01-15',
    '/articles/harmonic-minor': '2025-01-20',
    '/articles/blues-scale': '2025-01-05',
    '/articles/mode-scales': '2025-01-10',
    '/articles/scale-practice': '2025-01-22',
  };

  // 全ページのパス
  const paths = Object.keys(pageLastModified);

  // 各パスに対してhreflang alternatesを生成
  const generateAlternates = (path: string): Record<string, string> => {
    const alternates: Record<string, string> = {};
    locales.forEach((locale) => {
      alternates[locale] = `${baseUrl}/${locale}${path}`;
    });
    alternates['x-default'] = `${baseUrl}/${defaultLocale}${path}`;
    return alternates;
  };

  // 優先度とchangeFrequencyを設定
  const getPageConfig = (path: string): { priority: number; changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' } => {
    if (path === '') {
      return { priority: 1, changeFrequency: 'weekly' };
    }
    if (path === '/articles') {
      return { priority: 0.9, changeFrequency: 'weekly' };
    }
    if (path === '/analysis') {
      return { priority: 0.8, changeFrequency: 'monthly' };
    }
    if (path.startsWith('/articles/')) {
      return { priority: 0.8, changeFrequency: 'monthly' };
    }
    if (path === '/about') {
      return { priority: 0.5, changeFrequency: 'monthly' };
    }
    if (path === '/contact') {
      return { priority: 0.5, changeFrequency: 'monthly' };
    }
    // terms, privacy, company
    return { priority: 0.3, changeFrequency: 'yearly' };
  };

  // 全ロケール × 全パスのエントリを生成
  const entries: MetadataRoute.Sitemap = [];

  paths.forEach((path) => {
    const config = getPageConfig(path);
    const alternates = generateAlternates(path);

    locales.forEach((locale) => {
      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(pageLastModified[path]),
        changeFrequency: config.changeFrequency,
        priority: config.priority,
        alternates: {
          languages: alternates,
        },
      });
    });
  });

  return entries;
}
