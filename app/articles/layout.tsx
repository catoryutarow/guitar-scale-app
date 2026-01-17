import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Articles | Guitar Scale Master',
  description: 'Column articles about guitar scales from basics to advanced. Useful information for all guitarists.',
};

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
