import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Guitar Scale Master',
  description: 'Privacy policy for Guitar Scale Master. Information about how we handle personal data.',
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
