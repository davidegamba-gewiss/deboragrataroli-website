'use client';

import Image from 'next/image';
import { FaExternalLinkAlt } from 'react-icons/fa';
import { formatDataStampa } from '@/utils/stampaData';

export interface ArticoloCardProps {
  id: string;
  titolo: string;
  testata: string;
  dataPubblicazione: string; // YYYY-MM-DD format
  estratto: string;
  immagine: string;
  linkEsterno?: string;
  ordine?: number;
}

export default function ArticoloCard({
  titolo,
  testata,
  dataPubblicazione,
  estratto,
  immagine,
  linkEsterno,
}: ArticoloCardProps) {
  return (
    <article className="group h-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-medium/10">
      {/* Article Image */}
      <div className="relative aspect-video overflow-hidden bg-neutral-light">
        <Image
          src={immagine}
          alt={`${titolo} – ${testata}`}
          fill
          loading="lazy"
          quality={80}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="flex flex-col p-6">
        {/* Testata & Date */}
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-medium">
            {testata}
          </span>
          <time
            dateTime={dataPubblicazione}
            className="text-xs text-gray-400"
          >
            {formatDataStampa(dataPubblicazione)}
          </time>
        </div>

        {/* Title - H2 for SEO (each article is autonomous content) */}
        <h2 className="mb-3 line-clamp-2 text-base font-semibold text-neutral-dark transition-colors duration-200 group-hover:text-purple-medium md:text-lg">
          {titolo}
        </h2>

        {/* Excerpt */}
        <p className="mb-4 line-clamp-3 flex-grow text-sm leading-relaxed text-gray-600">
          {estratto}
        </p>

        {/* Read Article Button - always show if link exists */}
        <a
          href={linkEsterno || '#'}
          target={linkEsterno ? '_blank' : undefined}
          rel={linkEsterno ? 'noopener noreferrer' : undefined}
          className={`inline-flex items-center justify-center gap-2 rounded border px-4 py-2.5 text-xs font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-light/50 ${
            linkEsterno
              ? 'border-purple-medium text-purple-medium hover:bg-purple-medium hover:text-white'
              : 'border-gray-300 text-gray-400 cursor-not-allowed'
          }`}
          aria-label={linkEsterno ? `Leggi l'articolo "${titolo}" su ${testata}` : 'Link non disponibile'}
          onClick={linkEsterno ? undefined : (e) => e.preventDefault()}
        >
          {linkEsterno ? <>Leggi l&apos;articolo</> : 'Link non disponibile'}
          <FaExternalLinkAlt className="h-3 w-3" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
