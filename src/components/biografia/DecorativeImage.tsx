'use client';

import Image from 'next/image';
import { useState } from 'react';

/**
 * DecorativeImage Props
 */
export interface DecorativeImageProps {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Optional custom className */
  className?: string;
}

/**
 * DecorativeImage Component
 *
 * Atmospheric decorative image for the bottom of the biography page.
 * Features:
 * - 16:5 aspect ratio
 * - Responsive heights
 * - Lazy loading
 * - Graceful fallback on error
 */
export function DecorativeImage({ src, alt, className = '' }: DecorativeImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <section className={`mt-16 lg:mt-24 px-4 md:px-8 ${className}`}>
      <div className="max-w-[1280px] mx-auto">
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden">
          {hasError ? (
            // Fallback gradient when image fails
            <div className="absolute inset-0 bg-gradient-to-r from-purple-dark via-purple-medium to-purple-light opacity-80" />
          ) : (
            <Image
              src={src}
              alt={alt}
              fill
              sizes="100vw"
              className="object-cover"
              loading="lazy"
              onError={() => setHasError(true)}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default DecorativeImage;
