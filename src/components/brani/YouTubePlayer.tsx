'use client';

import YouTubePlayerCommon from '@/components/common/YouTubePlayer';

// Re-export props interface for backward compatibility
export interface YouTubePlayerProps {
  url: string;
  title: string;
  lazy?: boolean;
}

/**
 * YouTubePlayer wrapper for brani pages
 * Uses the common YouTubePlayer component with default styling
 */
export default function YouTubePlayer({ url, title, lazy = true }: YouTubePlayerProps) {
  return (
    <div className="mb-10">
      <YouTubePlayerCommon
        url={url}
        title={title}
        lazy={lazy}
        aspectRatio="16:9"
        allowFullScreen={true}
        controls={true}
        modestBranding={true}
      />
    </div>
  );
}
