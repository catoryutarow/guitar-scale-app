import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '利用規約',
  description: 'ギタースケールわかる君の利用規約。サービスのご利用条件についてご確認ください。',
  openGraph: {
    title: '利用規約 | ギタースケールわかる君',
    description: 'ギタースケールわかる君の利用規約。サービスのご利用条件についてご確認ください。',
    url: 'https://guitar-scale-wakarun.com/terms',
    type: 'website',
  },
  alternates: {
    canonical: 'https://guitar-scale-wakarun.com/terms',
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
