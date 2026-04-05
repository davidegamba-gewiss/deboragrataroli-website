import type { Metadata } from 'next';
import Link from 'next/link';
import { HeroSection } from '@/components/common/HeroSection';
import { BiografiaContent } from '@/components/biografia';
import { generatePageMetadata } from '@/lib/seo';
import { getBiografiaPage } from '@/lib/content';
import { ROUTES } from '@/utils/routing';

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
  const title = pageContent?.frontmatter.title || 'Biografia di Debora Grataroli';
  const heroSubtitle = pageContent?.frontmatter.hero_subtitle || 'Cantautrice e Pianista';
  const heroImage = pageContent?.frontmatter.hero_image || '/images/hero-biografia.jpg';
  const htmlContent = pageContent?.htmlContent || '';
  const contentTitle = pageContent?.frontmatter.content_title && pageContent.frontmatter.content_title.trim()
    ? pageContent.frontmatter.content_title
    : 'La mia storia';

  return (
    <>
      {/* Hero Section - H1: Biografia di Debora Grataroli */}
      <HeroSection
        imageSrc={heroImage}
        title={title}
        subtitle={heroSubtitle}
        imageAlt="Debora Grataroli – ritratto ufficiale"
      />

      {/* Biography Content - H2: La mia storia (and subsections) */}
      <BiografiaContent
        title={contentTitle}
        showTitle
        htmlContent={htmlContent}
      />

      {/* Internal Links Section - "Scopri la musica" */}
      <section className="py-16 px-4 md:px-8 bg-neutral-light/30">
        <div className="max-w-[900px] mx-auto text-center">
          <h2 className="font-playfair text-3xl md:text-4xl text-purple-dark mb-8">
            Scopri la mia musica
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={ROUTES.BRANI}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-purple-medium text-white font-medium rounded-lg transition-all duration-300 hover:bg-purple-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-medium focus:ring-offset-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"
                />
              </svg>
              Ascolta i miei brani originali
            </Link>
            <Link
              href={ROUTES.ESIBIZIONI}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-purple-medium text-purple-medium font-medium rounded-lg transition-all duration-300 hover:bg-purple-medium hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-medium focus:ring-offset-2"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Guarda le mie esibizioni live
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
