import type { Metadata } from 'next';
import { PageLayout } from '@/components/layout/PageLayout';
import { VideoGallery } from '@/components/esibizioni';

export const metadata: Metadata = {
  title: 'Esibizioni - Debora Grataroli',
  description:
    'Guarda le esibizioni live, performance studio e cover di Debora Grataroli. Video YouTube organizzati per anno e categoria.',
  keywords: ['esibizioni', 'video', 'live', 'Debora Grataroli'],
  openGraph: {
    title: 'Esibizioni - Debora Grataroli',
    description: 'Guarda le mie esibizioni live',
    type: 'website',
  },
};

export default function EsibizioniPage() {
  return (
    <PageLayout
      hero={{
        imageSrc: '/images/hero-esibizioni.jpg',
        title: 'Esibizioni Live',
        subtitle: 'Guarda le mie performance live',
        imageAlt: "Debora Grataroli durante un'esibizione",
      }}
    >
      <section className="py-16 lg:py-24">
        {/* Section Header */}
        <header className="mb-12 text-center">
          <h2 className="mb-4 font-playfair text-4xl font-semibold text-purple-dark md:text-5xl">
            Esibizioni Live
          </h2>
          <p className="mx-auto max-w-2xl text-base text-neutral-dark/70 md:text-lg">
            Guarda le mie performance live, video studio e cover
          </p>
        </header>

        {/* Video Gallery with Filters */}
        <VideoGallery />
      </section>
    </PageLayout>
  );
}
