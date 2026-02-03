import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '運営会社',
  description: 'ギタースケールわかる君の運営会社情報。モテコロ株式会社が運営しています。',
  openGraph: {
    title: '運営会社 | ギタースケールわかる君',
    description: 'ギタースケールわかる君の運営会社情報。モテコロ株式会社が運営しています。',
    url: 'https://www.guitar-scale.com/company',
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.guitar-scale.com/company',
  },
};

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
