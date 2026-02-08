import type { Metadata } from 'next';
import { PageLayout } from '@/components/layout/PageLayout';
import { StampaGrid } from '@/components/stampa';
import { getAllArticoliData } from '@/lib/content';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Parlano di Me',
  description:
    'Rassegna stampa e articoli su Debora Grataroli. Scopri cosa dicono i media italiani, interviste, recensioni e menzioni dalla stampa musicale.',
  path: '/parlano-di-me',
  keywords: ['rassegna stampa', 'articoli', 'interviste', 'recensioni', 'media musicali'],
  type: 'article',
});

export default async function ParlanoDiMePage() {
  const articoli = await getAllArticoliData();

  return (
    <PageLayout
      hero={{
        imageSrc: '/images/hero-stampa.jpg',
        title: 'Parlano di Me',
        subtitle: 'Rassegna stampa e articoli pubblicati',
        imageAlt: 'Rassegna stampa Debora Grataroli',
      }}
    >
      <section className="py-16 lg:py-24">
        {/* Section Header */}
        <header className="mb-12 text-center">
          <h2 className="mb-4 font-playfair text-4xl font-semibold text-purple-dark md:text-5xl">
            Parlano di Me
          </h2>
          <p className="mx-auto max-w-2xl text-base text-neutral-dark/70 md:text-lg">
            Rassegna stampa e articoli pubblicati
          </p>
        </header>

        {/* Articles Grid */}
        <StampaGrid articoli={articoli} />
      </section>
    </PageLayout>
  );
}
