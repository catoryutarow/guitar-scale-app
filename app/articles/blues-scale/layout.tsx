import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Play Soulful Phrases with the Blues Scale | Guitar Scale Master',
  description: 'Master the structure of the blues scale and how to use blue notes. Techniques for playing emotional guitar solos.',
};

export default function BluesScaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
