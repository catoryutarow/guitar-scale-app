import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ハーモニックマイナースケール完全ガイド | ギタースケールわかる君',
  description:
    'ハーモニックマイナースケールの構造、特徴的なサウンド、クラシックからメタルまでの実践的な活用法を解説。独特の響きを習得しよう。',
  keywords: ['ハーモニックマイナー', 'ハーモニックマイナースケール', 'ギター', 'スケール', 'メタル', 'クラシック'],
  openGraph: {
    title: 'ハーモニックマイナースケール完全ガイド | ギタースケールわかる君',
    description: 'ハーモニックマイナースケールの構造と活用法を解説。',
    url: 'https://www.guitar-scale.com/articles/harmonic-minor',
    siteName: 'ギタースケールわかる君',
    locale: 'ja_JP',
    type: 'article',
  },
  alternates: {
    canonical: 'https://www.guitar-scale.com/articles/harmonic-minor',
  },
};

export default function HarmonicMinorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
