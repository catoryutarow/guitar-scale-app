import { Metadata } from 'next';
import { locales, isValidLocale } from '@/lib/locale-config';
import { generateArticleMetadata, generateArticleJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo-utils';
import { getTranslation } from '@/lib/i18n';
import HarmonicMinorPageClient from './HarmonicMinorPageClient';

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

  return generateArticleMetadata(locale, '/articles/harmonic-minor', 'harmonicMinorTitle', 'harmonicMinorDescription', '2025-01-20');
}

export default async function HarmonicMinorPage({
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
    'harmonic-minor',
    'harmonicMinorTitle',
    'harmonicMinorDescription',
    '2025-01-20'
  );

  const breadcrumbJsonLd = generateBreadcrumbJsonLd(validLocale, [
    { name: t.articles, path: '/articles' },
    { name: t.harmonicTitle, path: '/articles/harmonic-minor' },
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
      <HarmonicMinorPageClient />
    </>
  );
}
