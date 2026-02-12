/**
 * Content Loading Utilities
 *
 * Loads and parses markdown content from the CMS content folder.
 * Used to integrate Decap CMS content with Next.js pages.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Base content directory
const CONTENT_DIR = path.join(process.cwd(), 'content');

/**
 * Generic content item with frontmatter and body
 */
export interface ContentItem<T = Record<string, unknown>> {
  frontmatter: T;
  content: string; // Raw markdown content
  htmlContent: string; // Parsed HTML content
  slug: string;
}

/**
 * Page frontmatter structure (matches CMS config)
 */
export interface PageFrontmatter {
  title: string;
  seo_description?: string;
  hero_image?: string;
  hero_subtitle?: string;
}

/**
 * Brano frontmatter structure
 */
export interface BranoFrontmatter {
  title: string;
  cover?: string;
  youtube_url?: string;
  spotify_url?: string;
  categoria: 'singolo' | 'album' | 'ep' | 'collaborazione' | 'cover';
  data_pubblicazione?: string;
  descrizione?: string;
  lyrics?: string;
  immagine_extra?: string;
  featured?: boolean;
}

/**
 * Concerto frontmatter structure
 * data_evento is now a single datetime field in ISO format: YYYY-MM-DDTHH:mm
 */
export interface ConcertoFrontmatter {
  title: string;
  luogo: string;
  citta: string;
  /** Single datetime field: YYYY-MM-DDTHH:mm (e.g., "2025-06-02T16:00") */
  data_evento: string;
  anno: number;
  tour?: string;
  descrizione?: string;
  link_biglietti?: string;
  prezzo?: string;
  confermato: boolean;
}

/**
 * Esibizione frontmatter structure
 */
export interface EsibizioneFrontmatter {
  title: string;
  youtube_url: string;
  thumbnail?: string;
  descrizione?: string;
  anno: number;
  categoria: 'live' | 'studio' | 'cover' | 'acustico' | 'tv_radio';
  playlist?: string;
  evento?: string;
  featured?: boolean;
}

/**
 * Rassegna Stampa frontmatter structure
 */
export interface ArticoloFrontmatter {
  title: string;
  testata: string;
  data_pubblicazione: string;
  estratto?: string;
  link_esterno?: string;
  immagine?: string;
  pdf?: string;
  ordine: number;
  featured?: boolean;
}

/**
 * Settings structures
 */
export interface GeneralSettings {
  site_name?: string;
  tagline?: string;
  site_description?: string;
  logo?: string;
  favicon?: string;
}

export interface ContactSettings {
  email?: string;
  telefono?: string;
  indirizzo?: string;
  contact_form_enabled?: boolean;
}

export interface SocialSettings {
  instagram?: string;
  facebook?: string;
  youtube?: string;
  spotify?: string;
  tiktok?: string;
  twitter?: string;
  linkedin?: string;
}

export interface ColorSettings {
  primary_color?: string;
  secondary_color?: string;
  accent_color?: string;
  text_color?: string;
  background_color?: string;
}

/**
 * Convert markdown to HTML
 */
async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

/**
 * Read and parse a single markdown file
 */
export async function getContentFile<T>(
  collection: string,
  filename: string
): Promise<ContentItem<T> | null> {
  const filePath = path.join(CONTENT_DIR, collection, `${filename}.md`);

  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`Content file not found: ${filePath}`);
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const htmlContent = await markdownToHtml(content);

    return {
      frontmatter: data as T,
      content,
      htmlContent,
      slug: filename,
    };
  } catch (error) {
    console.error(`Error reading content file ${filePath}:`, error);
    return null;
  }
}

/**
 * Get all content items from a collection
 */
export async function getCollectionItems<T>(
  collection: string
): Promise<ContentItem<T>[]> {
  const collectionPath = path.join(CONTENT_DIR, collection);

  try {
    if (!fs.existsSync(collectionPath)) {
      console.warn(`Collection not found: ${collectionPath}`);
      return [];
    }

    const files = fs.readdirSync(collectionPath).filter((file) => file.endsWith('.md'));

    const items = await Promise.all(
      files.map(async (file) => {
        const slug = file.replace(/\.md$/, '');
        return getContentFile<T>(collection, slug);
      })
    );

    return items.filter((item): item is ContentItem<T> => item !== null);
  } catch (error) {
    console.error(`Error reading collection ${collection}:`, error);
    return [];
  }
}

