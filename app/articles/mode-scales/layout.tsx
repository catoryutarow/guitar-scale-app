import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'モードスケール完全ガイド | ギタースケールわかる君',
  description:
    '7つのモードスケール（ドリアン、フリジアン、リディアン等）を詳しく解説。中級から上級へステップアップするための理論と実践。',
  keywords: ['モードスケール', 'ドリアン', 'フリジアン', 'リディアン', 'ミクソリディアン', 'ロクリアン', 'ギター'],
  openGraph: {
    title: 'モードスケール完全ガイド | ギタースケールわかる君',
    description: '7つのモードスケールの理論と実践を詳しく解説。',
    url: 'https://www.guitar-scale.com/articles/mode-scales',
    siteName: 'ギタースケールわかる君',
    locale: 'ja_JP',
    type: 'article',
  },
  alternates: {
    canonical: 'https://www.guitar-scale.com/articles/mode-scales',
  },
};

export default function ModeScalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
