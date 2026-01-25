import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Guitar Scale Master',
  description: 'Terms of Service for Guitar Scale Master. Please read the terms and conditions of use.',
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
