import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'お問い合わせ | ギタースケールわかる君',
  description: 'ギタースケールわかる君へのお問い合わせフォーム。ご質問、ご要望、不具合報告などお気軽にご連絡ください。',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
