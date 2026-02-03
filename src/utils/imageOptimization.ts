/**
 * Image optimization utilities
 * Provides helpers for responsive images, WebP conversion, and performance
 */

/**
 * Aspect ratio presets with their dimensions
 */
export const ASPECT_RATIOS = {
  square: { width: 1, height: 1 },
  '16:9': { width: 16, height: 9 },
  '4:3': { width: 4, height: 3 },
  '3:2': { width: 3, height: 2 },
  '21:9': { width: 21, height: 9 },
} as const;

export type AspectRatio = keyof typeof ASPECT_RATIOS;

/**
 * Image size presets for common use cases
 */
export const IMAGE_SIZES = {
  // Hero images (full-width)
  hero: {
    width: 1920,
    height: 1080,
    sizes: '100vw',
  },
  // Card thumbnails
  thumbnail: {
    width: 400,
    height: 400,
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  },
  // Article images (16:9)
  article: {
    width: 800,
    height: 450,
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  },
  // Profile/avatar images
  avatar: {
    width: 128,
    height: 128,
    sizes: '128px',
  },
  // Cover images (album covers, etc)
  cover: {
    width: 400,
    height: 400,
    sizes: '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px',
  },
  // Gallery images
  gallery: {
    width: 600,
    height: 400,
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  },
} as const;

export type ImageSizePreset = keyof typeof IMAGE_SIZES;

/**
 * Get responsive sizes attribute based on preset
 */
export function getResponsiveSizes(preset: ImageSizePreset): string {
  return IMAGE_SIZES[preset].sizes;
}

/**
 * Get dimensions for a preset
 */
export function getPresetDimensions(preset: ImageSizePreset): {
  width: number;
  height: number;
} {
  const { width, height } = IMAGE_SIZES[preset];
  return { width, height };
}

/**
 * Calculate dimensions maintaining aspect ratio
 */
export function calculateDimensions(
  targetWidth: number,
  aspectRatio: AspectRatio
): { width: number; height: number } {
  const ratio = ASPECT_RATIOS[aspectRatio];
  const height = Math.round((targetWidth * ratio.height) / ratio.width);
  return { width: targetWidth, height };
}

/**
 * Generate WebP and fallback paths from original image path
 */
export function getImageSourceSet(imagePath: string): {
  webp: string;
  fallback: string;
} {
  // If already a webp, return as is
  if (imagePath.endsWith('.webp')) {
    return {
      webp: imagePath,
      fallback: imagePath.replace('.webp', '.jpg'),
    };
  }

  return {
    webp: imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp'),
    fallback: imagePath,
  };
}

/**
 * Check if image path is external URL
 */
export function isExternalImage(src: string): boolean {
  return src.startsWith('http://') || src.startsWith('https://');
}

/**
 * Generate blur data URL placeholder (10x10 gray)
 */
export const BLUR_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg==';

/**
 * Generate a color-based blur placeholder
 */
export function generateColorPlaceholder(hexColor: string = '#7b4397'): string {
  // Remove # if present
  const color = hexColor.replace('#', '');

  // Simple 1x1 PNG with the color
  // This is a minimal valid PNG structure
  return `data:image/svg+xml;base64,${btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><rect fill="#${color}" width="1" height="1"/></svg>`
  )}`;
}

/**
 * Default quality settings
 */
export const IMAGE_QUALITY = {
  high: 90,
  default: 80,
  low: 60,
  thumbnail: 70,
} as const;

/**
 * Get optimal quality based on image type
 */
export function getOptimalQuality(
  isHero: boolean = false,
  isThumbnail: boolean = false
): number {
  if (isHero) return IMAGE_QUALITY.high;
  if (isThumbnail) return IMAGE_QUALITY.thumbnail;
  return IMAGE_QUALITY.default;
}

/**
 * Generate srcset string for responsive images (manual usage)
 */
export function generateSrcSet(
  basePath: string,
  widths: number[] = [640, 750, 828, 1080, 1200, 1920]
): string {
  // This is mainly for reference - Next.js Image handles this automatically
  return widths
    .map((w) => {
      const path = basePath.replace(/\.(jpg|jpeg|png|webp)$/i, `-${w}.$1`);
      return `${path} ${w}w`;
    })
    .join(', ');
}

/**
 * Get placeholder image path
 */
export function getPlaceholderImage(type: 'default' | 'avatar' | 'cover' = 'default'): string {
  const placeholders = {
    default: '/images/placeholder/no-image.jpg',
    avatar: '/images/placeholder/avatar.jpg',
    cover: '/images/placeholder/cover.jpg',
  };
  return placeholders[type];
}

/**
 * Validate image dimensions are reasonable
 */
export function validateImageDimensions(
  width: number,
  height: number,
  maxWidth: number = 3840,
  maxHeight: number = 2160
): boolean {
  return (
    width > 0 &&
    height > 0 &&
    width <= maxWidth &&
    height <= maxHeight
  );
}
