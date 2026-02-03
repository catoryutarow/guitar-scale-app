import { Metadata } from 'next';
import { locales, isValidLocale, type Locale } from '@/lib/locale-config';
import { generatePageMetadata, generateArticleJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo-utils';
import { getTranslation } from '@/lib/i18n';
import PentatonicBasicsPageClient from './PentatonicBasicsPageClient';

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

  return generatePageMetadata(locale, '/articles/pentatonic-basics', 'pentatonicTitle', 'pentatonicDescription');
}

export default async function PentatonicBasicsPage({
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
    'pentatonic-basics',
    'pentatonicTitle',
    'pentatonicDescription',
    '2025-01-15'
  );

  const breadcrumbJsonLd = generateBreadcrumbJsonLd(validLocale, [
    { name: t.articles, path: '/articles' },
    { name: t.pentatonicMajor, path: '/articles/pentatonic-basics' },
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
      <PentatonicBasicsPageClient />
    </>
  );
}
