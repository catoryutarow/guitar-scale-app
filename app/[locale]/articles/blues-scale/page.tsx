import { Metadata } from 'next';
import { locales, isValidLocale } from '@/lib/locale-config';
import { generateArticleMetadata, generateArticleJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo-utils';
import { getTranslation } from '@/lib/i18n';
import BluesScalePageClient from './BluesScalePageClient';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    return {};
  }

  return generateArticleMetadata(locale, '/articles/blues-scale', 'bluesScaleTitle', 'bluesScaleDescription', '2025-01-05');
}

export default async function BluesScalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = isValidLocale(locale) ? locale : 'ja';
  const t = getTranslation(validLocale);

  // JSON-LD structured data (content from trusted translation files only)
  const articleJsonLd = generateArticleJsonLd(
    validLocale,
    'blues-scale',
    'bluesScaleTitle',
    'bluesScaleDescription',
    '2025-01-05'
  );

  const breadcrumbJsonLd = generateBreadcrumbJsonLd(validLocale, [
    { name: t.articles, path: '/articles' },
    { name: t.bluesTitle, path: '/articles/blues-scale' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BluesScalePageClient />
    </>
  );
}
