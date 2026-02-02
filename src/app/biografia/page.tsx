import type { Metadata } from 'next';
import { PageLayout } from '@/components/layout/PageLayout';

export const metadata: Metadata = {
  title: 'Biografia - Debora Grataroli',
  description:
    'Leggi la biografia di Debora Grataroli. Scopri la mia storia, il mio percorso musicale e le mie ispirazioni.',
};

export default function BiografiaPage() {
  return (
    <PageLayout
      hero={{
        imageSrc: '/images/hero-biografia.jpg',
        title: 'Biografia',
        imageAlt: 'Debora Grataroli',
      }}
    >
      <article className="prose prose-lg max-w-3xl mx-auto">
        <p className="lead text-xl text-gray-700 mb-8">
          Debora Grataroli è una cantautrice e pianista italiana con una passione
          profonda per la musica che racconta storie ed emozioni.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">
          Gli Inizi
        </h2>
        <p className="text-gray-600 mb-6">
          La mia storia con la musica inizia fin da bambina, quando mi sono
          avvicinata al pianoforte. Da allora, la musica è diventata il mio
          linguaggio preferito per esprimere emozioni e raccontare storie.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">
          Il Percorso Artistico
        </h2>
        <p className="text-gray-600 mb-6">
          Negli anni ho sviluppato uno stile personale che fonde melodie
          classiche con influenze contemporanee. Ogni brano nasce da
          esperienze vissute, riflessioni e momenti di vita quotidiana.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">
          La Musica Oggi
        </h2>
        <p className="text-gray-600 mb-6">
          Oggi continuo a scrivere, comporre e esibirmi portando la mia
          musica in teatri, locali e eventi. Ogni esibizione è un&apos;occasione
          per condividere emozioni e creare connessioni con il pubblico.
        </p>

        <blockquote className="border-l-4 border-purple-medium pl-6 my-8 italic text-gray-700">
          &ldquo;La musica è la mia voce, il pianoforte le mie mani che
          parlano al mondo.&rdquo;
        </blockquote>

        <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">
          Le Ispirazioni
        </h2>
        <p className="text-gray-600 mb-6">
          Le mie ispirazioni spaziano dalla musica italiana d&apos;autore ai
          grandi compositori classici, passando per il cantautorato
          internazionale. Ogni influenza contribuisce a creare il mio
          sound unico.
        </p>
      </article>
    </PageLayout>
  );
}
