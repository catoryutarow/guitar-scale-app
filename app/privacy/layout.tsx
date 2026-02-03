import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: 'ギタースケールわかる君のプライバシーポリシー。個人情報の取り扱いについてご説明します。',
  openGraph: {
    title: 'プライバシーポリシー | ギタースケールわかる君',
    description: 'ギタースケールわかる君のプライバシーポリシー。個人情報の取り扱いについてご説明します。',
    url: 'https://www.guitar-scale.com/privacy',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.guitar-scale.com/privacy',
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
