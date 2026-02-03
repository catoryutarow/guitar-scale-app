import type { Metadata } from "next";
import { Kiwi_Maru } from "next/font/google";
import Script from "next/script";
import { notFound } from "next/navigation";
import "../globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { locales, defaultLocale, isValidLocale, ogLocales, type Locale } from "@/lib/locale-config";
import { getTranslation } from "@/lib/i18n";

const kiwiMaru = Kiwi_Maru({
  weight: ['300', '400', '500'],
  subsets: ["latin"],
  variable: "--font-kiwi-maru",
  display: 'swap',
});

/**
 * 静的パラメータ生成（各ロケール用のページを事前生成）
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * 動的メタデータ生成
 */
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

  // 他言語へのalternateリンク
  const languages: Record<string, string> = {};
  locales.forEach((l) => {
    languages[l] = `${baseUrl}/${l}`;
  });
  languages['x-default'] = `${baseUrl}/${defaultLocale}`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: t.seo.siteTitle,
      template: `%s | ${t.seo.siteTitle}`,
    },
    description: t.seo.siteDescription,
    authors: [{ name: 'モテコロ株式会社' }],
    creator: 'モテコロ株式会社',
    publisher: 'モテコロ株式会社',
    openGraph: {
      type: 'website',
      locale: ogLocales[locale],
      url: `${baseUrl}/${locale}`,
      siteName: t.seo.siteTitle,
      title: t.seo.siteTitle,
      description: t.seo.siteDescription,
      images: [
        {
          url: '/og-image.svg',
          width: 1200,
          height: 630,
          alt: t.seo.siteTitle,
          type: 'image/svg+xml',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.seo.siteTitle,
      description: t.seo.siteDescription,
      images: ['/og-image.svg'],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * JSON-LD構造化データを生成
 * Note: JSON-LD data is generated from trusted, developer-controlled translation data only
 */
function generateJsonLd(locale: Locale) {
  const t = getTranslation(locale);
  const baseUrl = 'https://www.guitar-scale.com';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        '@id': `${baseUrl}/#webapp`,
        name: t.seo.siteTitle,
        description: t.seo.siteDescription,
        url: `${baseUrl}/${locale}`,
        applicationCategory: 'MusicApplication',
        operatingSystem: 'Web Browser',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: locale === 'ja' ? 'JPY' : 'USD',
        },
        inLanguage: locale,
      },
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: 'モテコロ株式会社',
        url: baseUrl,
        logo: `${baseUrl}/icon.png`,
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: `${baseUrl}/${locale}`,
        name: t.seo.siteTitle,
        publisher: {
          '@id': `${baseUrl}/#organization`,
        },
        inLanguage: locale,
      },
    ],
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // 無効なロケールの場合は404
  if (!isValidLocale(locale)) {
    notFound();
  }

  const jsonLd = generateJsonLd(locale);

  return (
    <html lang={locale}>
      <head>
        {/* JSON-LD structured data - content is from trusted translation files only */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8PHC5QFD29"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8PHC5QFD29');
          `}
        </Script>
      </head>
      <body
        className={`${kiwiMaru.variable} font-sans antialiased`}
        style={{ fontFamily: 'var(--font-kiwi-maru)' }}
      >
        <LanguageProvider initialLocale={locale}>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
