/**
 * YouTube utility functions for video ID extraction, thumbnail URLs, and embed URLs
 */

/**
 * Extract YouTube video ID from various URL formats
 */
export function extractYouTubeId(url: string): string {
  if (!url) return '';

  const patterns = [
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /\/vi\/([a-zA-Z0-9_-]{11})/,
    /^([a-zA-Z0-9_-]{11})$/, // Direct video ID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return '';
}

/**
 * Thumbnail quality options
 */
export type ThumbnailQuality =
  | 'maxresdefault' // 1280x720 (may not exist)
  | 'sddefault' // 640x480
  | 'hqdefault' // 480x360
  | 'mqdefault' // 320x180
  | 'default'; // 120x90

/**
 * Get YouTube thumbnail URL for a video ID
 */
export function getThumbnailUrl(
  videoId: string,
  quality: ThumbnailQuality = 'hqdefault'
): string {
  if (!videoId) return '';
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

/**
 * Get multiple thumbnail URLs with fallbacks
 */
export function getThumbnailUrls(videoId: string): string[] {
  if (!videoId) return [];
  return [
    getThumbnailUrl(videoId, 'maxresdefault'),
    getThumbnailUrl(videoId, 'sddefault'),
    getThumbnailUrl(videoId, 'hqdefault'),
  ];
}

/**
 * Options for generating embed URL
 */
export interface EmbedUrlOptions {
  autoplay?: boolean;
  controls?: boolean;
  modestBranding?: boolean;
  loop?: boolean;
  mute?: boolean;
  start?: number; // Start time in seconds
  end?: number; // End time in seconds
}

/**
 * Get optimized YouTube embed URL with parameters
 */
export function getOptimizedEmbedUrl(
  videoId: string,
  options: EmbedUrlOptions = {}
): string {
  if (!videoId) return '';

  const params = new URLSearchParams({
    // Core parameters
    rel: '0', // No related videos from other channels
    modestbranding: options.modestBranding !== false ? '1' : '0',
    controls: options.controls !== false ? '1' : '0',

    // Performance & UX
    iv_load_policy: '3', // No annotations
    playsinline: '1', // Inline playback on mobile
    fs: '1', // Allow fullscreen

    // Privacy
    enablejsapi: '0', // No JS API needed
  });

  // Optional parameters
  if (options.autoplay) {
    params.set('autoplay', '1');
  }

  if (options.loop) {
    params.set('loop', '1');
    params.set('playlist', videoId); // Required for loop
  }

  if (options.mute) {
    params.set('mute', '1');
  }

  if (options.start !== undefined && options.start > 0) {
    params.set('start', String(options.start));
  }

  if (options.end !== undefined && options.end > 0) {
    params.set('end', String(options.end));
  }

  return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}

/**
 * Get basic embed URL without optimization parameters
 */
export function getEmbedUrl(videoId: string): string {
  if (!videoId) return '';
  return `https://www.youtube.com/embed/${videoId}`;
}

/**
 * Get YouTube watch URL (for opening in new tab)
 */
export function getWatchUrl(videoId: string): string {
  if (!videoId) return '';
  return `https://www.youtube.com/watch?v=${videoId}`;
}

/**
 * Validate if a string is a valid YouTube video ID
 */
export function isValidVideoId(id: string): boolean {
  return /^[a-zA-Z0-9_-]{11}$/.test(id);
}

/**
 * Check if URL is a YouTube URL
 */
export function isYouTubeUrl(url: string): boolean {
  return (
    url.includes('youtube.com') ||
    url.includes('youtu.be') ||
    isValidVideoId(url)
  );
}
