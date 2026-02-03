'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  IMAGE_SIZES,
  BLUR_DATA_URL,
  getOptimalQuality,
  getPlaceholderImage,
  type ImageSizePreset,
  type AspectRatio,
} from '@/utils/imageOptimization';

export interface OptimizedImageProps {
  /** Image source path or URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Width in pixels (ignored if fill=true) */
  width?: number;
  /** Height in pixels (ignored if fill=true) */
  height?: number;
  /** Use preset sizes for common use cases */
  preset?: ImageSizePreset;
  /** Load image eagerly (for above-the-fold content) */
  priority?: boolean;
  /** Image quality (1-100) */
  quality?: number;
  /** Fill parent container */
  fill?: boolean;
  /** Aspect ratio class */
  aspectRatio?: AspectRatio;
  /** Object fit behavior */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  /** Object position */
  objectPosition?: string;
  /** Additional className */
  className?: string;
  /** Show blur placeholder while loading */
  showBlur?: boolean;
  /** Callback when image loads */
  onLoad?: () => void;
  /** Callback on error */
  onError?: () => void;
}

/**
 * OptimizedImage Component
 *
 * Wrapper around Next.js Image with built-in optimization features:
 * - Automatic WebP/AVIF conversion
 * - Lazy loading by default
 * - Blur placeholder support
 * - Responsive sizing presets
 * - Error handling with fallback
 * - Consistent quality settings
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  preset,
  priority = false,
  quality,
  fill = false,
  aspectRatio,
  objectFit = 'cover',
  objectPosition = 'center',
  className = '',
  showBlur = true,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Determine dimensions from preset if provided
  const dimensions = preset
    ? { width: IMAGE_SIZES[preset].width, height: IMAGE_SIZES[preset].height }
    : { width, height };

  // Get responsive sizes
  const sizes = preset
    ? IMAGE_SIZES[preset].sizes
    : '(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 1280px';

  // Determine quality
  const imageQuality =
    quality ?? getOptimalQuality(priority, preset === 'thumbnail');

  // Handle image load
  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  // Handle image error
  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  // Use fallback if error
  const imageSrc = hasError ? getPlaceholderImage() : src;

  // Build className for aspect ratio
  const aspectRatioClass = aspectRatio
    ? {
        square: 'aspect-square',
        '16:9': 'aspect-video',
        '4:3': 'aspect-[4/3]',
        '3:2': 'aspect-[3/2]',
        '21:9': 'aspect-[21/9]',
      }[aspectRatio]
    : '';

  // Build object-fit class
  const objectFitClass = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
  }[objectFit];

  // Common image props
  const commonProps = {
    src: imageSrc,
    alt,
    quality: imageQuality,
    loading: priority ? ('eager' as const) : ('lazy' as const),
    onLoad: handleLoad,
    onError: handleError,
    ...(showBlur && !hasError
      ? {
          placeholder: 'blur' as const,
          blurDataURL: BLUR_DATA_URL,
        }
      : {}),
  };

  // Render with fill mode
  if (fill) {
    return (
      <div className={`relative ${aspectRatioClass} ${className}`}>
        <Image
          {...commonProps}
          fill
          sizes={sizes}
          className={`
            ${objectFitClass}
            transition-opacity duration-300
            ${isLoading ? 'opacity-0' : 'opacity-100'}
          `}
          style={{ objectPosition }}
        />
      </div>
    );
  }

  // Render with explicit dimensions
  if (!dimensions.width || !dimensions.height) {
    console.warn(
      'OptimizedImage: width and height are required when fill is false'
    );
    return null;
  }

  return (
    <Image
      {...commonProps}
      width={dimensions.width}
      height={dimensions.height}
      sizes={sizes}
      className={`
        ${objectFitClass}
        ${aspectRatioClass}
        transition-opacity duration-300
        ${isLoading ? 'opacity-0' : 'opacity-100'}
        ${className}
      `}
      style={{ objectPosition }}
    />
  );
}

// Named export for convenience
export { OptimizedImage };
