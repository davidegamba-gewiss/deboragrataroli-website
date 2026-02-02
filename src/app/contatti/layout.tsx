import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contatti - Debora Grataroli',
  description:
    'Contatta Debora Grataroli per collaborazioni, eventi e informazioni.',
};

export default function ContattiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
