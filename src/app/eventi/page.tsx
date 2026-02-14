import type { Metadata } from 'next';
import { PageLayout } from '@/components/layout/PageLayout';
import { EventiFuturi, EventiPassati } from '@/components/eventi';
import { getEventiFuturiData, getEventiPassatiData, getConcertiPage } from '@/lib/content';
import { generatePageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const pageContent = await getConcertiPage();
  return generatePageMetadata({
    title: pageContent?.frontmatter.title || 'Eventi e Concerti',
    description:
      pageContent?.frontmatter.seo_description ||
      'Scopri i prossimi concerti e esibizioni di Debora Grataroli.',
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
        imageAlt: title,
      }}
    >
      <section className="py-16 lg:py-24">
        {/* Section Header */}
        <header className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-purple-dark mb-4">
            {title}
          </h2>
          {pageContent?.htmlContent && (
            <div
              className="text-neutral-dark/70 text-base md:text-lg max-w-2xl mx-auto prose prose-purple"
              dangerouslySetInnerHTML={{ __html: pageContent.htmlContent }}
            />
          )}
          {!pageContent?.htmlContent && (
            <p className="text-neutral-dark/70 text-base md:text-lg max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </header>

        {/* Future Events */}
        <EventiFuturi eventi={eventiFuturi} title={upcomingEventsTitle} />

        {/* Past Events */}
        <EventiPassati gruppi={eventiPassati} title={pastEventsTitle} />
      </section>
    </PageLayout>
  );
}
