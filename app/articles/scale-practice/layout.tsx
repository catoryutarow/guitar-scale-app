import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '初心者のためのスケール練習ガイド | ギタースケールわかる君',
  description:
    'ギター初心者向けの効率的なスケール練習法。スケールを効果的に覚えるためのステップバイステップガイド。',
  keywords: ['スケール練習', 'ギター初心者', '練習方法', 'スケール覚え方', 'ギター練習'],
  openGraph: {
    title: '初心者のためのスケール練習ガイド | ギタースケールわかる君',
    description: 'ギター初心者向けの効率的なスケール練習法を解説。',
    url: 'https://www.guitar-scale.com/articles/scale-practice',
    siteName: 'ギタースケールわかる君',
    locale: 'ja_JP',
    type: 'article',
  },
  alternates: {
    canonical: 'https://www.guitar-scale.com/articles/scale-practice',
  },
};

export default function ScalePracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
