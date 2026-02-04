/**
 * IntroSection Component
 *
 * Introduction section for the homepage with welcome title and description.
 * Renders content from CMS or falls back to default content.
 */

export interface IntroSectionProps {
  /** HTML content from CMS (parsed markdown) */
  htmlContent?: string;
}

/**
 * Default intro content (placeholder)
 * Used when CMS content is empty or not available
 */
const defaultContent = `
<p>Scopri i miei brani originali, ascolta le mie storie musicali e seguimi
nei miei concerti e performance live. La musica è il mio modo di raccontare
emozioni, sogni e momenti di vita che spero possano toccare anche il tuo cuore.</p>

<p>Ogni canzone nasce da un'emozione autentica, da un momento vissuto
o da un sogno che prende forma attraverso le note del pianoforte e le parole
che sgorgano dal cuore. Ti invito a esplorare il mio repertorio e a
lasciarti trasportare dalla musica.</p>
`;

export function IntroSection({ htmlContent }: IntroSectionProps) {
  // Use CMS content if available and not empty, otherwise use default
  const content = htmlContent && htmlContent.trim() ? htmlContent : defaultContent;

  return (
    <section className="py-16 lg:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="font-playfair text-4xl md:text-5xl lg:text-[48px] text-purple-dark mb-6">
          Benvenuti nel mio mondo musicale
        </h2>

        <div
          className="max-w-[800px] prose-custom [&_p]:text-base [&_p]:md:text-lg [&_p]:text-neutral-dark [&_p]:leading-relaxed [&_p]:mb-8 last:[&_p]:mb-0"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
}

export default IntroSection;
