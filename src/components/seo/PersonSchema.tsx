interface PersonSchemaProps {
  sameAs?: string[];
}

export function PersonSchema({ sameAs = [] }: PersonSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Debora Grataroli',
    description: 'Cantautrice e pianista italiana',
    url: 'https://deboragrataroli.it',
    image: 'https://deboragrataroli.it/images/debora-grataroli.jpg',
    jobTitle: 'Cantautrice e Pianista',
    nationality: 'Italian',
    genre: ['Singer-Songwriter', 'Pop', 'Cantautorato italiano'],
    sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
