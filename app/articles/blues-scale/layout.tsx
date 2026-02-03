import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ブルーススケールでソウルフルなフレーズを弾こう | ギタースケールわかる君',
  description:
    'ブルーススケールの構造とブルーノートの使い方をマスター。感情豊かなギターソロを弾くためのテクニックを解説。',
  keywords: ['ブルーススケール', 'ブルーノート', 'ギターソロ', 'ブルース', 'スケール練習'],
  openGraph: {
    title: 'ブルーススケールでソウルフルなフレーズを弾こう | ギタースケールわかる君',
    description: 'ブルーススケールの構造とブルーノートの使い方を解説。',
    url: 'https://www.guitar-scale.com/articles/blues-scale',
    siteName: 'ギタースケールわかる君',
    locale: 'ja_JP',
    type: 'article',
  },
  alternates: {
    canonical: 'https://www.guitar-scale.com/articles/blues-scale',
  },
};

export default function BluesScaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
