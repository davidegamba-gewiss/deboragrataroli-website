import type { Metadata } from 'next';
import { HeroSection } from '@/components/common/HeroSection';
import { BiografiaContent, DecorativeImage } from '@/components/biografia';

export const metadata: Metadata = {
  title: 'Biografia - Debora Grataroli',
  description:
    'Leggi la biografia di Debora Grataroli, cantautrice e pianista italiana. Scopri la sua storia musicale e il suo percorso artistico.',
  keywords: ['Debora Grataroli', 'biografia', 'artista', 'musicista', 'cantautrice'],
  openGraph: {
    title: 'Biografia - Debora Grataroli',
    description: 'La storia musicale di Debora Grataroli',
    type: 'article',
  },
};

export default function BiografiaPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        imageSrc="/images/hero-biografia.jpg"
        title="BIOGRAFIA"
        imageAlt="Debora Grataroli"
      />

      {/* Biography Content */}
      <BiografiaContent title="La mia storia" showTitle />

      {/* Decorative Image */}
      <DecorativeImage
        src="/images/biografia-decorative.jpg"
        alt="Debora Grataroli al pianoforte"
      />
    </>
  );
}
