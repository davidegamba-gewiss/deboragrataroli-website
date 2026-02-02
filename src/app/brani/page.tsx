import type { Metadata } from 'next';
import Link from 'next/link';
import { PageLayout } from '@/components/layout/PageLayout';
import { ROUTES } from '@/utils/routing';

export const metadata: Metadata = {
  title: 'I Miei Brani - Debora Grataroli',
  description:
    'Ascolta i brani originali di Debora Grataroli. Canzoni, testi e musica dal cuore.',
};

// Placeholder songs data
const braniPlaceholder = [
  {
    id: '1',
    slug: 'il-mio-primo-brano',
    titolo: 'Il Mio Primo Brano',
    categoria: 'Originale',
    anno: '2025',
  },
  {
    id: '2',
    slug: 'melodie-del-cuore',
    titolo: 'Melodie del Cuore',
    categoria: 'Originale',
    anno: '2025',
  },
  {
    id: '3',
    slug: 'note-di-luna',
    titolo: 'Note di Luna',
    categoria: 'Originale',
    anno: '2024',
  },
  {
    id: '4',
    slug: 'sogni-in-musica',
    titolo: 'Sogni in Musica',
    categoria: 'Originale',
    anno: '2024',
  },
  {
    id: '5',
    slug: 'lalbero-della-vita',
    titolo: 'L\'Albero della Vita',
    categoria: 'Originale',
    anno: '2023',
  },
  {
    id: '6',
    slug: 'vento-del-sud',
    titolo: 'Vento del Sud',
    categoria: 'Originale',
    anno: '2023',
  },
];

export default function BraniPage() {
  return (
    <PageLayout
      hero={{
        imageSrc: '/images/hero-brani.jpg',
        title: 'I Miei Brani',
        subtitle: 'Ascolta la mia musica',
        imageAlt: 'Spartiti musicali',
      }}
    >
      <section>
        {/* Grid of Songs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {braniPlaceholder.map((brano) => (
            <Link
              key={brano.id}
              href={ROUTES.BRANI_DETAIL(brano.slug)}
              className="group"
            >
              <article className="card overflow-hidden hover:shadow-lg transition-all duration-300">
                {/* Cover Placeholder */}
                <div className="aspect-square bg-gradient-to-br from-purple-light to-purple-dark flex items-center justify-center relative overflow-hidden">
                  <span className="text-white text-8xl opacity-30 group-hover:scale-110 transition-transform duration-500">
                    ♪
                  </span>

                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-all duration-300">
                    <svg
                      className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Song Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 group-hover:text-purple-medium transition-colors text-lg">
                    {brano.titolo}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-500">{brano.categoria}</span>
                    <span className="text-sm text-gray-400">{brano.anno}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </PageLayout>
  );
}
