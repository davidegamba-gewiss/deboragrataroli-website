import type { Metadata } from 'next';
import { HeroSection } from '@/components/common/HeroSection';
import { BiografiaContent, DecorativeImage } from '@/components/biografia';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Biografia',
  description:
    'Scopri la storia di Debora Grataroli, cantautrice e pianista italiana. Il percorso artistico, le influenze musicali e la passione per la musica che ha plasmato la sua carriera.',
  path: '/biografia',
  keywords: ['biografia', 'storia', 'percorso artistico', 'cantautrice italiana', 'pianista'],
  type: 'profile',
});

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
