import { esibizioniData, EsibizioneData, CategoriaEsibizione } from '@/data/esibizioni';

/**
 * Get all unique years from esibizioni (descending order)
 */
export function getAnniUnici(): number[] {
  const anni = new Set(esibizioniData.map((v) => v.anno));
  return Array.from(anni).sort((a, b) => b - a);
}

/**
 * Get all categories
 */
export function getCategorie(): CategoriaEsibizione[] {
  return ['Live', 'Studio', 'Cover'];
}

/**
 * Filter videos by year and/or category
 */
export function filtraVideo(
  anno?: number | null,
  categoria?: CategoriaEsibizione | null
): EsibizioneData[] {
  return esibizioniData.filter((v) => {
    const matchAnno = !anno || v.anno === anno;
    const matchCategoria = !categoria || v.categoria === categoria;
    return matchAnno && matchCategoria;
  });
}

/**
 * Get all esibizioni
 */
export function getAllEsibizioni(): EsibizioneData[] {
  return esibizioniData;
}

/**
 * Get esibizione by ID
 */
export function getEsibizioneById(id: string): EsibizioneData | undefined {
  return esibizioniData.find((v) => v.id === id);
}

/**
 * Extract YouTube video ID from various URL formats
 */
export function getYouTubeId(url: string): string {
  const patterns = [
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) return match[1];
  }

  // If it's just the video ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
    return url;
  }

  return '';
}

/**
 * Get YouTube thumbnail URL from video URL
 */
export function getYouTubeThumbnail(
  url: string,
  quality: 'maxresdefault' | 'sddefault' | 'hqdefault' = 'hqdefault'
): string {
  const videoId = getYouTubeId(url);
  if (!videoId) return '';
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

/**
 * Get YouTube embed URL from video URL
 */
export function getYouTubeEmbedUrl(url: string): string {
  const videoId = getYouTubeId(url);
  if (!videoId) return url;
  return `https://www.youtube.com/embed/${videoId}`;
}

/**
 * Get YouTube watch URL from video URL
 */
export function getYouTubeWatchUrl(url: string): string {
  const videoId = getYouTubeId(url);
  if (!videoId) return url;
  return `https://www.youtube.com/watch?v=${videoId}`;
}
