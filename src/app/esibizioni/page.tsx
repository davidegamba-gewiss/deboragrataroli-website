import type { Metadata } from 'next';
import { PageLayout } from '@/components/layout/PageLayout';
import { VideoGallery } from '@/components/esibizioni';
import { getAllEsibizioniData, getEsibizioniPage } from '@/lib/content';
import { generatePageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const pageContent = await getEsibizioniPage();
  return generatePageMetadata({
    title: pageContent?.frontmatter.title || 'Esibizioni Live',
    description:
      pageContent?.frontmatter.seo_description ||
      'Guarda le esibizioni live, performance studio e cover di Debora Grataroli.',
    path: '/esibizioni',
    keywords: ['esibizioni live', 'video concerti', 'performance', 'youtube', 'cover musicali'],
  });
}

export default async function EsibizioniPage() {
  const [esibizioni, pageContent] = await Promise.all([
    getAllEsibizioniData(),
    getEsibizioniPage(),
  ]);

  const title = pageContent?.frontmatter.title || 'Esibizioni Live';
  const subtitle = pageContent?.frontmatter.hero_subtitle || 'Guarda le mie performance live';
  const heroImage = pageContent?.frontmatter.hero_image || '/images/hero-esibizioni.jpg';

  return (
    <PageLayout
      hero={{
        imageSrc: heroImage,
        title: title,
        subtitle: subtitle,
        imageAlt: title,
      }}
    >
      <section className="py-16 lg:py-24">
        {/* Section Header */}
        <header className="mb-12 text-center">
          <h2 className="mb-4 font-playfair text-4xl font-semibold text-purple-dark md:text-5xl">
            {title}
          </h2>
          {pageContent?.htmlContent && (
            <div
              className="mx-auto max-w-2xl text-base text-neutral-dark/70 md:text-lg prose prose-purple"
              dangerouslySetInnerHTML={{ __html: pageContent.htmlContent }}
            />
          )}
          {!pageContent?.htmlContent && (
            <p className="mx-auto max-w-2xl text-base text-neutral-dark/70 md:text-lg">
              Guarda le mie performance live, video studio e cover
            </p>
          )}
        </header>

        {/* Video Gallery with Filters */}
        <VideoGallery esibizioni={esibizioni} />
      </section>
    </PageLayout>
  );
}
