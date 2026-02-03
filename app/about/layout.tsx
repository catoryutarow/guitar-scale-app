import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'サービス紹介',
  description: 'ギタースケールわかる君は、ギタースケールを視覚的に学べる無料ウェブアプリです。初心者からプロまで使える機能をご紹介します。',
  openGraph: {
    title: 'サービス紹介 | ギタースケールわかる君',
    description: 'ギタースケールわかる君は、ギタースケールを視覚的に学べる無料ウェブアプリです。初心者からプロまで使える機能をご紹介します。',
    url: 'https://www.guitar-scale.com/about',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.guitar-scale.com/about',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
