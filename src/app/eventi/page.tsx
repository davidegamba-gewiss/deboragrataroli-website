import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/PageLayout';
import { EventiFuturi, EventiPassati } from '@/components/eventi';
import { getEventiFuturiData, getEventiPassatiData, getConcertiPage } from '@/lib/content';
import { generatePageMetadata } from '@/lib/seo';
import { ROUTES } from '@/utils/routing';

export async function generateMetadata(): Promise<Metadata> {
  const pageContent = await getConcertiPage();
  return generatePageMetadata({
    title: pageContent?.frontmatter.title || 'Eventi e Concerti',
    description:
      pageContent?.frontmatter.seo_description ||
      'Prossimi concerti ed eventi live di Debora Grataroli. Date, luoghi e info per assistere alle esibizioni.',
    path: '/eventi',
    keywords: ['concerti', 'eventi musicali', 'live', 'tour', 'calendario concerti'],
  });
}

export default async function EventiPage() {
  const [eventiFuturi, eventiPassati, pageContent] = await Promise.all([
    getEventiFuturiData(),
    getEventiPassatiData(),
    getConcertiPage(),
  ]);

  const title = pageContent?.frontmatter.title || 'Eventi e Concerti';
  const subtitle = pageContent?.frontmatter.hero_subtitle || '';
  const heroImage = pageContent?.frontmatter.hero_image || '/images/hero-eventi.jpg';
  const upcomingEventsTitle = pageContent?.frontmatter.upcoming_events_title || '';
  const pastEventsTitle = pageContent?.frontmatter.past_events_title || '';

  return (
    <PageLayout
      hero={{
        imageSrc: heroImage,
        title: title,
        subtitle: subtitle,
        imageAlt: `Debora Grataroli live – ${title}`,
      }}
    >
      <section className="py-16 lg:py-24" aria-labelledby="eventi-intro">
        {/* Section Intro - no redundant heading since H1 is in hero */}
        {(pageContent?.htmlContent || subtitle) && (
          <div className="text-center mb-12">
            {pageContent?.htmlContent ? (
              <div
                id="eventi-intro"
                className="text-neutral-dark/70 text-base md:text-lg max-w-2xl mx-auto prose prose-purple"
                dangerouslySetInnerHTML={{ __html: pageContent.htmlContent }}
              />
            ) : (
              <p id="eventi-intro" className="text-neutral-dark/70 text-base md:text-lg max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Future Events - H2: Prossimi Eventi */}
        <EventiFuturi eventi={eventiFuturi} title={upcomingEventsTitle} />

        {/* Past Events - H2: Eventi Passati */}
        <EventiPassati gruppi={eventiPassati} title={pastEventsTitle} />

        {/* Internal Link to Esibizioni */}
        <div className="mt-16 pt-8 border-t border-neutral-light text-center">
          <p className="text-neutral-dark/70 mb-4">
            Vuoi vedere i video delle mie performance?
          </p>
          <Link
            href={ROUTES.ESIBIZIONI}
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-medium text-white font-medium rounded-lg transition-all duration-300 hover:bg-purple-dark hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-medium focus:ring-offset-2"
          >
            Guarda le mie esibizioni live
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
