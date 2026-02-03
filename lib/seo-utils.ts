import { Metadata } from 'next';
import { locales, defaultLocale, ogLocales, type Locale } from '@/lib/locale-config';
import { getTranslation } from '@/lib/i18n';

const baseUrl = 'https://www.guitar-scale.com';

/**
 * hreflang用の言語alternatesを生成
 */
export function generateLanguageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  locales.forEach((l) => {
    languages[l] = `${baseUrl}/${l}${path}`;
  });
  languages['x-default'] = `${baseUrl}/${defaultLocale}${path}`;
  return languages;
}

/**
 * ページ用のメタデータを生成
 */
export function generatePageMetadata(
  locale: Locale,
  path: string,
  titleKey: keyof ReturnType<typeof getTranslation>['seo'],
  descriptionKey: keyof ReturnType<typeof getTranslation>['seo']
): Metadata {
  const t = getTranslation(locale);

  return {
    title: t.seo[titleKey] as string,
    description: t.seo[descriptionKey] as string,
    openGraph: {
      title: t.seo[titleKey] as string,
      description: t.seo[descriptionKey] as string,
      url: `${baseUrl}/${locale}${path}`,
      type: 'website',
      locale: ogLocales[locale],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}${path}`,
      languages: generateLanguageAlternates(path),
    },
  };
}

/**
 * 記事ページ用のArticle JSON-LDを生成
 */
export function generateArticleJsonLd(
  locale: Locale,
  slug: string,
  titleKey: keyof ReturnType<typeof getTranslation>['seo'],
  descriptionKey: keyof ReturnType<typeof getTranslation>['seo'],
  datePublished: string,
  dateModified?: string
) {
  const t = getTranslation(locale);

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t.seo[titleKey] as string,
    description: t.seo[descriptionKey] as string,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: 'モテコロ株式会社',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'モテコロ株式会社',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/icon.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/${locale}/articles/${slug}`,
    },
    inLanguage: locale,
  };
}

/**
 * パンくずリスト用のBreadcrumbList JSON-LDを生成
 */
export function generateBreadcrumbJsonLd(
  locale: Locale,
  items: Array<{ name: string; path: string }>
) {
  const t = getTranslation(locale);

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t.home,
        item: `${baseUrl}/${locale}`,
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.name,
        item: `${baseUrl}/${locale}${item.path}`,
      })),
    ],
  };
}
