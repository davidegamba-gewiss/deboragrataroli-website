'use client';

import BranoCard from './BranoCard';
import type { BranoDataFormat } from '@/lib/content';

export interface BranoListGridProps {
  brani: BranoDataFormat[];
}

export default function BranoListGrid({ brani }: BranoListGridProps) {
  if (!brani || brani.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-neutral-dark/60 text-lg">
          Nessun brano disponibile al momento.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
      {brani.map((brano) => (
        <BranoCard
          key={brano.id}
          id={brano.id}
          titolo={brano.titolo}
          slug={brano.slug}
          cover={brano.cover}
          categoria={brano.categoria}
          descrizione={brano.descrizione}
        />
      ))}
    </div>
  );
}
