'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

/**
 * BranoCard Props
 */
export interface BranoCardProps {
  id: string;
  titolo: string;
  slug: string;
  cover: string;
  categoria?: string;
}

/**
 * BranoCard Component
 *
 * Card component for displaying a song with cover image, title, and category.
 * Links to the song detail page.
 *
 * Features:
 * - Square aspect ratio (1:1)
 * - Hover scale animation
 * - Lazy loading image
 * - Category badge
 */
export function BranoCard({ titolo, slug, cover, categoria }: BranoCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      href={`/brani/${slug}`}
      className="
        group block
        bg-white rounded-lg overflow-hidden
        shadow-md
        transition-all duration-300 ease-in-out
        hover:scale-105
        hover:shadow-[0_10px_30px_rgba(123,67,151,0.2)]
        focus:outline-none focus:ring-2 focus:ring-purple-medium focus:ring-offset-2
      "
    >
      {/* Cover Image */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {imageError ? (
          // Placeholder gradient when image fails to load
          <div className="absolute inset-0 bg-gradient-to-br from-purple-light to-purple-medium flex items-center justify-center">
            <svg
              className="w-16 h-16 text-white opacity-60"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>
        ) : (
          <Image
            src={cover}
            alt={`Cover di ${titolo}`}
            fill
            loading="lazy"
            quality={80}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-purple-dark/0 group-hover:bg-purple-dark/20 transition-colors duration-300" />
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-base text-neutral-dark line-clamp-2 group-hover:text-purple-medium transition-colors duration-200">
          {titolo}
        </h3>

        {/* Category */}
        {categoria && (
          <p className="mt-1 text-xs text-purple-dark italic opacity-80">
            {categoria}
          </p>
        )}
      </div>
    </Link>
  );
}

export default BranoCard;
