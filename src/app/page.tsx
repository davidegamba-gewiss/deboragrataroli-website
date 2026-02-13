import type { Metadata } from 'next';
import { HeroSection } from '@/components/common/HeroSection';
import { IntroSection, FeaturedBrani, FollowSection } from '@/components/home';
import { generatePageMetadata, SITE_CONFIG } from '@/lib/seo';
import { getHomePage } from '@/lib/content';

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

export default async function HomePage() {
  // Load content from CMS
  const pageContent = await getHomePage();

  // Use CMS content or defaults
  const heroSubtitle = pageContent?.frontmatter.hero_subtitle || 'Cantautrice e Pianista';
  const heroImage = pageContent?.frontmatter.hero_image || '/images/hero-home.jpg';
  const htmlContent = pageContent?.htmlContent || '';
  const introSectionTitle = pageContent?.frontmatter.intro_section_title || '';
  const featuredBraniTitle = pageContent?.frontmatter.featured_brani_title || '';
  const followSectionTitle = pageContent?.frontmatter.follow_section_title || '';
  const followSectionSubtitle = pageContent?.frontmatter.follow_section_subtitle || '';

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        imageSrc={heroImage}
        title="Debora Grataroli"
        subtitle={heroSubtitle}
        imageAlt="Debora Grataroli in concerto"
      />

      {/* Introduction Section */}
      <IntroSection htmlContent={htmlContent} title={introSectionTitle} />

      {/* Featured Brani Section */}
      <FeaturedBrani title={featuredBraniTitle} />

      {/* Follow/Social Section */}
      <FollowSection title={followSectionTitle} subtitle={followSectionSubtitle} />
    </>
  );
}
