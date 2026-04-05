'use client';

import { FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { formatData } from '@/utils/eventiData';

export interface EventoCardProps {
  id: string;
  titolo: string;
  luogo?: string;
  data?: string; // YYYY-MM-DD format
  ora?: string; // HH:mm format
  descrizione: string;
  upcoming?: boolean; // Different color for future events
}

export default function EventoCard({
  titolo,
  luogo,
  data,
  ora,
  descrizione,
  upcoming = false,
}: EventoCardProps) {
  return (
    <article
      className={`
        flex flex-col sm:flex-row gap-4 sm:gap-6 p-5 sm:p-6
        rounded border transition-all duration-200
        ${
          upcoming
            ? 'bg-neutral-light/50 border-neutral-light border-l-4 border-l-purple-medium hover:bg-neutral-light hover:shadow-md'
            : 'bg-white border-neutral-light border-l-4 border-l-gray-300 hover:bg-neutral-light/30 hover:shadow-sm'
        }
      `}
    >
      {/* Date Column */}
      {data && (
        <div className="flex-shrink-0 sm:w-32 sm:text-center">
          <time
            dateTime={data}
            className={`
              flex items-center sm:flex-col gap-2 sm:gap-1
              text-sm font-semibold
              ${upcoming ? 'text-purple-medium' : 'text-gray-500'}
            `}
          >
            <FaCalendarAlt
              className="w-4 h-4 sm:w-5 sm:h-5 sm:mb-1"
              aria-hidden="true"
            />
            <span className="sm:text-base">{formatData(data)}</span>
          </time>
          {ora && (
            <div className="flex items-center sm:justify-center gap-2 mt-1 text-xs text-gray-500">
              <FaClock className="w-3 h-3" aria-hidden="true" />
              <span>{ora}</span>
            </div>
          )}
        </div>
      )}

      {/* Content Column */}
      <div className="flex-grow">
        <h3
          className={`
            text-lg font-semibold mb-2
            ${upcoming ? 'text-neutral-dark' : 'text-gray-700'}
          `}
        >
          {titolo}
        </h3>

        {luogo && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <FaMapMarkerAlt className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
            <span>{luogo}</span>
          </div>
        )}

        {descrizione && (
          <p className="text-sm text-gray-600 line-clamp-2 mt-3">
            {descrizione}
          </p>
        )}
      </div>
    </article>
  );
}
