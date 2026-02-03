import { Metadata } from 'next';
import { locales, isValidLocale } from '@/lib/locale-config';
import { generatePageMetadata, generateArticleJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo-utils';
import { getTranslation } from '@/lib/i18n';
import ModeScalesPageClient from './ModeScalesPageClient';

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

  return generatePageMetadata(locale, '/articles/mode-scales', 'modeScalesTitle', 'modeScalesDescription');
}

export default async function ModeScalesPage({
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
    'mode-scales',
    'modeScalesTitle',
    'modeScalesDescription',
    '2025-01-10'
  );

  const breadcrumbJsonLd = generateBreadcrumbJsonLd(validLocale, [
    { name: t.articles, path: '/articles' },
    { name: t.modeTitle, path: '/articles/mode-scales' },
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
      <ModeScalesPageClient />
    </>
  );
}
