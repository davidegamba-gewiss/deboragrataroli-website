import type { Metadata } from 'next';
import { PageLayout } from '@/components/layout/PageLayout';
import { StampaGrid } from '@/components/stampa';
import { getArticoliStampa } from '@/utils/stampaData';

export const metadata: Metadata = {
  title: 'Rassegna Stampa - Debora Grataroli',
  description:
    'Leggi gli articoli e le menzioni stampa di Debora Grataroli. Scopri cosa dicono di lei i media italiani.',
  keywords: ['rassegna stampa', 'articoli', 'media', 'Debora Grataroli'],
  openGraph: {
    title: 'Rassegna Stampa - Debora Grataroli',
    description: 'Articoli e menzioni stampa',
    type: 'website',
  },
};

export default function ParlanoDiMePage() {
  const articoli = getArticoliStampa();

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
