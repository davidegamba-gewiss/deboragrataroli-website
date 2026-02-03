'use client';

import { useState, useCallback, KeyboardEvent } from 'react';
import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import {
  extractYouTubeId,
  getThumbnailUrl,
  getOptimizedEmbedUrl,
  isValidVideoId,
} from '@/utils/youtubeUtils';

export interface YouTubePlayerProps {
  /** Full embed URL, watch URL, or video ID */
  url: string;
  /** Video title for accessibility */
  title: string;
  /** Enable lazy loading (default: true) */
  lazy?: boolean;
  /** Aspect ratio (default: '16:9') */
  aspectRatio?: '16:9' | '4:3';
  /** Allow fullscreen (default: true) */
  allowFullScreen?: boolean;
  /** Autoplay when loaded (default: false) */
  autoplay?: boolean;
  /** Show controls (default: true) */
  controls?: boolean;
  /** Hide YouTube logo (default: true) */
  modestBranding?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export default function YouTubePlayer({
  url,
  title,
  lazy = true,
  aspectRatio = '16:9',
  allowFullScreen = true,
  autoplay = false,
  controls = true,
  modestBranding = true,
  className = '',
}: YouTubePlayerProps) {
  const [isLoaded, setIsLoaded] = useState(!lazy);
  const [thumbnailError, setThumbnailError] = useState(false);

  // Extract video ID from URL
  const videoId = extractYouTubeId(url);
  const isValid = isValidVideoId(videoId);

  // Generate URLs
  const thumbnailUrl = getThumbnailUrl(videoId, 'hqdefault');
  const embedUrl = getOptimizedEmbedUrl(videoId, {
    autoplay: lazy ? true : autoplay, // Autoplay after lazy load click
    controls,
    modestBranding,
  });

  // Handle play button click
  const handlePlayClick = useCallback(() => {
    setIsLoaded(true);
  }, []);

  // Handle keyboard interaction
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handlePlayClick();
      }
    },
    [handlePlayClick]
  );

  // Handle thumbnail load error
  const handleThumbnailError = useCallback(() => {
    setThumbnailError(true);
  }, []);

  // Aspect ratio classes
  const aspectClass = aspectRatio === '16:9' ? 'aspect-video' : 'aspect-[4/3]';

  // Invalid video ID state
  if (!isValid) {
    return (
      <div
        className={`
          relative w-full ${aspectClass} overflow-hidden rounded-lg bg-neutral-dark
          flex items-center justify-center ${className}
        `}
      >
        <p className="text-white/70 text-sm text-center px-4">
          Video non disponibile
        </p>
      </div>
    );
  }

  // Loaded state - show iframe
  if (isLoaded) {
    return (
      <div
        className={`
          relative w-full ${aspectClass} overflow-hidden rounded-lg bg-black
          shadow-md transition-shadow duration-300 hover:shadow-lg ${className}
        `}
      >
        <iframe
          src={embedUrl}
          title={title}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen={allowFullScreen}
          className="absolute inset-0 w-full h-full"
          loading="lazy"
        />
      </div>
    );
  }

  // Placeholder state - show thumbnail with play button
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Riproduci video: ${title}`}
      onClick={handlePlayClick}
      onKeyDown={handleKeyDown}
      className={`
        group relative w-full ${aspectClass} overflow-hidden rounded-lg bg-black
        cursor-pointer shadow-md transition-all duration-300
        hover:shadow-xl focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-purple focus-visible:ring-offset-2 ${className}
      `}
    >
      {/* Thumbnail */}
      {!thumbnailError ? (
        <Image
          src={thumbnailUrl}
          alt={`Anteprima: ${title}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 800px"
          className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:brightness-75"
          onError={handleThumbnailError}
          priority={false}
        />
      ) : (
        // Fallback gradient if thumbnail fails
        <div className="absolute inset-0 bg-gradient-to-br from-purple-dark to-purple-medium" />
      )}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/50" />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="
            flex h-16 w-16 md:h-20 md:w-20 items-center justify-center
            rounded-full bg-white/90 shadow-lg
            transition-all duration-300
            group-hover:scale-110 group-hover:bg-white
          "
        >
          <FaPlay
            className="ml-1 h-6 w-6 md:h-7 md:w-7 text-purple-dark"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Title overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        <p className="truncate text-sm text-white/90 font-medium">{title}</p>
        <p className="text-xs text-white/60 mt-1">Clicca per riprodurre</p>
      </div>
    </div>
  );
}
