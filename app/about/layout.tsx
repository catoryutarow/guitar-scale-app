import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About | Guitar Scale Master',
  description: 'Guitar Scale Master is a free web app for visually learning guitar scales. Discover features for beginners to professionals.',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
