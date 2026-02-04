import type { Metadata } from 'next';
import { HeroSection } from '@/components/common/HeroSection';
import { BiografiaContent, DecorativeImage } from '@/components/biografia';
import { generatePageMetadata } from '@/lib/seo';
import { getBiografiaPage } from '@/lib/content';

export const metadata: Metadata = generatePageMetadata({
  title: 'Biografia',
  description:
    'Scopri la storia di Debora Grataroli, cantautrice e pianista italiana. Il percorso artistico, le influenze musicali e la passione per la musica che ha plasmato la sua carriera.',
  path: '/biografia',
  keywords: ['biografia', 'storia', 'percorso artistico', 'cantautrice italiana', 'pianista'],
  type: 'profile',
});

export default async function BiografiaPage() {
  // Load content from CMS
  const pageContent = await getBiografiaPage();

  // Use CMS content or defaults
  const title = pageContent?.frontmatter.title || 'BIOGRAFIA';
  const heroSubtitle = pageContent?.frontmatter.hero_subtitle || '';
  const heroImage = pageContent?.frontmatter.hero_image || '/images/hero-biografia.jpg';
  const htmlContent = pageContent?.htmlContent || '';

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        imageSrc={heroImage}
        title={title}
        subtitle={heroSubtitle}
        imageAlt="Debora Grataroli"
      />

      {/* Biography Content */}
      <BiografiaContent
        title="La mia storia"
        showTitle
        htmlContent={htmlContent}
      />

      {/* Decorative Image */}
      <DecorativeImage
        src="/images/biografia-decorative.jpg"
        alt="Debora Grataroli al pianoforte"
      />
    </>
  );
}
