import { Metadata } from 'next';
import HomeClient from './HomeClient';
import { locales, isValidLocale, ogLocales, defaultLocale } from '@/lib/locale-config';
import { getTranslation } from '@/lib/i18n';

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

  const t = getTranslation(locale);
  const baseUrl = 'https://www.guitar-scale.com';

  // hreflang用の言語alternates
  const languages: Record<string, string> = {};
  locales.forEach((l) => {
    languages[l] = `${baseUrl}/${l}`;
  });
  languages['x-default'] = `${baseUrl}/${defaultLocale}`;

  return {
    title: {
      absolute: t.seo.homeTitle,
    },
    description: t.seo.homeDescription,
    openGraph: {
      title: t.seo.homeTitle,
      description: t.seo.homeDescription,
      url: `${baseUrl}/${locale}`,
      type: 'website',
      locale: ogLocales[locale],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages,
    },
  };
}

export default function Home() {
  return <HomeClient />;
}
