import Link from 'next/link';
import { ROUTES } from '@/utils/routing';

/**
 * IntroSection Component
 *
 * Introduction section for the homepage with welcome title and description.
 * Renders content from CMS or falls back to default content.
 */

export interface IntroSectionProps {
  /** HTML content from CMS (parsed markdown) */
  htmlContent?: string;
  /** Section title from CMS */
  title?: string;
}

/**
 * Default intro content (placeholder)
 * Used when CMS content is empty or not available
 */
const defaultContent = `
<p>Benvenuto nel mio spazio musicale. Sono Debora Grataroli,
cantautrice e pianista italiana. La mia musica nasce
dall'intreccio tra testi autobiografici e arrangiamenti
per pianoforte, con influenze che spaziano dal cantautorato
italiano alla musica d'autore contemporanea.</p>

<p>Qui trovi i miei brani originali, le date dei prossimi concerti
e i video delle mie esibizioni live. Ogni canzone nasce da un'emozione autentica,
da un momento vissuto o da un sogno che prende forma attraverso le note.</p>
`;

export function IntroSection({ htmlContent, title }: IntroSectionProps) {
  // Use CMS content if available and not empty, otherwise use default
  const content = htmlContent && htmlContent.trim() ? htmlContent : defaultContent;
  const sectionTitle = title && title.trim() ? title : 'Benvenuti nel mio mondo musicale';

  return (
    <section className="py-16 lg:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="font-playfair text-4xl md:text-5xl lg:text-[48px] text-purple-dark mb-6">
          {sectionTitle}
        </h2>

        <div
          className="max-w-[800px] prose-custom [&_p]:text-base [&_p]:md:text-lg [&_p]:text-neutral-dark [&_p]:leading-relaxed [&_p]:mb-8 last:[&_p]:mb-0"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Internal link to biography */}
        <div className="mt-8">
          <Link
            href={ROUTES.BIOGRAFIA}
            className="inline-flex items-center gap-2 text-purple-medium hover:text-purple-dark transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 rounded"
          >
            Leggi la mia biografia
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
      </div>
    </section>
  );
}

export default IntroSection;
