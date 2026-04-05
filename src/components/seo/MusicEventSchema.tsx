interface MusicEventProps {
  event: {
    titolo?: string;
    data?: string;
    luogo?: string;
    [key: string]: unknown;
  };
}

export function MusicEventSchema({ event }: MusicEventProps) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    performer: {
      '@type': 'Person',
      name: 'Debora Grataroli',
    },
    organizer: {
      '@type': 'Person',
      name: 'Debora Grataroli',
    },
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  };

  if (event.titolo) schema.name = event.titolo;
  if (event.data) schema.startDate = event.data;
  if (event.luogo) {
    schema.location = {
      '@type': 'Place',
      name: event.luogo,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
