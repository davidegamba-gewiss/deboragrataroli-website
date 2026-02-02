import Link from 'next/link';
import { BranoCard } from './BranoCard';
import { ROUTES } from '@/utils/routing';

/**
 * Featured brani data (hardcoded for now, will be from CMS later)
 */
const featuredBrani = [
  {
    id: '1',
    titolo: 'La Mia Canzone',
    slug: 'la-mia-canzone',
    cover: '/images/placeholder-cover-1.jpg',
    categoria: 'Album Originale',
  },
  {
    id: '2',
    titolo: 'Brano Live',
    slug: 'brano-live',
    cover: '/images/placeholder-cover-2.jpg',
    categoria: 'Performance Live',
  },
];

/**
 * FeaturedBrani Component
 *
 * Section displaying featured songs with a grid layout.
 *
 * Features:
 * - Responsive grid (1-2-3 columns)
 * - BranoCard components
 * - Link to all songs page
 */
export function FeaturedBrani() {
  return (
    <section className="py-16 lg:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Title */}
        <h2 className="font-playfair text-4xl md:text-5xl lg:text-[48px] text-purple-dark text-center mb-12">
          I Miei Brani
        </h2>

        {/* Brani Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {featuredBrani.map((brano) => (
            <BranoCard
              key={brano.id}
              id={brano.id}
              titolo={brano.titolo}
              slug={brano.slug}
              cover={brano.cover}
              categoria={brano.categoria}
            />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href={ROUTES.BRANI}
            className="
              inline-flex items-center gap-2
              px-8 py-3
              bg-purple-medium text-white
              font-medium text-lg
              rounded-lg
              transition-all duration-300
              hover:bg-purple-dark hover:shadow-lg
              focus:outline-none focus:ring-2 focus:ring-purple-medium focus:ring-offset-2
            "
          >
            Scopri tutti i brani
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FeaturedBrani;
