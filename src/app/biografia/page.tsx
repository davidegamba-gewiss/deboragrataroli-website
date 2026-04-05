import type { Metadata } from 'next';
import { HeroSection } from '@/components/common/HeroSection';
import { BiografiaContent } from '@/components/biografia';
import { generatePageMetadata } from '@/lib/seo';
import { getBiografiaPage } from '@/lib/content';

export async function generateMetadata(): Promise<Metadata> {
  return generatePageMetadata({
    title: 'Biografia',
    description:
      'Scopri la storia di Debora Grataroli, cantautrice e pianista italiana. Dal suo percorso musicale alle collaborazioni artistiche.',
    path: '/biografia',
    keywords: ['biografia', 'storia', 'percorso artistico', 'cantautrice italiana', 'pianista'],
    image: {
      url: '/og/biografia.jpg',
      alt: 'Debora Grataroli – Biografia',
    },
    type: 'profile',
  });
}

export default async function BiografiaPage() {
  // Load content from CMS
  const pageContent = await getBiografiaPage();

  // Use CMS content or defaults
  const title = pageContent?.frontmatter.title || 'BIOGRAFIA';
  const heroSubtitle = pageContent?.frontmatter.hero_subtitle || '';
  const heroImage = pageContent?.frontmatter.hero_image || '/images/hero-biografia.jpg';
  const htmlContent = pageContent?.htmlContent || '';
  const contentTitle = pageContent?.frontmatter.content_title && pageContent.frontmatter.content_title.trim()
    ? pageContent.frontmatter.content_title
    : 'La mia storia';

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
        title={contentTitle}
        showTitle
        htmlContent={htmlContent}
      />
    </>
  );
}
