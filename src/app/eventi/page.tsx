import type { Metadata } from 'next';
import { PageLayout } from '@/components/layout/PageLayout';
import { EventiFuturi, EventiPassati } from '@/components/eventi';
import { getEventiFuturiData, getEventiPassatiData } from '@/lib/content';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Eventi e Concerti',
  description:
    'Scopri i prossimi concerti e esibizioni di Debora Grataroli. Calendario eventi, date, location e informazioni per assistere ai live.',
  path: '/eventi',
  keywords: ['concerti', 'eventi musicali', 'live', 'tour', 'calendario concerti'],
});

export default async function EventiPage() {
  const [eventiFuturi, eventiPassati] = await Promise.all([
    getEventiFuturiData(),
    getEventiPassatiData(),
  ]);

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
