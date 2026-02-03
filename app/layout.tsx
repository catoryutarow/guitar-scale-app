import type { Metadata } from "next";
import { Kiwi_Maru } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const kiwiMaru = Kiwi_Maru({
  weight: ['300', '400', '500'],
  subsets: ["latin"],
  variable: "--font-kiwi-maru",
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://guitar-scale-wakarun.com'),
  title: {
    default: 'ギタースケールわかる君',
    template: '%s | ギタースケールわかる君',
  },
  description: 'ギタースケールを視覚的に学べる無料ウェブアプリ。40種類以上のスケールをギター指板上で確認、音源自動解析でキー判定も可能。初心者からプロまで使えるギター練習ツール。',
  keywords: ['ギタースケール', 'ギター練習', 'スケール練習', '指板', 'ギター初心者', '音楽理論', 'キー判定', '音源解析'],
  authors: [{ name: 'モテコロ株式会社' }],
  creator: 'モテコロ株式会社',
  publisher: 'モテコロ株式会社',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://guitar-scale-wakarun.com',
    siteName: 'ギタースケールわかる君',
    title: 'ギタースケールわかる君',
    description: 'ギタースケールを視覚的に学べる無料ウェブアプリ。40種類以上のスケールをギター指板上で確認、音源自動解析でキー判定も可能。',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ギタースケールわかる君',
    description: 'ギタースケールを視覚的に学べる無料ウェブアプリ。40種類以上のスケールをギター指板上で確認、音源自動解析でキー判定も可能。',
  },
  alternates: {
    canonical: 'https://guitar-scale-wakarun.com',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://guitar-scale-wakarun.com/#webapp',
      name: 'ギタースケールわかる君',
      description: 'ギタースケールを視覚的に学べる無料ウェブアプリ。40種類以上のスケールをギター指板上で確認、音源自動解析でキー判定も可能。',
      url: 'https://guitar-scale-wakarun.com',
      applicationCategory: 'MusicApplication',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'JPY',
      },
      inLanguage: 'ja',
    },
    {
      '@type': 'Organization',
      '@id': 'https://guitar-scale-wakarun.com/#organization',
      name: 'モテコロ株式会社',
      url: 'https://guitar-scale-wakarun.com',
      logo: 'https://guitar-scale-wakarun.com/icon-512x512.png',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://guitar-scale-wakarun.com/#website',
      url: 'https://guitar-scale-wakarun.com',
      name: 'ギタースケールわかる君',
      publisher: {
        '@id': 'https://guitar-scale-wakarun.com/#organization',
      },
      inLanguage: 'ja',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
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
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
