import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Company Information | Guitar Scale Master',
  description: 'Company information for Guitar Scale Master. Operated by Motechoro Co., Ltd.',
};

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
