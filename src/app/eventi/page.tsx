import type { Metadata } from 'next';
import { PageLayout } from '@/components/layout/PageLayout';
import { EventiFuturi, EventiPassati } from '@/components/eventi';
import { getEventiFuturi, getEventiPassati } from '@/utils/eventiData';

export const metadata: Metadata = {
  title: 'Eventi - Debora Grataroli',
  description:
    'Scopri i prossimi concerti e esibizioni di Debora Grataroli. Prossimi eventi, date e location.',
  keywords: ['eventi', 'concerti', 'Debora Grataroli', 'esibizioni'],
  openGraph: {
    title: 'Eventi - Debora Grataroli',
    description: 'Prossimi concerti e tour',
    type: 'website',
  },
};

export default function EventiPage() {
  const eventiFuturi = getEventiFuturi();
  const eventiPassati = getEventiPassati();

  return (
    <PageLayout
      hero={{
        imageSrc: '/images/hero-eventi.jpg',
        title: 'Eventi e Concerti',
        subtitle: 'Scopri dove e quando mi esibisco',
        imageAlt: 'Debora Grataroli in concerto',
      }}
    >
      <section className="py-16 lg:py-24">
        {/* Section Header */}
        <header className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-purple-dark mb-4">
            Eventi e Concerti
          </h2>
          <p className="text-neutral-dark/70 text-base md:text-lg max-w-2xl mx-auto">
            Scopri dove e quando mi esibisco
          </p>
        </header>

        {/* Future Events */}
        <EventiFuturi eventi={eventiFuturi} />

        {/* Past Events */}
        <EventiPassati gruppi={eventiPassati} />
      </section>
    </PageLayout>
  );
}
