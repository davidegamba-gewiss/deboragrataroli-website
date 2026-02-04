/**
 * BiografiaContent Component
 *
 * Rich text content section for the biography page.
 * Renders content from CMS or falls back to default content.
 */

export interface BiografiaContentProps {
  /** Optional section title */
  title?: string;
  /** Show/hide the section title */
  showTitle?: boolean;
  /** HTML content from CMS (parsed markdown) */
  htmlContent?: string;
}

/**
 * Default biography content (placeholder)
 * Used when CMS content is empty or not available
 */
const defaultContent = `
<p>Debora Grataroli è una cantautrice e pianista italiana che ha fatto della musica
la sua voce per raccontare emozioni, sogni e storie di vita quotidiana.
La sua passione per la musica nasce fin da piccola, quando a soli sei anni
inizia a studiare pianoforte classico.</p>

<h3>Il mio percorso musicale</h3>
<p>Nel corso degli anni ha sviluppato uno stile musicale unico che fonde
elementi di musica classica con influenze pop contemporanee, creando un sound
personale e riconoscibile. Le sue composizioni spaziano da ballate intimate
a brani più ritmati, sempre caratterizzati da testi profondi e melodie avvolgenti.</p>

<h3>Le mie ispirazioni</h3>
<p>Le sue principali influenze musicali includono artisti come Ludovico Einaudi,
Elisa e Fiona Apple, da cui ha tratto ispirazione per creare un linguaggio
musicale che parla direttamente al cuore degli ascoltatori.</p>

<h3>Oggi</h3>
<p>Attualmente è impegnata nella composizione di nuovi brani e nella performance
live in vari festival e teatri italiani. Il suo obiettivo è quello di portare
la sua musica a un pubblico sempre più ampio, mantenendo però l'autenticità
e l'intimità che caratterizzano ogni sua creazione.</p>

<blockquote>
<p>"La musica per me è un rifugio, un modo per esprimere quello che le parole
da sole non riescono a dire. Ogni canzone che scrivo è un pezzo della mia anima
che condivido con chi mi ascolta."</p>
</blockquote>
`;

export function BiografiaContent({
  title = 'La mia storia',
  showTitle = true,
  htmlContent,
}: BiografiaContentProps) {
  // Use CMS content if available and not empty, otherwise use default
  const content = htmlContent && htmlContent.trim() ? htmlContent : defaultContent;

  return (
    <section className="py-16 lg:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-[900px] mx-auto">
        {/* Optional Section Title */}
        {showTitle && (
          <h2 className="font-playfair text-3xl md:text-4xl text-purple-dark mb-8">
            {title}
          </h2>
        )}

        {/* Rich Text Content from CMS */}
        <div
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  );
}

export default BiografiaContent;
