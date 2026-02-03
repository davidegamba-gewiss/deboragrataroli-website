'use client';

import SpotifyPlayerCommon from '@/components/common/SpotifyPlayer';

// Re-export props interface for backward compatibility
export interface SpotifyPlayerProps {
  url: string;
  title?: string;
  compact?: boolean;
}

/**
 * SpotifyPlayer wrapper for brani pages
 * Uses the common SpotifyPlayer component with default styling
 */
export default function SpotifyPlayer({
  url,
  title = 'Spotify Player',
  compact = true,
}: SpotifyPlayerProps) {
  return (
    <div className="mb-10">
      <SpotifyPlayerCommon
        url={url}
        title={title}
        compact={compact}
        type="track"
        theme="dark"
        className="my-0"
      />
    </div>
  );
}
