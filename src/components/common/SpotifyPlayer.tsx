'use client';

import { useState, useEffect, useRef } from 'react';
import { FaSpotify } from 'react-icons/fa';
import {
  extractSpotifyId,
  extractSpotifyType,
  getSpotifyEmbedUrl,
  getSpotifyWebUrl,
  isValidSpotifyId,
  getRecommendedHeight,
  type SpotifyContentType,
} from '@/utils/spotifyUtils';

export interface SpotifyPlayerProps {
  /** Spotify embed URL, track URL, or track ID */
  url: string;
  /** Title for accessibility */
  title?: string;
  /** Content type (default: auto-detected or 'track') */
  type?: SpotifyContentType;
  /** Player height in pixels (default: auto based on type) */
  height?: number;
  /** Compact layout - always 80px height (default: true) */
  compact?: boolean;
  /** Theme: 'dark' or 'light' (default: 'dark') */
  theme?: 'dark' | 'light';
  /** Additional CSS classes */
  className?: string;
}

export default function SpotifyPlayer({
  url,
  title = 'Spotify Player',
  type,
  height,
  compact = true,
  theme = 'dark',
  className = '',
}: SpotifyPlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Extract ID and type from URL
  const spotifyId = extractSpotifyId(url);
  const contentType = type || extractSpotifyType(url);
  const isValid = isValidSpotifyId(spotifyId);

  // Calculate height
  const playerHeight = height || getRecommendedHeight(contentType, compact);

  // Generate URLs
  const embedUrl = getSpotifyEmbedUrl(spotifyId, contentType, { theme });
  const webUrl = getSpotifyWebUrl(spotifyId, contentType);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle iframe load
  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Handle iframe error
  const handleError = () => {
    setHasError(true);
  };

  // Invalid ID - show fallback
  if (!isValid || hasError) {
    return (
      <div className={`my-8 ${className}`}>
        <a
          href={webUrl || 'https://open.spotify.com'}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center gap-3 px-5 py-3 rounded-lg
            border border-[#1DB954] text-[#1DB954]
            hover:bg-[#1DB954] hover:text-white
            transition-colors duration-200
            font-semibold text-sm
          "
          aria-label={`Ascolta ${title} su Spotify`}
        >
          <FaSpotify className="w-5 h-5" aria-hidden="true" />
          Ascolta su Spotify
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
        {hasError && (
          <p className="mt-2 text-xs text-gray-500">
            Player non disponibile, clicca per ascoltare su Spotify
          </p>
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative my-8 w-full ${className}`}>
      {/* Loading Skeleton */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-gray-200 rounded-xl animate-pulse"
          style={{ height: playerHeight }}
          aria-hidden="true"
        />
      )}

      {/* Spotify Embed */}
      {isVisible && (
        <iframe
          src={embedUrl}
          title={title}
          width="100%"
          height={playerHeight}
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          onLoad={handleLoad}
          onError={handleError}
          className={`
            rounded-xl transition-opacity duration-300
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
          style={{ borderRadius: '12px' }}
        />
      )}

      {/* Fallback link for SEO and accessibility */}
      <noscript>
        <a
          href={webUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1DB954] hover:underline"
        >
          Ascolta {title} su Spotify
        </a>
      </noscript>
    </div>
  );
}
