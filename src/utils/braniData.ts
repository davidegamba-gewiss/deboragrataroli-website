import { braniData, BranoData } from '@/data/brani';

/**
 * Get a single brano by slug
 */
export function getBrano(slug: string): BranoData | undefined {
  return braniData.find((b) => b.slug === slug);
}

/**
 * Get all brani
 */
export function getAllBrani(): BranoData[] {
  return braniData;
}

/**
 * Get all brani slugs (useful for static generation)
 */
export function getAllBraniSlugs(): string[] {
  return braniData.map((b) => b.slug);
}

/**
 * Generate a URL-friendly slug from a title
 */
export function generateSlug(titolo: string): string {
  return titolo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Get brani by categoria
 */
export function getBraniByCategoria(categoria: string): BranoData[] {
  return braniData.filter((b) => b.categoria === categoria);
}

/**
 * Get unique categories
 */
export function getCategorie(): string[] {
  return [...new Set(braniData.map((b) => b.categoria))];
}

/**
 * Extract YouTube video ID from various URL formats
 */
export function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) return match[1];
  }

  return null;
}

/**
 * Extract Spotify track ID from various URL formats
 */
export function extractSpotifyId(url: string): string | null {
  const patterns = [
    /(?:spotify\.com\/embed\/track\/)([a-zA-Z0-9]{22})/,
    /(?:spotify\.com\/track\/)([a-zA-Z0-9]{22})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) return match[1];
  }

  return null;
}
