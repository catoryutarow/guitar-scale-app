import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Scale Practice Guide for Beginners | Guitar Scale Master',
  description: 'Efficient scale practice methods for guitar beginners. Step-by-step guide to memorize scales effectively.',
};

export default function ScalePracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
