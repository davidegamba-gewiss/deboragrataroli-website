export function WebSiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Debora Grataroli',
    url: 'https://deboragrataroli.it',
    description: 'Sito ufficiale di Debora Grataroli, cantautrice e pianista italiana',
    inLanguage: 'it-IT',
    author: {
      '@type': 'Person',
      name: 'Debora Grataroli',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