// ============================================
// PAGE CONTENT LOADERS
// ============================================

/**
 * Get a page by slug (home, biografia, contatti)
 */
export async function getPage(slug: string): Promise<ContentItem<PageFrontmatter> | null> {
  return getContentFile<PageFrontmatter>('pages', slug);
}

/**
 * Get home page content
 */
export async function getHomePage(): Promise<ContentItem<PageFrontmatter> | null> {
  return getPage('home');
}

/**
 * Get biografia page content
 */
export async function getBiografiaPage(): Promise<ContentItem<PageFrontmatter> | null> {
  return getPage('biografia');
}

/**
 * Get contatti page content
 */
export async function getContattiPage(): Promise<ContentItem<PageFrontmatter> | null> {
  return getPage('contatti');
}

/**
 * Get brani section page content
 */
export async function getBraniPage(): Promise<ContentItem<PageFrontmatter> | null> {
  return getPage('brani');
}

/**
 * Get concerti/eventi section page content
 */
export async function getConcertiPage(): Promise<ContentItem<PageFrontmatter> | null> {
  return getPage('concerti');
}

/**
 * Get esibizioni section page content
 */
export async function getEsibizioniPage(): Promise<ContentItem<PageFrontmatter> | null> {
  return getPage('esibizioni');
}

/**
 * Get rassegna stampa section page content
 */
export async function getRassegnaStampaPage(): Promise<ContentItem<PageFrontmatter> | null> {
  return getPage('rassegna-stampa');
}

// ============================================
// BRANI CONTENT LOADERS
// ============================================

/**
 * Get all brani
 */
export async function getAllBraniFromCMS(): Promise<ContentItem<BranoFrontmatter>[]> {
  const items = await getCollectionItems<BranoFrontmatter>('brani');
  // Sort by date (newest first) or by title
  return items.sort((a, b) => {
    if (a.frontmatter.data_pubblicazione && b.frontmatter.data_pubblicazione) {
      return new Date(b.frontmatter.data_pubblicazione).getTime() -
        new Date(a.frontmatter.data_pubblicazione).getTime();
    }
    return a.frontmatter.title.localeCompare(b.frontmatter.title);
  });
}

/**
 * Get featured brani
 */
export async function getFeaturedBrani(): Promise<ContentItem<BranoFrontmatter>[]> {
  const allBrani = await getAllBraniFromCMS();
  return allBrani.filter((brano) => brano.frontmatter.featured);
}

/**
 * Get a single brano by slug
 */
export async function getBrano(slug: string): Promise<ContentItem<BranoFrontmatter> | null> {
  return getContentFile<BranoFrontmatter>('brani', slug);
}

/**
 * BranoData format for components (matches existing component props)
 */
export interface BranoDataFormat {
  id: string;
  slug: string;
  titolo: string;
  cover: string;
  categoria: string;
  youtubeUrl: string;
  spotifyUrl: string;
  descrizione: string;
  lyrics: string;
  imagineExtra?: string;
  featured?: boolean;
}

/**
 * Convert CMS brano content to BranoData format for components
 */
export function cmsBranoToData(item: ContentItem<BranoFrontmatter>): BranoDataFormat {
  return {
    id: item.slug,
    slug: item.slug,
    titolo: item.frontmatter.title,
    cover: item.frontmatter.cover || '/images/brani/default.jpg',
    categoria: item.frontmatter.categoria || 'singolo',
    youtubeUrl: item.frontmatter.youtube_url || '',
    spotifyUrl: item.frontmatter.spotify_url || '',
    descrizione: item.frontmatter.descrizione || '',
    lyrics: item.frontmatter.lyrics || '',
    imagineExtra: item.frontmatter.immagine_extra,
    featured: item.frontmatter.featured,
  };
}

/**
 * Get all brani in component-friendly format
 */
