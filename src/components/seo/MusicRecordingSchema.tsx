import { SITE_CONFIG } from '@/lib/seo';

interface MusicRecordingProps {
  brano: {
    titolo: string;
    slug: string;
    cover?: string;
    descrizione?: string;
    categoria?: string;
    [key: string]: unknown;
  };
}

export function MusicRecordingSchema({ brano }: MusicRecordingProps) {
  const url = `${SITE_CONFIG.url}/brani/${brano.slug}`;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'MusicRecording',
    name: brano.titolo,
    byArtist: {
      '@type': 'Person',
      name: 'Debora Grataroli',
    },
    url,
  };

  if (brano.cover) {
    schema.image = brano.cover.startsWith('http')
      ? brano.cover
      : `${SITE_CONFIG.url}${brano.cover}`;
  }

  if (brano.descrizione) schema.description = brano.descrizione;

  if (brano.categoria) {
    schema.inAlbum = {
      '@type': 'MusicAlbum',
      name: brano.categoria,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
