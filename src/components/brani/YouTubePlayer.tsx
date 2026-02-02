'use client';

import { useState, useCallback } from 'react';
import { FaPlay } from 'react-icons/fa';

export interface YouTubePlayerProps {
  url: string;
  title: string;
  lazy?: boolean;
}

export default function YouTubePlayer({
  url,
  title,
  lazy = true,
}: YouTubePlayerProps) {
  const [isLoaded, setIsLoaded] = useState(!lazy);

  // Extract video ID from URL
  const getVideoId = useCallback((videoUrl: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
      /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    ];

    for (const pattern of patterns) {
      const match = videoUrl.match(pattern);
      if (match && match[1]) return match[1];
    }

    return null;
  }, []);

  const videoId = getVideoId(url);
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`
    : url;
  const thumbnailUrl = videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : null;

  const handleLoad = () => {
    setIsLoaded(true);
  };

  if (!isLoaded && thumbnailUrl) {
    return (
      <div className="mb-10">
        <button
          onClick={handleLoad}
          className="relative w-full aspect-video bg-black rounded-lg overflow-hidden group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2"
          aria-label={`Riproduci video: ${title}`}
        >
          {/* Thumbnail */}
          <img
            src={thumbnailUrl}
            alt={`Anteprima video ${title}`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 transition-opacity duration-300 group-hover:bg-black/40" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-purple-medium rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg">
              <FaPlay className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" />
            </div>
          </div>

          {/* Label */}
          <span className="absolute bottom-4 left-4 text-white text-sm font-medium bg-black/50 px-3 py-1 rounded">
            Clicca per riprodurre
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden">
        <iframe
          src={embedUrl}
          title={title}
          width="100%"
          height="100%"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full animate-fade-in"
        />
      </div>
    </div>
  );
}
