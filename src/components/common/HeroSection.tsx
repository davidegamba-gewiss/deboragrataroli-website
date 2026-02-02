'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { HeroSectionProps } from '@/types/layout';
import { HeroSkeleton } from './HeroSkeleton';

/**
 * HeroSection Component
 *
 * Full-width hero section with background image and centered title.
 * Features:
 * - 16:9 aspect ratio maintained
 * - Responsive heights: 300px (mobile), 400px (tablet), 500px (desktop)
 * - Gradient overlay for text readability
 * - Lazy loading with skeleton placeholder
 * - Centered title with optional subtitle
 */
export function HeroSection({
  imageSrc,
  title,
  subtitle,
  imageAlt,
}: HeroSectionProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <section
      aria-label={`Hero: ${title}`}
      className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden"
    >
      {/* Loading skeleton */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 z-0">
          <HeroSkeleton />
        </div>
      )}

      {/* Background image */}
      {!hasError && (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority={false}
          loading="lazy"
          sizes="100vw"
          className={`
            object-cover object-center
            transition-opacity duration-500
            ${isLoading ? 'opacity-0' : 'opacity-100'}
          `}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
        />
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 bg-neutral-dark flex items-center justify-center">
          <span className="text-white/50 text-sm">Immagine non disponibile</span>
        </div>
      )}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.2) 50%, transparent)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6">
        <h1
          className="
            font-playfair text-white text-center
            text-[40px] md:text-[48px] lg:text-[56px]
            leading-tight font-semibold
            drop-shadow-lg
            max-w-4xl
          "
        >
          {title}
        </h1>

        {subtitle && (
          <p
            className="
              mt-4 text-white/90 text-center
              text-lg md:text-xl lg:text-2xl
              font-sans font-light
              max-w-2xl
              drop-shadow-md
            "
          >
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}

export default HeroSection;
