import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageLayout } from '@/components/layout/PageLayout';
import { ROUTES } from '@/utils/routing';

// Placeholder songs data
const braniData: Record<string, {
  titolo: string;
  categoria: string;
  anno: string;
  descrizione: string;
  testo?: string;
}> = {
  'il-mio-primo-brano': {
    titolo: 'Il Mio Primo Brano',
    categoria: 'Originale',
    anno: '2025',
    descrizione: 'Il mio primo brano originale racconta il viaggio di scoperta della propria voce artistica. È una canzone che parla di inizi, di sogni e della bellezza di mettersi in gioco.',
    testo: 'Verso 1:\nLe note danzano nel vento\nCome foglie in un momento\nE la musica mi porta via\nVerso una nuova melodia\n\nRitornello:\nQuesto è il mio primo brano\nLa mia voce piano piano\nRacconta quello che ho dentro\nOgni nota è un sentimento',
  },
  'melodie-del-cuore': {
    titolo: 'Melodie del Cuore',
    categoria: 'Originale',
    anno: '2025',
    descrizione: 'Una ballata romantica che esplora i sentimenti più profondi. Le melodie del cuore sono quelle che non si possono descrivere a parole, solo cantare.',
  },
  'note-di-luna': {
    titolo: 'Note di Luna',
    categoria: 'Originale',
    anno: '2024',
    descrizione: 'Ispirata dalle notti stellate, questa canzone è un viaggio notturno tra sogni e realtà.',
  },
  'sogni-in-musica': {
    titolo: 'Sogni in Musica',
    categoria: 'Originale',
    anno: '2024',
    descrizione: 'I sogni prendono forma attraverso le note. Un brano che invita a sognare ad occhi aperti.',
  },
  'lalbero-della-vita': {
    titolo: 'L\'Albero della Vita',
    categoria: 'Originale',
    anno: '2023',
    descrizione: 'Una riflessione sulla vita e sulle radici che ci legano al passato mentre cresciamo verso il futuro.',
  },
  'vento-del-sud': {
    titolo: 'Vento del Sud',
    categoria: 'Originale',
    anno: '2023',
    descrizione: 'Il calore del sud italiano raccontato attraverso melodie mediterranee e parole che sanno di casa.',
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brano = braniData[slug];

  if (!brano) {
    return {
      title: 'Brano non trovato - Debora Grataroli',
    };
  }

  return {
    title: `${brano.titolo} - Debora Grataroli`,
    description: brano.descrizione,
  };
}

export default async function BranoDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const brano = braniData[slug];

  if (!brano) {
    notFound();
  }

  return (
    <PageLayout showDecorative>
      {/* Back Link */}
      <div className="mb-8">
        <Link
          href={ROUTES.BRANI}
          className="inline-flex items-center gap-2 text-purple-medium hover:text-purple-dark transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Torna ai brani
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Cover and Player */}
        <div>
          {/* Cover Placeholder */}
          <div className="aspect-square bg-gradient-to-br from-purple-light to-purple-dark rounded-lg flex items-center justify-center mb-6">
            <span className="text-white text-9xl opacity-30">♪</span>
          </div>

          {/* Streaming Links Placeholder */}
          <div className="flex flex-wrap gap-3">
            <a
              href="#"
              className="flex items-center gap-2 px-4 py-2 bg-[#1DB954] text-white rounded-full hover:opacity-90 transition-opacity"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
              Spotify
            </a>
            <a
              href="#"
              className="flex items-center gap-2 px-4 py-2 bg-[#FF0000] text-white rounded-full hover:opacity-90 transition-opacity"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              YouTube
            </a>
          </div>
        </div>

        {/* Song Info */}
        <div>
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-purple-light/20 text-purple-dark text-sm font-medium rounded-full">
              {brano.categoria}
            </span>
            <span className="ml-2 text-gray-500">{brano.anno}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {brano.titolo}
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            {brano.descrizione}
          </p>

          {/* Lyrics */}
          {brano.testo && (
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Testo</h2>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="font-sans text-gray-700 whitespace-pre-wrap">
                  {brano.testo}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
