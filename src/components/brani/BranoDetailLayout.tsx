'use client';

import Image from 'next/image';
import YouTubePlayer from './YouTubePlayer';
import SpotifyPlayer from './SpotifyPlayer';
import type { BranoDataFormat } from '@/lib/content';

export interface BranoDetailLayoutProps {
  brano: BranoDataFormat;
  /** Label for description section from CMS */
  descriptionLabel?: string;
  /** Label for lyrics section from CMS */
  lyricsLabel?: string;
}

export default function BranoDetailLayout({
  brano,
  descriptionLabel,
  lyricsLabel
}: BranoDetailLayoutProps) {
  const descLabel = descriptionLabel && descriptionLabel.trim() ? descriptionLabel : 'Descrizione';
  const lyricLabel = lyricsLabel && lyricsLabel.trim() ? lyricsLabel : 'Testo della canzone';
  return (
    <article className="max-w-4xl mx-auto">
      {/* Cover Image */}
      <div className="relative w-full max-w-md mx-auto mb-10 aspect-square rounded-lg overflow-hidden shadow-xl">
        <Image
          src={brano.cover}
          alt={`Cover ufficiale del brano ${brano.titolo} di Debora Grataroli`}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover"
          priority
        />
      </div>

      {/* Brano Info */}
      <header className="text-center mb-10">
        <span className="inline-block text-sm font-medium text-purple-medium uppercase tracking-wider mb-3">
          {brano.categoria}
        </span>
        <h1 className="font-playfair text-4xl md:text-5xl font-semibold text-purple-dark">
          {brano.titolo}
        </h1>
      </header>

      {/* YouTube Player */}
      {brano.youtubeUrl && (
        <section aria-label="Video YouTube">
          <YouTubePlayer
            url={brano.youtubeUrl}
            title={`Video di ${brano.titolo}`}
            lazy={true}
          />
        </section>
      )}

      {/* Spotify Player */}
      {brano.spotifyUrl && (
        <section aria-label="Ascolta su Spotify">
          <SpotifyPlayer
            url={brano.spotifyUrl}
            title={`${brano.titolo} su Spotify`}
          />
        </section>
      )}

      {/* Descrizione */}
      {brano.descrizione && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-purple-dark mb-4">
            {descLabel}
          </h2>
          <div className="text-neutral-dark leading-relaxed whitespace-pre-line">
            {brano.descrizione}
          </div>
        </section>
      )}

      {/* Lyrics */}
      {brano.lyrics && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-purple-dark mb-4">
            {lyricLabel}
          </h2>
          <div className="bg-neutral-light/50 p-5 rounded border-l-4 border-purple-light">
            <pre className="font-sans text-sm text-neutral-dark whitespace-pre-wrap leading-loose">
              {brano.lyrics}
            </pre>
          </div>
        </section>
      )}

      {/* Extra Image */}
      {brano.imagineExtra && (
        <section className="mt-10">
          <div className="relative w-full max-h-96 rounded-lg overflow-hidden">
            <Image
              src={brano.imagineExtra}
              alt={`${brano.titolo} – Debora Grataroli`}
              width={1000}
              height={400}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </section>
      )}
    </article>
  );
}
