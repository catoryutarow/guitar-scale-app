import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ペンタトニックスケールの基礎 | ギタースケールわかる君',
  description:
    'ペンタトニックスケールはギタリストにとって最も重要なスケールです。メジャーペンタトニック、マイナーペンタトニックの構成音と練習方法を詳しく解説。',
  keywords: ['ペンタトニックスケール', 'メジャーペンタトニック', 'マイナーペンタトニック', 'ギター', 'スケール練習'],
  openGraph: {
    title: 'ペンタトニックスケールの基礎 | ギタースケールわかる君',
    description: 'ペンタトニックスケールの構成音と練習方法を詳しく解説。',
    url: 'https://www.guitar-scale.com/articles/pentatonic-basics',
    siteName: 'ギタースケールわかる君',
    locale: 'ja_JP',
    type: 'article',
  },
  alternates: {
    canonical: 'https://www.guitar-scale.com/articles/pentatonic-basics',
  },
};

export default function PentatonicBasicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
