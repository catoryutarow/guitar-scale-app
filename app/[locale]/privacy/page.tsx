import { Metadata } from 'next';
import { locales, isValidLocale } from '@/lib/locale-config';
import { generatePageMetadata } from '@/lib/seo-utils';
import PrivacyPageClient from './PrivacyPageClient';

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

  return generatePageMetadata(locale, '/privacy', 'privacyTitle', 'privacyDescription');
}

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}
