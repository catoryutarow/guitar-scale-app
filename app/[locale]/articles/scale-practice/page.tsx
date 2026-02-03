import { Metadata } from 'next';
import { locales, isValidLocale } from '@/lib/locale-config';
import { generatePageMetadata, generateArticleJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo-utils';
import { getTranslation } from '@/lib/i18n';
import ScalePracticePageClient from './ScalePracticePageClient';

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

  return generatePageMetadata(locale, '/articles/scale-practice', 'scalePracticeTitle', 'scalePracticeDescription');
}

export default async function ScalePracticePage({
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
    'scale-practice',
    'scalePracticeTitle',
    'scalePracticeDescription',
    '2025-01-22'
  );

  const breadcrumbJsonLd = generateBreadcrumbJsonLd(validLocale, [
    { name: t.articles, path: '/articles' },
    { name: t.practiceTitle, path: '/articles/scale-practice' },
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
      <ScalePracticePageClient />
    </>
  );
}
