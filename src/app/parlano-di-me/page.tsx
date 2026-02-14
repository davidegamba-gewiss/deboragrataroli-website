import type { Metadata } from 'next';
import { PageLayout } from '@/components/layout/PageLayout';
import { StampaGrid } from '@/components/stampa';
import { getAllArticoliData, getRassegnaStampaPage } from '@/lib/content';
import { generatePageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const pageContent = await getRassegnaStampaPage();
  return generatePageMetadata({
    title: pageContent?.frontmatter.title || 'Parlano di Me',
    description:
      pageContent?.frontmatter.seo_description ||
      'Rassegna stampa e articoli su Debora Grataroli.',
    path: '/parlano-di-me',
    keywords: ['rassegna stampa', 'articoli', 'interviste', 'recensioni', 'media musicali'],
    type: 'article',
  });
}

export default async function ParlanoDiMePage() {
  const [articoli, pageContent] = await Promise.all([
    getAllArticoliData(),
    getRassegnaStampaPage(),
  ]);

  const title = pageContent?.frontmatter.title || 'Parlano di Me';
  const subtitle = pageContent?.frontmatter.hero_subtitle || '';
  const heroImage = pageContent?.frontmatter.hero_image || '/images/hero-stampa.jpg';

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
              {subtitle}
            </p>
          )}
        </header>

        {/* Articles Grid */}
        <StampaGrid articoli={articoli} />
      </section>
    </PageLayout>
  );
}
