'use client';

import EventoCard from './EventoCard';
import type { EventoDataFormat } from '@/lib/content';

export interface EventiFuturiProps {
  eventi: EventoDataFormat[];
}

export default function EventiFuturi({ eventi }: EventiFuturiProps) {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-semibold text-neutral-dark mb-8">
        Prossimi Eventi
      </h2>

      {eventi.length === 0 ? (
        <div className="text-center py-8 px-4 bg-neutral-light/30 rounded-lg">
          <p className="text-gray-500 text-base">
            Nessun evento in programma al momento.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Torna presto per scoprire le prossime date!
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {eventi.map((evento) => (
            <EventoCard
              key={evento.id}
              id={evento.id}
              titolo={evento.titolo}
              luogo={evento.luogo}
              data={evento.data}
              ora={evento.ora}
              descrizione={evento.descrizione}
              upcoming={true}
            />
          ))}
        </div>
      )}
    </section>
  );
}
