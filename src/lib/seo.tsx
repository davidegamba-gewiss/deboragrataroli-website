/**
 * SEO Utilities
 * Centralized SEO configuration and helper functions
 */

import type { Metadata } from 'next';

// =============================================================================
// SITE CONFIGURATION
// =============================================================================

export const SITE_CONFIG = {
  name: 'Debora Grataroli',
  title: 'Debora Grataroli - Cantautrice e Pianista',
  description:
    'Debora Grataroli, cantautrice e pianista italiana. Scopri i brani originali, eventi live, esibizioni e la storia musicale.',
  url: 'https://deboragrataroli.it',
  locale: 'it_IT',
  type: 'website',
  author: 'Debora Grataroli',
  twitterHandle: '@deboragrataroli',
  keywords: [
    'Debora Grataroli',
    'cantautrice',
    'pianista',
    'musica italiana',
    'cantante italiana',
    'musica originale',
    'concerti',
    'eventi musicali',
  ],
} as const;

// =============================================================================
// IMAGE CONFIGURATION
// =============================================================================

export const OG_IMAGE = {
  default: '/og-image-default.jpg',
  width: 1200,
  height: 630,
  alt: 'Debora Grataroli - Cantautrice e Pianista',
} as const;

// =============================================================================
// METADATA GENERATORS
// =============================================================================

/**
 * Generate base metadata for the site
 */
export function generateBaseMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: {
      default: SITE_CONFIG.title,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description: SITE_CONFIG.description,
    keywords: [...SITE_CONFIG.keywords],
    authors: [{ name: SITE_CONFIG.author }],
    creator: SITE_CONFIG.author,
    publisher: SITE_CONFIG.author,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: SITE_CONFIG.locale,
      url: SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      images: [
        {
          url: OG_IMAGE.default,
          width: OG_IMAGE.width,
          height: OG_IMAGE.height,
          alt: OG_IMAGE.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE_CONFIG.title,
      description: SITE_CONFIG.description,
      images: [OG_IMAGE.default],
      creator: SITE_CONFIG.twitterHandle,
    },
    alternates: {
      canonical: SITE_CONFIG.url,
    },
    verification: {
      // Add verification codes when available
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
    },
  };
}

/**
 * Options for generating page metadata
 */
export interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: {
    url: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  type?: 'website' | 'article' | 'profile' | 'music.song' | 'music.album';
  noIndex?: boolean;
}

/**
 * Generate metadata for a specific page
 */
export function generatePageMetadata(options: PageMetadataOptions): Metadata {
  const {
    title,
    description,
    path,
    keywords = [],
    image,
    type = 'website',
    noIndex = false,
  } = options;

  const url = `${SITE_CONFIG.url}${path}`;
  const ogImage = image
    ? {
        url: image.url.startsWith('http') ? image.url : `${SITE_CONFIG.url}${image.url}`,
        width: image.width || OG_IMAGE.width,
        height: image.height || OG_IMAGE.height,
        alt: image.alt || title,
      }
    : {
        url: `${SITE_CONFIG.url}${OG_IMAGE.default}`,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        alt: OG_IMAGE.alt,
      };

  return {
    title,
    description,
    keywords: [...SITE_CONFIG.keywords, ...keywords],
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type,
      locale: SITE_CONFIG.locale,
      url,
      siteName: SITE_CONFIG.name,
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_CONFIG.name}`,
      description,
      images: [ogImage.url],
      creator: SITE_CONFIG.twitterHandle,
    },
    alternates: {
      canonical: url,
    },
  };
}

// =============================================================================
// STRUCTURED DATA (JSON-LD)
// =============================================================================

/**
 * Generate Person structured data for the artist
 */
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    image: `${SITE_CONFIG.url}${OG_IMAGE.default}`,
    sameAs: [
      // Add social media URLs when available
      // 'https://www.instagram.com/deboragrataroli',
      // 'https://www.facebook.com/deboragrataroli',
      // 'https://www.youtube.com/@deboragrataroli',
    ],
    jobTitle: 'Cantautrice e Pianista',
    description: SITE_CONFIG.description,
  };
}

/**
 * Generate MusicGroup structured data
 */
export function generateMusicianSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicGroup',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    image: `${SITE_CONFIG.url}${OG_IMAGE.default}`,
    genre: ['Pop', 'Cantautorato italiano'],
    description: SITE_CONFIG.description,
  };
}

/**
 * Generate WebSite structured data
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    inLanguage: 'it-IT',
    publisher: {
      '@type': 'Person',
      name: SITE_CONFIG.name,
    },
  };
}

/**
 * Generate BreadcrumbList structured data
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}

/**
 * Generate MusicRecording structured data for a song
 */
export function generateSongSchema(song: {
  name: string;
  url: string;
  image?: string;
  datePublished?: string;
  duration?: string; // ISO 8601 format (e.g., "PT3M45S")
  album?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicRecording',
    name: song.name,
    url: song.url.startsWith('http') ? song.url : `${SITE_CONFIG.url}${song.url}`,
    byArtist: {
      '@type': 'MusicGroup',
      name: SITE_CONFIG.name,
    },
    ...(song.image && {
      image: song.image.startsWith('http')
        ? song.image
        : `${SITE_CONFIG.url}${song.image}`,
    }),
    ...(song.datePublished && { datePublished: song.datePublished }),
    ...(song.duration && { duration: song.duration }),
    ...(song.album && {
      inAlbum: {
        '@type': 'MusicAlbum',
        name: song.album,
      },
    }),
  };
}

/**
 * Generate Event structured data
 */
export function generateEventSchema(event: {
  name: string;
  description: string;
  startDate: string; // ISO 8601 format
  endDate?: string;
  location?: {
    name: string;
    address?: string;
  };
  url?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MusicEvent',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    ...(event.endDate && { endDate: event.endDate }),
    performer: {
      '@type': 'MusicGroup',
      name: SITE_CONFIG.name,
    },
    ...(event.location && {
      location: {
        '@type': 'Place',
        name: event.location.name,
        ...(event.location.address && {
          address: {
            '@type': 'PostalAddress',
            streetAddress: event.location.address,
          },
        }),
      },
    }),
    ...(event.url && { url: event.url }),
    ...(event.image && {
      image: event.image.startsWith('http')
        ? event.image
        : `${SITE_CONFIG.url}${event.image}`,
    }),
  };
}

/**
 * Generate Article structured data for press articles
 */
export function generateArticleSchema(article: {
  headline: string;
  description: string;
  datePublished: string;
  publisher: string;
  url?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: article.headline,
    description: article.description,
    datePublished: article.datePublished,
    publisher: {
      '@type': 'Organization',
      name: article.publisher,
    },
    about: {
      '@type': 'Person',
      name: SITE_CONFIG.name,
    },
    ...(article.url && { url: article.url }),
    ...(article.image && {
      image: article.image.startsWith('http')
        ? article.image
        : `${SITE_CONFIG.url}${article.image}`,
    }),
  };
}

// =============================================================================
// HELPER COMPONENTS
// =============================================================================

/**
 * JSON-LD Script component for structured data
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const jsonLd = Array.isArray(data) ? data : [data];

  return (
    <>
      {jsonLd.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}
