'use client';

import EventoCard from './EventoCard';
import type { EventiPassatiGroup } from '@/lib/content';

export interface EventiPassatiProps {
  gruppi: EventiPassatiGroup[];
  /** Section title from CMS */
  title?: string;
}

export default function EventiPassati({ gruppi, title }: EventiPassatiProps) {
  const sectionTitle = title && title.trim() ? title : 'Eventi Passati';

  if (gruppi.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-2xl font-semibold text-neutral-dark mb-8 mt-16">
        {sectionTitle}
      </h2>

      <div className="space-y-12">
        {gruppi.map((gruppo) => (
          <div key={`${gruppo.anno}-${gruppo.nomeTour}`}>
            {/* Year/Tour Header */}
            <h3 className="text-xl font-semibold text-purple-dark mb-6 pb-4 border-b-2 border-purple-light">
              {gruppo.anno}
              {gruppo.nomeTour && gruppo.nomeTour !== 'Altri Eventi' && (
                <span className="text-purple-medium font-normal">
                  {' '}
                  - {gruppo.nomeTour}
                </span>
              )}
            </h3>

            {/* Events in this group */}
            <div className="space-y-4">
              {gruppo.eventi.map((evento) => (
                <EventoCard
                  key={evento.id}
                  id={evento.id}
                  titolo={evento.titolo}
                  luogo={evento.luogo}
                  data={evento.data}
                  ora={evento.ora}
                  descrizione={evento.descrizione}
                  upcoming={false}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
