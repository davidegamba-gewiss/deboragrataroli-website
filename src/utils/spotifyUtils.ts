/**
 * Spotify utility functions for ID extraction and URL generation
 */

export type SpotifyContentType = 'track' | 'album' | 'playlist' | 'artist' | 'episode' | 'show';

/**
 * Extract Spotify ID from various URL formats
 */
export function extractSpotifyId(url: string): string {
  if (!url) return '';

  const patterns = [
    // Embed URLs
    /spotify\.com\/embed\/(?:track|album|playlist|artist|episode|show)\/([a-zA-Z0-9]+)/,
    // Regular URLs
    /spotify\.com\/(?:track|album|playlist|artist|episode|show)\/([a-zA-Z0-9]+)/,
    // Spotify URIs
    /spotify:(?:track|album|playlist|artist|episode|show):([a-zA-Z0-9]+)/,
    // Direct ID (22 characters)
    /^([a-zA-Z0-9]{22})$/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      // Remove query parameters if present
      return match[1].split('?')[0];
    }
  }

  return '';
}

/**
 * Extract content type from Spotify URL
 */
export function extractSpotifyType(url: string): SpotifyContentType {
  if (!url) return 'track';

  const typePatterns: [RegExp, SpotifyContentType][] = [
    [/spotify\.com\/(?:embed\/)?album\//, 'album'],
    [/spotify\.com\/(?:embed\/)?playlist\//, 'playlist'],
    [/spotify\.com\/(?:embed\/)?artist\//, 'artist'],
    [/spotify\.com\/(?:embed\/)?episode\//, 'episode'],
    [/spotify\.com\/(?:embed\/)?show\//, 'show'],
    [/spotify:album:/, 'album'],
    [/spotify:playlist:/, 'playlist'],
    [/spotify:artist:/, 'artist'],
    [/spotify:episode:/, 'episode'],
    [/spotify:show:/, 'show'],
  ];

  for (const [pattern, type] of typePatterns) {
    if (pattern.test(url)) {
      return type;
    }
  }

  return 'track';
}

/**
 * Options for generating embed URL
 */
export interface SpotifyEmbedOptions {
  theme?: 'dark' | 'light' | '0' | '1'; // 0 = dark (default), 1 = light
  utmSource?: string;
}

/**
 * Get Spotify embed URL
 */
export function getSpotifyEmbedUrl(
  id: string,
  type: SpotifyContentType = 'track',
  options: SpotifyEmbedOptions = {}
): string {
  if (!id) return '';

  const params = new URLSearchParams({
    utm_source: options.utmSource || 'generator',
  });

  // Theme: 0 = dark (default Spotify look), 1 = light
  if (options.theme === 'light' || options.theme === '1') {
    params.set('theme', '1');
  } else {
    params.set('theme', '0');
  }

  return `https://open.spotify.com/embed/${type}/${id}?${params.toString()}`;
}

/**
 * Get Spotify web player URL (for opening in browser)
 */
export function getSpotifyWebUrl(id: string, type: SpotifyContentType = 'track'): string {
  if (!id) return '';
  return `https://open.spotify.com/${type}/${id}`;
}

/**
 * Get Spotify URI (for opening in Spotify app)
 */
export function getSpotifyUri(id: string, type: SpotifyContentType = 'track'): string {
  if (!id) return '';
  return `spotify:${type}:${id}`;
}

/**
 * Validate if a string is a valid Spotify ID
 */
export function isValidSpotifyId(id: string): boolean {
  return /^[a-zA-Z0-9]{22}$/.test(id);
}

/**
 * Check if URL is a Spotify URL
 */
export function isSpotifyUrl(url: string): boolean {
  return (
    url.includes('spotify.com') ||
    url.startsWith('spotify:') ||
    isValidSpotifyId(url)
  );
}

/**
 * Get recommended height based on content type
 */
export function getRecommendedHeight(type: SpotifyContentType, compact: boolean = false): number {
  if (compact) {
    return 80; // Compact player for all types
  }

  switch (type) {
    case 'track':
      return 152; // Single track with artwork
    case 'album':
    case 'playlist':
      return 352; // List with multiple tracks
    case 'artist':
      return 352;
    case 'episode':
    case 'show':
      return 232;
    default:
      return 152;
  }
}
