'use client';

import type { HeroSkeletonProps } from '@/types/layout';

/**
 * HeroSkeleton Component
 *
 * Loading placeholder for the HeroSection while image loads.
 * Features a shimmer animation effect.
 */
export function HeroSkeleton({ heightClass }: HeroSkeletonProps) {
  return (
    <div
      className={`
        relative w-full overflow-hidden
        ${heightClass || 'h-[300px] md:h-[400px] lg:h-[500px]'}
        bg-neutral-dark
      `}
      aria-hidden="true"
    >
      {/* Shimmer effect */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-r from-transparent via-white/5 to-transparent
          animate-shimmer
        "
        style={{
          backgroundSize: '200% 100%',
        }}
      />

      {/* Placeholder content structure */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
        {/* Title placeholder */}
        <div className="w-3/4 max-w-md h-10 md:h-14 bg-white/10 rounded-lg mb-4" />
        {/* Subtitle placeholder */}
        <div className="w-1/2 max-w-xs h-6 bg-white/5 rounded-lg" />
      </div>
    </div>
  );
}

export default HeroSkeleton;
