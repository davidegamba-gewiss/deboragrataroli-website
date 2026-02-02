'use client';

import ArticoloCard from './ArticoloCard';
import type { ArticoloStampaData } from '@/data/stampa';

export interface StampaGridProps {
  articoli: ArticoloStampaData[];
}

export default function StampaGrid({ articoli }: StampaGridProps) {
  if (!articoli || articoli.length === 0) {
    return (
      <div className="py-12 text-center">
        <p className="text-base text-gray-500">
          Nessun articolo al momento.
        </p>
        <p className="mt-2 text-sm text-gray-400">
          Torna presto per scoprire le ultime novità dalla stampa!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {articoli.map((articolo) => (
        <ArticoloCard
          key={articolo.id}
          id={articolo.id}
          titolo={articolo.titolo}
          testata={articolo.testata}
          dataPubblicazione={articolo.dataPubblicazione}
          estratto={articolo.estratto}
          immagine={articolo.immagine}
          linkEsterno={articolo.linkEsterno}
          ordine={articolo.ordine}
        />
      ))}
    </div>
  );
}
