import type { Metadata } from 'next';
import { HeroSection } from '@/components/common/HeroSection';
import { IntroSection, FeaturedBrani, FollowSection } from '@/components/home';
import { generatePageMetadata, SITE_CONFIG } from '@/lib/seo';

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: 'Debora Grataroli - Cantautrice e Pianista',
    description:
      'Debora Grataroli, cantautrice e pianista italiana. Scopri i brani originali, eventi live, esibizioni e la storia musicale di una delle voci emergenti della musica italiana.',
    path: '/',
    keywords: ['cantautrice italiana', 'pianista', 'musica originale', 'concerti', 'artista emergente'],
  }),
  // Override title to not use template for homepage
  title: SITE_CONFIG.title,
};

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        imageSrc="/images/hero-home.jpg"
        title="Debora Grataroli"
        subtitle="Cantautrice e Pianista"
        imageAlt="Debora Grataroli in concerto"
      />

      {/* Introduction Section */}
      <IntroSection />

      {/* Featured Brani Section */}
      <FeaturedBrani />

      {/* Follow/Social Section */}
      <FollowSection />
    </>
  );
}
