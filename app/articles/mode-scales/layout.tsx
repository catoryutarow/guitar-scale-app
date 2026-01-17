import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mode Scales Complete Guide | Guitar Scale Master',
  description: 'A detailed explanation of the 7 mode scales (Dorian, Phrygian, Lydian, etc.) and how to use them. Step up from intermediate to advanced.',
};

export default function ModeScalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
