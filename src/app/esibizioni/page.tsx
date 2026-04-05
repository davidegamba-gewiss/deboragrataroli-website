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
      'Video delle esibizioni live di Debora Grataroli. Concerti, sessioni studio e cover in esclusiva.',
    path: '/esibizioni',
    keywords: ['esibizioni live', 'video concerti', 'performance', 'youtube', 'cover musicali'],
  });
}

export default async function EsibizioniPage() {
  const [esibizioni, pageContent] = await Promise.all([
    getAllEsibizioniData(),
    getEsibizioniPage(),
  ]);

  const title = pageContent?.frontmatter.title || 'Esibizioni';
  const subtitle = pageContent?.frontmatter.hero_subtitle || '';
  const heroImage = pageContent?.frontmatter.hero_image || '/images/hero-esibizioni.jpg';

  return (
    <PageLayout
      hero={{
        imageSrc: heroImage,
        title: title,
        subtitle: subtitle,
        imageAlt: `Debora Grataroli – ${title}`,
      }}
    >
      <section className="py-16 lg:py-24" aria-labelledby="esibizioni-intro">
        {/* Section Intro - no redundant heading since H1 is in hero */}
        <div className="mb-12 text-center">
          {pageContent?.htmlContent ? (
            <div
              id="esibizioni-intro"
              className="mx-auto max-w-2xl text-base text-neutral-dark/70 md:text-lg prose prose-purple"
              dangerouslySetInnerHTML={{ __html: pageContent.htmlContent }}
            />
          ) : (
            <p id="esibizioni-intro" className="mx-auto max-w-2xl text-base text-neutral-dark/70 md:text-lg">
              Guarda le mie performance live, video studio e cover
            </p>
          )}
        </div>

        {/* Video Gallery with Filters */}
        <VideoGallery esibizioni={esibizioni} />
      </section>
    </PageLayout>
  );
}
