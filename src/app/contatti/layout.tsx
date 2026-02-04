import type { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Contatti',
  description:
    'Contatta Debora Grataroli per collaborazioni, eventi musicali e informazioni. Compila il form o scrivi direttamente via email.',
  path: '/contatti',
  keywords: ['contatti', 'collaborazioni', 'eventi', 'booking', 'email'],
});

export default function ContattiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
