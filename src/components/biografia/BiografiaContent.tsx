/**
 * BiografiaContent Component
 *
 * Rich text content section for the biography page.
 * Uses custom prose styling for elegant typography.
 */

export interface BiografiaContentProps {
  /** Optional section title */
  title?: string;
  /** Show/hide the section title */
  showTitle?: boolean;
}

/**
 * Default biography content (placeholder)
 * Will be replaced with CMS content in Phase 4
 */
const defaultContent = {
  intro: `Debora Grataroli è una cantautrice e pianista italiana che ha fatto della musica
    la sua voce per raccontare emozioni, sogni e storie di vita quotidiana.
    La sua passione per la musica nasce fin da piccola, quando a soli sei anni
    inizia a studiare pianoforte classico.`,

  development: `Nel corso degli anni ha sviluppato uno stile musicale unico che fonde
    elementi di musica classica con influenze pop contemporanee, creando un sound
    personale e riconoscibile. Le sue composizioni spaziano da ballate intimate
    a brani più ritmati, sempre caratterizzati da testi profondi e melodie avvolgenti.`,

  influences: `Le sue principali influenze musicali includono artisti come Ludovico Einaudi,
    Elisa e Fiona Apple, da cui ha tratto ispirazione per creare un linguaggio
    musicale che parla direttamente al cuore degli ascoltatori.`,

  current: `Attualmente è impegnata nella composizione di nuovi brani e nella performance
    live in vari festival e teatri italiani. Il suo obiettivo è quello di portare
    la sua musica a un pubblico sempre più ampio, mantenendo però l'autenticità
    e l'intimità che caratterizzano ogni sua creazione.`,

  quote: `"La musica per me è un rifugio, un modo per esprimere quello che le parole
    da sole non riescono a dire. Ogni canzone che scrivo è un pezzo della mia anima
    che condivido con chi mi ascolta."`,
};

export function BiografiaContent({ title = 'La mia storia', showTitle = true }: BiografiaContentProps) {
  return (
    <section className="py-16 lg:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-[900px] mx-auto">
        {/* Optional Section Title */}
        {showTitle && (
          <h2 className="font-playfair text-3xl md:text-4xl text-purple-dark mb-8">
            {title}
          </h2>
        )}

        {/* Rich Text Content */}
        <div className="prose-custom">
          {/* Introduction */}
          <p>{defaultContent.intro}</p>

          {/* Musical Development */}
          <h3>Il mio percorso musicale</h3>
          <p>{defaultContent.development}</p>

          {/* Influences */}
          <h3>Le mie ispirazioni</h3>
          <p>{defaultContent.influences}</p>

          {/* Current Activities */}
          <h3>Oggi</h3>
          <p>{defaultContent.current}</p>

          {/* Quote */}
          <blockquote>
            <p>{defaultContent.quote}</p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

export default BiografiaContent;