export async function getAllBraniData(): Promise<BranoDataFormat[]> {
  const cmsItems = await getAllBraniFromCMS();
  return cmsItems.map(cmsBranoToData);
}

/**
 * Get a single brano in component-friendly format
 */
export async function getBranoData(slug: string): Promise<BranoDataFormat | null> {
  const item = await getBrano(slug);
  if (!item) return null;
  return cmsBranoToData(item);
}

/**
 * Get all brani slugs for static generation
 */
export async function getAllBraniSlugs(): Promise<string[]> {
  const items = await getAllBraniFromCMS();
  return items.map((item) => item.slug);
}

// ============================================
// CONCERTI CONTENT LOADERS
// ============================================

/**
 * Get all concerti
 */
export async function getAllConcerti(): Promise<ContentItem<ConcertoFrontmatter>[]> {
  const items = await getCollectionItems<ConcertoFrontmatter>('concerti');
  // Sort by date (newest first)
  return items.sort((a, b) => {
    return new Date(b.frontmatter.data_evento).getTime() - new Date(a.frontmatter.data_evento).getTime();
  });
}

/**
 * Get upcoming concerti (future events)
 */
export async function getUpcomingConcerti(): Promise<ContentItem<ConcertoFrontmatter>[]> {
  const allConcerti = await getAllConcerti();
  const now = new Date();
  return allConcerti
    .filter((concerto) => new Date(concerto.frontmatter.data_evento) >= now)
    .sort((a, b) => {
      return new Date(a.frontmatter.data_evento).getTime() - new Date(b.frontmatter.data_evento).getTime();
    });
}

/**
 * Get past concerti
 */
export async function getPastConcerti(): Promise<ContentItem<ConcertoFrontmatter>[]> {
  const allConcerti = await getAllConcerti();
  const now = new Date();
  return allConcerti.filter((concerto) => new Date(concerto.frontmatter.data_evento) < now);
}

// ============================================
// EVENTI DATA FORMAT (for components - unchanged interface)
// ============================================

export interface EventoDataFormat {
  id: string;
  titolo: string;
  luogo: string;
  citta?: string;
  data: string;
  ora: string;
  descrizione: string;
  annoGruppo: number;
  nomeTour?: string;
  linkBiglietti?: string;
  prezzo?: string;
  confermato: boolean;
}

/**
 * Parse datetime string (YYYY-MM-DDTHH:mm) into date and time parts
 * Returns { date: "YYYY-MM-DD", time: "HH:mm" }
 */
function parseDatetime(datetime: string): { date: string; time: string } {
  const tIndex = datetime.indexOf('T');
  if (tIndex !== -1) {
    const date = datetime.substring(0, tIndex);
    const time = datetime.substring(tIndex + 1) || '21:00';
    return { date, time };
  }
  // Fallback for old format (date only)
  return { date: datetime, time: '21:00' };
}

/**
 * Convert CMS concerto to EventoDataFormat for components
 * Parses the single datetime field into separate date and time for display
 */
export function cmsConcertoToData(item: ContentItem<ConcertoFrontmatter>): EventoDataFormat {
  const { date, time } = parseDatetime(item.frontmatter.data_evento);

  return {
    id: item.slug,
    titolo: item.frontmatter.title,
    luogo: item.frontmatter.luogo,
    citta: item.frontmatter.citta,
    data: date,
    ora: time,
    descrizione: item.frontmatter.descrizione || '',
    annoGruppo: item.frontmatter.anno,
    nomeTour: item.frontmatter.tour,
    linkBiglietti: item.frontmatter.link_biglietti,
    prezzo: item.frontmatter.prezzo,
    confermato: item.frontmatter.confermato !== false,
  };
}

/**
 * Get all concerti in component data format
 */
export async function getAllEventiData(): Promise<EventoDataFormat[]> {
  const cmsItems = await getAllConcerti();
  return cmsItems.map(cmsConcertoToData);
}

/**
 * Get future concerti in component data format
 */
export async function getEventiFuturiData(): Promise<EventoDataFormat[]> {
  const allEventi = await getAllEventiData();
  const oggi = new Date();
  oggi.setHours(0, 0, 0, 0);

  return allEventi
    .filter((e) => new Date(e.data) >= oggi && e.confermato)
    .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime());
}

