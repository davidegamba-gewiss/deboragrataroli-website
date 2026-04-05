import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/PageLayout';
import { StampaGrid } from '@/components/stampa';
import { getAllArticoliData, getRassegnaStampaPage } from '@/lib/content';
import { generatePageMetadata } from '@/lib/seo';
import { ROUTES } from '@/utils/routing';

export async function generateMetadata(): Promise<Metadata> {
  const pageContent = await getRassegnaStampaPage();
  return generatePageMetadata({
    title: pageContent?.frontmatter.title || 'Parlano di Me – Rassegna Stampa',
    description:
      pageContent?.frontmatter.seo_description ||
      'Articoli e recensioni su Debora Grataroli. Rassegna stampa e menzioni sui principali media musicali italiani.',
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
        imageAlt: `Debora Grataroli – ${title}`,
      }}
    >
      <section className="py-16 lg:py-24" aria-labelledby="stampa-intro">
        {/* Section Intro - no redundant heading since H1 is in hero */}
        {(pageContent?.htmlContent || subtitle) && (
          <div className="mb-12 text-center">
            {pageContent?.htmlContent ? (
              <div
                id="stampa-intro"
                className="mx-auto max-w-2xl text-base text-neutral-dark/70 md:text-lg prose prose-purple"
                dangerouslySetInnerHTML={{ __html: pageContent.htmlContent }}
              />
            ) : (
              <p id="stampa-intro" className="mx-auto max-w-2xl text-base text-neutral-dark/70 md:text-lg">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Articles Grid */}
        <StampaGrid articoli={articoli} />

        {/* Internal Link to Contatti */}
        <div className="mt-16 pt-8 border-t border-neutral-light text-center">
          <p className="text-neutral-dark/70 mb-4">
            Sei interessato a un&apos;intervista o una collaborazione?
          </p>
          <Link
            href={ROUTES.CONTATTI}
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-medium text-white font-medium rounded-lg transition-all duration-300 hover:bg-purple-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-medium focus:ring-offset-2"
          >
            Contattami per interviste e collaborazioni
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>
    </PageLayout>
  );
}
