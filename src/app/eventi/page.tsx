import type { Metadata } from 'next';
import { PageLayout } from '@/components/layout/PageLayout';

export const metadata: Metadata = {
  title: 'Eventi - Debora Grataroli',
  description:
    'Scopri i prossimi eventi e concerti di Debora Grataroli. Non perdere le date dei live!',
};

// Placeholder events data
const eventiPlaceholder = [
  {
    id: '1',
    titolo: 'Concerto al Teatro Comunale',
    luogo: 'Roma, Teatro Comunale',
    data: '15 Marzo 2026',
    ora: '21:00',
    descrizione: 'Una serata speciale con i miei brani originali e alcune cover.',
  },
  {
    id: '2',
    titolo: 'Live Acustico',
    luogo: 'Milano, Jazz Club Blue Note',
    data: '22 Aprile 2026',
    ora: '20:30',
    descrizione: 'Set acustico intimo con pianoforte e voce.',
  },
  {
    id: '3',
    titolo: 'Festival della Musica Italiana',
    luogo: 'Firenze, Piazza della Signoria',
    data: '10 Maggio 2026',
    ora: '19:00',
    descrizione: 'Performance al festival dedicato alla musica italiana.',
  },
  {
    id: '4',
    titolo: 'Concerto di Beneficenza',
    luogo: 'Bologna, Auditorium Manzoni',
    data: '5 Giugno 2026',
    ora: '20:00',
    descrizione: 'Serata di beneficenza con musica e solidarietà.',
  },
];

export default function EventiPage() {
  return (
    <PageLayout
      hero={{
        imageSrc: '/images/hero-eventi.jpg',
        title: 'Eventi',
        subtitle: 'Scopri dove esibirmi dal vivo',
        imageAlt: 'Debora Grataroli in concerto',
      }}
    >
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">
          Prossimi Eventi
        </h2>

        <div className="space-y-6">
          {eventiPlaceholder.map((evento) => (
            <article
              key={evento.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-purple-light/20 text-purple-dark text-sm font-medium rounded-full">
                      {evento.data}
                    </span>
                    {evento.ora && (
                      <span className="text-gray-500 text-sm">
                        ore {evento.ora}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {evento.titolo}
                  </h3>

                  <p className="text-purple-medium font-medium mb-2">
                    {evento.luogo}
                  </p>

                  <p className="text-gray-600">
                    {evento.descrizione}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <button className="btn-outline btn-md w-full md:w-auto">
                    Dettagli
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Past Events Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Eventi Passati
          </h2>
          <p className="text-gray-600">
            Presto disponibile l&apos;archivio degli eventi passati.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
