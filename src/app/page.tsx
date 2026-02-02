import type { Metadata } from 'next';
import { HeroSection } from '@/components/common/HeroSection';
import { IntroSection, FeaturedBrani, FollowSection } from '@/components/home';

export const metadata: Metadata = {
  title: 'Debora Grataroli - Cantautrice e Pianista',
  description:
    'Debora Grataroli, cantautrice e pianista italiana. Scopri i miei brani originali, eventi live e la mia storia musicale.',
  keywords: ['Debora Grataroli', 'cantautrice', 'pianista', 'musica italiana'],
  openGraph: {
    title: 'Debora Grataroli - Cantautrice e Pianista',
    description: 'Scopri i miei brani, concerti e la mia storia musicale',
    type: 'website',
  },
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
