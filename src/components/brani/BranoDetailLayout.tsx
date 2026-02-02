'use client';

import Image from 'next/image';
import YouTubePlayer from './YouTubePlayer';
import SpotifyPlayer from './SpotifyPlayer';
import type { BranoData } from '@/data/brani';

export interface BranoDetailLayoutProps {
  brano: BranoData;
}

export default function BranoDetailLayout({ brano }: BranoDetailLayoutProps) {
  return (
    <article className="max-w-4xl mx-auto">
      {/* Cover Image */}
      <div className="relative w-full max-w-md mx-auto mb-10 aspect-square rounded-lg overflow-hidden shadow-xl">
        <Image
          src={brano.cover}
          alt={`Cover di ${brano.titolo}`}
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
            Descrizione
          </h2>
          <p className="text-neutral-dark leading-relaxed">
            {brano.descrizione}
          </p>
        </section>
      )}

      {/* Lyrics */}
      {brano.lyrics && (
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-purple-dark mb-4">
            Testo della canzone
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
              alt={`Immagine aggiuntiva di ${brano.titolo}`}
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
