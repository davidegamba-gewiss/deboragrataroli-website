import type { Metadata } from 'next';
import { PageLayout } from '@/components/layout/PageLayout';

export const metadata: Metadata = {
  title: 'Parlano di Me - Debora Grataroli',
  description:
    'Rassegna stampa e articoli su Debora Grataroli. Leggi cosa dicono di me.',
};

// Placeholder press articles data
const articoliPlaceholder = [
  {
    id: '1',
    titolo: 'La nuova voce della musica italiana',
    testata: 'Rolling Stone Italia',
    data: '15 Gennaio 2026',
    estratto: 'Debora Grataroli emerge come una delle voci più interessanti del panorama musicale italiano. Le sue composizioni originali uniscono tradizione e innovazione.',
    url: '#',
  },
  {
    id: '2',
    titolo: 'Intervista esclusiva: "La musica è la mia vita"',
    testata: 'Vanity Fair',
    data: '8 Dicembre 2025',
    estratto: 'Abbiamo incontrato la cantautrice per parlare del suo ultimo album e dei progetti futuri. Una conversazione intima sulla passione per la musica.',
    url: '#',
  },
  {
    id: '3',
    titolo: 'Concerto sold out al Teatro Comunale',
    testata: 'Il Messaggero',
    data: '22 Novembre 2025',
    estratto: 'Grande successo per il concerto di Debora Grataroli che ha fatto registrare il tutto esaurito. Il pubblico entusiasta ha tributato una standing ovation.',
    url: '#',
  },
  {
    id: '4',
    titolo: 'Il nuovo singolo conquista le classifiche',
    testata: 'ANSA Musica',
    data: '5 Ottobre 2025',
    estratto: 'Il nuovo singolo di Debora Grataroli entra direttamente nella top 10 delle classifiche italiane. Un successo che conferma il talento dell\'artista.',
    url: '#',
  },
];

export default function ParlanoDiMePage() {
  return (
    <PageLayout
      hero={{
        imageSrc: '/images/hero-stampa.jpg',
        title: 'Parlano di Me',
        subtitle: 'Rassegna stampa e articoli',
        imageAlt: 'Rassegna stampa Debora Grataroli',
      }}
    >
      <section>
        <div className="space-y-8">
          {articoliPlaceholder.map((articolo) => (
            <article
              key={articolo.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                {/* Article Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-semibold text-purple-medium">
                      {articolo.testata}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-500">
                      {articolo.data}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 mb-3">
                    {articolo.titolo}
                  </h2>

                  <p className="text-gray-600 mb-4">
                    {articolo.estratto}
                  </p>

                  <a
                    href={articolo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-purple-medium hover:text-purple-dark font-medium transition-colors"
                  >
                    Leggi l&apos;articolo completo
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* More Articles Notice */}
        <div className="mt-12 text-center">
          <p className="text-gray-500">
            Altri articoli saranno aggiunti presto.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
