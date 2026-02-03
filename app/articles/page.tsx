import type { Metadata } from 'next';
import ArticlesPageClient from './ArticlesPageClient';

export const metadata: Metadata = {
  title: 'ギタースケール記事一覧 | ギタースケールわかる君',
  description:
    'ギタースケールの基礎から応用まで学べる記事一覧。ペンタトニック、ブルーススケール、モードスケール、ハーモニックマイナーなど、様々なスケールの使い方を解説します。',
  keywords: [
    'ギタースケール',
    'ペンタトニック',
    'ブルーススケール',
    'モードスケール',
    'ハーモニックマイナー',
    'ギター練習',
    'スケール練習',
  ],
  openGraph: {
    title: 'ギタースケール記事一覧 | ギタースケールわかる君',
    description:
      'ギタースケールの基礎から応用まで学べる記事一覧。様々なスケールの使い方を解説します。',
    url: 'https://www.guitar-scale.com/articles',
    siteName: 'ギタースケールわかる君',
    locale: 'ja_JP',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.guitar-scale.com/articles',
  },
};

export default function ArticlesPage() {
  return <ArticlesPageClient />;
}
