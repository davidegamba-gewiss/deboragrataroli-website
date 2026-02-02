import type { Metadata } from 'next';
import { PageLayout } from '@/components/layout/PageLayout';

export const metadata: Metadata = {
  title: 'Esibizioni - Debora Grataroli',
  description:
    'Guarda le esibizioni video di Debora Grataroli. Performance live, cover e brani originali.',
};

// Placeholder videos data
const esibizioniPlaceholder = [
  {
    id: '1',
    titolo: 'Live al Teatro Comunale',
    thumbnail: '/images/video-thumb-1.jpg',
    categoria: 'live',
    data: '2025',
  },
  {
    id: '2',
    titolo: 'Brano Originale - Il Mio Primo Brano',
    thumbnail: '/images/video-thumb-2.jpg',
    categoria: 'originale',
    data: '2025',
  },
  {
    id: '3',
    titolo: 'Cover - Hallelujah',
    thumbnail: '/images/video-thumb-3.jpg',
    categoria: 'cover',
    data: '2024',
  },
  {
    id: '4',
    titolo: 'Session in Studio',
    thumbnail: '/images/video-thumb-4.jpg',
    categoria: 'studio',
    data: '2024',
  },
  {
    id: '5',
    titolo: 'Acustico Live',
    thumbnail: '/images/video-thumb-5.jpg',
    categoria: 'live',
    data: '2024',
  },
  {
    id: '6',
    titolo: 'Cover - Someone Like You',
    thumbnail: '/images/video-thumb-6.jpg',
    categoria: 'cover',
    data: '2023',
  },
];

const categorie = [
  { value: 'tutti', label: 'Tutti' },
  { value: 'live', label: 'Live' },
  { value: 'originale', label: 'Originali' },
  { value: 'cover', label: 'Cover' },
  { value: 'studio', label: 'Studio' },
];

export default function EsibizioniPage() {
  return (
    <PageLayout
      hero={{
        imageSrc: '/images/hero-esibizioni.jpg',
        title: 'Esibizioni',
        subtitle: 'I miei video live e in studio',
        imageAlt: 'Debora Grataroli durante un\'esibizione',
      }}
    >
      <section>
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categorie.map((cat) => (
            <button
              key={cat.value}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                cat.value === 'tutti'
                  ? 'bg-purple-medium text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-purple-light/20 hover:text-purple-dark'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {esibizioniPlaceholder.map((video) => (
            <article
              key={video.id}
              className="group cursor-pointer"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden mb-3">
                {/* Placeholder for video thumbnail */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-light to-purple-dark flex items-center justify-center">
                  <svg
                    className="w-16 h-16 text-white opacity-80 group-hover:scale-110 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>

                {/* Category Badge */}
                <span className="absolute top-2 left-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                  {video.categoria}
                </span>
              </div>

              {/* Video Info */}
              <h3 className="font-semibold text-gray-900 group-hover:text-purple-medium transition-colors">
                {video.titolo}
              </h3>
              <p className="text-sm text-gray-500">{video.data}</p>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="btn-outline btn-lg">
            Carica altri video
          </button>
        </div>
      </section>
    </PageLayout>
  );
}
