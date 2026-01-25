import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Harmonic Minor Scale Guide | Guitar Scale Master',
  description: 'Learn the harmonic minor scale - its structure, characteristic sound, and practical applications from classical to metal.',
};

export default function HarmonicMinorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
