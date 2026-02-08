import type { Metadata } from 'next';
import { PageLayout } from '@/components/layout/PageLayout';
import { BranoListGrid } from '@/components/brani';
import { getAllBraniData } from '@/lib/content';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'I Miei Brani',
  description:
    'Scopri il catalogo completo dei brani originali di Debora Grataroli. Ascolta musica italiana di qualità, dalle ballad romantiche ai brani più energici.',
  path: '/brani',
  keywords: ['brani originali', 'canzoni italiane', 'musica cantautoriale', 'discografia'],
  type: 'music.album',
});

export default async function BraniPage() {
  const brani = await getAllBraniData();

  return (
    <PageLayout
      hero={{
        imageSrc: '/images/hero-brani.jpg',
        title: 'I Miei Brani',
        subtitle: 'Ascolta la mia musica',
        imageAlt: 'Spartiti musicali',
      }}
    >
      <section className="py-16 lg:py-24">
        {/* Section Header */}
        <header className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-purple-dark mb-4">
            I Miei Brani
          </h2>
          <p className="text-neutral-dark/70 text-base md:text-lg max-w-2xl mx-auto">
            Scopri il catalogo completo dei miei brani originali
          </p>
        </header>

        {/* Brani Grid */}
        <BranoListGrid brani={brani} />
      </section>
    </PageLayout>
  );
}
