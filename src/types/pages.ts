/**
 * Page Types
 *
 * Type definitions for page data and routing.
 */

/**
 * Brano Page Params
 *
 * URL parameters for the brano detail page.
 */
export interface BranoPageParams {
  slug: string;
}

/**
 * EventoData
 *
 * Data structure for an event.
 */
export interface EventoData {
  id: string;
  titolo: string;
  luogo: string;
  data: string;
  ora?: string;
  descrizione: string;
  immagine?: string;
  linkBiglietti?: string;
}

/**
 * BranoData
 *
 * Data structure for a song/track.
 */
export interface BranoData {
  id: string;
  slug: string;
  titolo: string;
  cover: string;
  youtubeUrl?: string;
  spotifyUrl?: string;
  categoria: string;
  descrizione: string;
  lyrics?: string;
  dataRilascio?: string;
}

/**
 * EsibizioneData
 *
 * Data structure for a video performance.
 */
export interface EsibizioneData {
  id: string;
  titolo: string;
  youtubeUrl: string;
  thumbnail: string;
  data: string;
  luogo?: string;
  categoria: 'live' | 'studio' | 'cover' | 'originale';
}

/**
 * ArticoloStampaData
 *
 * Data structure for a press article.
 */
export interface ArticoloStampaData {
  id: string;
  titolo: string;
  testata: string;
  data: string;
  url: string;
  estratto: string;
  immagine?: string;
}

/**
 * PageMetadata
 *
 * Common metadata structure for pages.
 */
export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}
