'use client';

import Image from 'next/image';
import { FaPlay } from 'react-icons/fa';
import { getYouTubeThumbnail, getYouTubeWatchUrl } from '@/utils/esibizioniData';
import type { CategoriaEsibizioneDisplay } from '@/lib/content';

export interface VideoCardProps {
  id: string;
  titolo: string;
  youtubeUrl: string;
  descrizione?: string;
  anno: number;
  categoria: CategoriaEsibizioneDisplay;
  playlist?: string;
}

export default function VideoCard({
  titolo,
  youtubeUrl,
  anno,
  categoria,
  playlist,
}: VideoCardProps) {
  const thumbnailUrl = getYouTubeThumbnail(youtubeUrl, 'hqdefault');
  const watchUrl = getYouTubeWatchUrl(youtubeUrl);

  return (
    <article className="group">
      {/* Video Thumbnail */}
      <a
        href={watchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block aspect-video overflow-hidden rounded-lg bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2"
        aria-label={`Guarda "${titolo}" su YouTube`}
      >
        {/* Thumbnail Image */}
        {thumbnailUrl && (
          <Image
            src={thumbnailUrl}
            alt={`Anteprima di ${titolo}`}
            fill
            loading="lazy"
            quality={75}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-300 group-hover:bg-black/40">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
            <FaPlay className="ml-1 h-6 w-6 text-purple-dark" aria-hidden="true" />
          </div>
        </div>

        {/* Year & Category Badge */}
        <div className="absolute left-3 top-3 rounded bg-black/70 px-3 py-1.5 text-xs font-semibold text-white">
          {anno} • {categoria}
        </div>

        {/* Playlist Badge */}
        {playlist && (
          <div className="absolute bottom-3 left-3 rounded bg-purple-medium px-3 py-1.5 text-xs font-medium text-white">
            {playlist}
          </div>
        )}
      </a>

      {/* Title */}
      <h3 className="mt-4 line-clamp-2 text-sm font-semibold text-neutral-dark transition-colors duration-200 group-hover:text-purple-medium md:text-base">
        {titolo}
      </h3>
    </article>
  );
}
