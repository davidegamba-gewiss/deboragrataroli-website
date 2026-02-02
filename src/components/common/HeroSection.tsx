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
      className="relative w-full h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden"
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

      {/* Error fallback - elegant gradient */}
      {hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-purple-dark via-purple-medium to-purple-light" />
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
            text-[48px] md:text-[64px] lg:text-[72px]
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
              text-xl md:text-2xl lg:text-[28px]
              font-sans font-normal
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
