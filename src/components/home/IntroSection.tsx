/**
 * IntroSection Component
 *
 * Introduction section for the homepage with welcome title and description.
 */
export function IntroSection() {
  return (
    <section className="py-16 lg:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="font-playfair text-4xl md:text-5xl lg:text-[48px] text-purple-dark mb-6">
          Benvenuti nel mio mondo musicale
        </h2>

        <div className="max-w-[800px]">
          <p className="text-base md:text-lg text-neutral-dark leading-relaxed mb-8">
            Scopri i miei brani originali, ascolta le mie storie musicali e seguimi
            nei miei concerti e performance live. La musica è il mio modo di raccontare
            emozioni, sogni e momenti di vita che spero possano toccare anche il tuo cuore.
          </p>

          <p className="text-base md:text-lg text-neutral-dark leading-relaxed">
            Ogni canzone nasce da un&apos;emozione autentica, da un momento vissuto
            o da un sogno che prende forma attraverso le note del pianoforte e le parole
            che sgorgano dal cuore. Ti invito a esplorare il mio repertorio e a
            lasciarti trasportare dalla musica.
          </p>
        </div>
      </div>
    </section>
  );
}

export default IntroSection;
