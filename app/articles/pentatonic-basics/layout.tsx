import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pentatonic Scale Basics | Guitar Scale Master',
  description: 'The pentatonic scale is one of the most important scales for guitarists. Learn why you should learn it first and how to practice it.',
};

export default function PentatonicBasicsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
