import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description: 'ギタースケールわかる君へのお問い合わせフォーム。ご質問、ご要望、不具合報告などお気軽にご連絡ください。',
  openGraph: {
    title: 'お問い合わせ | ギタースケールわかる君',
    description: 'ギタースケールわかる君へのお問い合わせフォーム。ご質問、ご要望、不具合報告などお気軽にご連絡ください。',
    url: 'https://guitar-scale-wakarun.com/contact',
    type: 'website',
  },
  alternates: {
    canonical: 'https://guitar-scale-wakarun.com/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