/**
 * Past events group interface
 */
export interface EventiPassatiGroup {
  anno: number;
  nomeTour?: string;
  eventi: EventoDataFormat[];
}

/**
 * Get past concerti grouped by year/tour
 */
export async function getEventiPassatiData(): Promise<EventiPassatiGroup[]> {
  const allEventi = await getAllEventiData();
  const oggi = new Date();
  oggi.setHours(0, 0, 0, 0);

  const passati = allEventi.filter((e) => new Date(e.data) < oggi);

  // Group by year and tour
  const groupMap = new Map<string, EventiPassatiGroup>();

  passati.forEach((evento) => {
    const anno = evento.annoGruppo;
    const nomeTour = evento.nomeTour || 'Altri Eventi';
    const key = `${anno}-${nomeTour}`;

    if (!groupMap.has(key)) {
      groupMap.set(key, {
        anno,
        nomeTour,
        eventi: [],
      });
    }

    groupMap.get(key)!.eventi.push(evento);
  });

  // Sort events within each group by date descending
  groupMap.forEach((group) => {
    group.eventi.sort(
      (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
    );
  });

  // Convert to array and sort by year descending
  return Array.from(groupMap.values()).sort((a, b) => b.anno - a.anno);
}

// ============================================
// ESIBIZIONI CONTENT LOADERS
// ============================================

/**
 * Get all esibizioni
 */
export async function getAllEsibizioni(): Promise<ContentItem<EsibizioneFrontmatter>[]> {
  const items = await getCollectionItems<EsibizioneFrontmatter>('esibizioni');
  // Sort by year (newest first)
  return items.sort((a, b) => b.frontmatter.anno - a.frontmatter.anno);
}

/**
 * Get esibizioni by category
 */
export async function getEsibizioniByCategory(
  categoria: EsibizioneFrontmatter['categoria']
): Promise<ContentItem<EsibizioneFrontmatter>[]> {
  const allEsibizioni = await getAllEsibizioni();
  return allEsibizioni.filter((esibizione) => esibizione.frontmatter.categoria === categoria);
}

// ============================================
// ESIBIZIONI DATA FORMAT (for components)
// ============================================

export type CategoriaEsibizioneDisplay = 'Live' | 'Studio' | 'Cover' | 'Acustico' | 'TV/Radio';

export interface EsibizioneDataFormat {
  id: string;
  titolo: string;
  youtubeUrl: string;
  descrizione?: string;
  anno: number;
  categoria: CategoriaEsibizioneDisplay;
  playlist?: string;
  thumbnail?: string;
  featured?: boolean;
}

/**
 * Map CMS categoria to display categoria
 */
function mapCategoriaEsibizione(categoria: EsibizioneFrontmatter['categoria']): CategoriaEsibizioneDisplay {
  const mapping: Record<EsibizioneFrontmatter['categoria'], CategoriaEsibizioneDisplay> = {
    live: 'Live',
    studio: 'Studio',
    cover: 'Cover',
    acustico: 'Acustico',
    tv_radio: 'TV/Radio',
  };
  return mapping[categoria] || 'Live';
}

/**
 * Convert CMS esibizione to component data format
 */
export function cmsEsibizioneToData(item: ContentItem<EsibizioneFrontmatter>): EsibizioneDataFormat {
  return {
    id: item.slug,
    titolo: item.frontmatter.title,
    youtubeUrl: item.frontmatter.youtube_url,
    descrizione: item.frontmatter.descrizione,
    anno: item.frontmatter.anno,
    categoria: mapCategoriaEsibizione(item.frontmatter.categoria),
    playlist: item.frontmatter.playlist,
    thumbnail: item.frontmatter.thumbnail,
    featured: item.frontmatter.featured,
  };
}

/**
 * Get all esibizioni in component data format
 */
export async function getAllEsibizioniData(): Promise<EsibizioneDataFormat[]> {
  const cmsItems = await getAllEsibizioni();
  return cmsItems.map(cmsEsibizioneToData);
}

/**
 * Get unique years from esibizioni (descending order)
 */
export async function getEsibizioniAnniUnici(): Promise<number[]> {
  const esibizioni = await getAllEsibizioniData();
  const anni = new Set(esibizioni.map((e) => e.anno));
  return Array.from(anni).sort((a, b) => b - a);
}

/**
 * Get unique categories from esibizioni
 */
export async function getEsibizioniCategorie(): Promise<CategoriaEsibizioneDisplay[]> {
  const esibizioni = await getAllEsibizioniData();
  const categorie = new Set(esibizioni.map((e) => e.categoria));
  return Array.from(categorie);
}

// ============================================
// RASSEGNA STAMPA CONTENT LOADERS
// ============================================

/**
 * Get all articoli (rassegna stampa)
 */
export async function getAllArticoli(): Promise<ContentItem<ArticoloFrontmatter>[]> {
  const items = await getCollectionItems<ArticoloFrontmatter>('rassegna-stampa');
  // Sort by ordine (ascending) then by date (descending)
  return items.sort((a, b) => {
    if (a.frontmatter.ordine !== b.frontmatter.ordine) {
      return a.frontmatter.ordine - b.frontmatter.ordine;
    }
    return new Date(b.frontmatter.data_pubblicazione).getTime() -
      new Date(a.frontmatter.data_pubblicazione).getTime();
  });
}

/**
 * Get featured articoli
 */
export async function getFeaturedArticoli(): Promise<ContentItem<ArticoloFrontmatter>[]> {
  const allArticoli = await getAllArticoli();
  return allArticoli.filter((articolo) => articolo.frontmatter.featured);
}

/**
 * ArticoloStampaData format for components (matches existing component props)
 */
export interface ArticoloStampaDataFormat {
  id: string;
  titolo: string;
  testata: string;
  dataPubblicazione: string;
  estratto: string;
  immagine: string;
  linkEsterno?: string;
  ordine: number;
}

/**
 * Convert CMS articolo content to ArticoloStampaData format for components
 */
export function cmsArticoloToData(item: ContentItem<ArticoloFrontmatter>): ArticoloStampaDataFormat {
  return {
    id: item.slug,
    titolo: item.frontmatter.title,
    testata: item.frontmatter.testata,
    dataPubblicazione: item.frontmatter.data_pubblicazione,
    estratto: item.frontmatter.estratto || '',
    immagine: item.frontmatter.immagine || '/images/stampa/default.png',
    linkEsterno: item.frontmatter.link_esterno,
    ordine: item.frontmatter.ordine || 999,
  };
}

/**
 * Get all articoli in component-friendly format
 */
export async function getAllArticoliData(): Promise<ArticoloStampaDataFormat[]> {
  const cmsItems = await getAllArticoli();
  return cmsItems.map(cmsArticoloToData);
}

// ============================================
// SETTINGS LOADERS
// ============================================

/**
 * Get general settings
 */
export async function getGeneralSettings(): Promise<GeneralSettings> {
  const content = await getContentFile<GeneralSettings>('settings', 'general');
  return content?.frontmatter ?? {};
}

/**
 * Get contact settings
 */
export async function getContactSettings(): Promise<ContactSettings> {
  const content = await getContentFile<ContactSettings>('settings', 'contact');
  return content?.frontmatter ?? {};
}

/**
 * Get social settings
 */
export async function getSocialSettings(): Promise<SocialSettings> {
  const content = await getContentFile<SocialSettings>('settings', 'social');
  return content?.frontmatter ?? {};
}

/**
 * Get color settings
 */
export async function getColorSettings(): Promise<ColorSettings> {
  const content = await getContentFile<ColorSettings>('settings', 'colors');
  return content?.frontmatter ?? {};
}

/**
 * Get all settings at once
 */
export async function getAllSettings(): Promise<{
  general: GeneralSettings;
  contact: ContactSettings;
  social: SocialSettings;
  colors: ColorSettings;
}> {
  const [general, contact, social, colors] = await Promise.all([
    getGeneralSettings(),
    getContactSettings(),
    getSocialSettings(),
    getColorSettings(),
  ]);

  return { general, contact, social, colors };
}
