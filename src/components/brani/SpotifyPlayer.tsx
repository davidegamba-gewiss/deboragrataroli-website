'use client';

export interface SpotifyPlayerProps {
  url: string;
  title?: string;
  compact?: boolean;
}

export default function SpotifyPlayer({
  url,
  title = 'Spotify Player',
  compact = true,
}: SpotifyPlayerProps) {
  // Extract track ID from URL
  const getTrackId = (spotifyUrl: string): string | null => {
    const patterns = [
      /(?:spotify\.com\/embed\/track\/)([a-zA-Z0-9]{22})/,
      /(?:spotify\.com\/track\/)([a-zA-Z0-9]{22})/,
    ];

    for (const pattern of patterns) {
      const match = spotifyUrl.match(pattern);
      if (match && match[1]) return match[1];
    }

    return null;
  };

  const trackId = getTrackId(url);
  const embedUrl = trackId
    ? `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`
    : url;

  const height = compact ? 80 : 352;

  return (
    <div className="mb-10">
      <iframe
        src={embedUrl}
        title={title}
        width="100%"
        height={height}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-xl"
        style={{ borderRadius: '12px' }}
      />
    </div>
  );
}
