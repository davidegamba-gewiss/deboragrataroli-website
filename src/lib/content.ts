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
 * Evento frontmatter structure
 */
export interface EventoFrontmatter {
  title: string;
  luogo: string;
  citta?: string;
  data: string;
  anno_gruppo: string;
  nome_tour?: string;
  descrizione?: string;
  immagine?: string;
  link_biglietti?: string;
  prezzo?: string;
  stato: 'confermato' | 'sold_out' | 'annullato' | 'rimandato';
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

// ============================================
// EVENTI CONTENT LOADERS
// ============================================

/**
 * Get all eventi
 */
export async function getAllEventi(): Promise<ContentItem<EventoFrontmatter>[]> {
  const items = await getCollectionItems<EventoFrontmatter>('eventi');
  // Sort by date (newest first)
  return items.sort((a, b) => {
    return new Date(b.frontmatter.data).getTime() - new Date(a.frontmatter.data).getTime();
  });
}

/**
 * Get upcoming eventi (future events)
 */
export async function getUpcomingEventi(): Promise<ContentItem<EventoFrontmatter>[]> {
  const allEventi = await getAllEventi();
  const now = new Date();
  return allEventi
    .filter((evento) => new Date(evento.frontmatter.data) >= now)
    .sort((a, b) => {
      return new Date(a.frontmatter.data).getTime() - new Date(b.frontmatter.data).getTime();
    });
}

/**
 * Get past eventi
 */
export async function getPastEventi(): Promise<ContentItem<EventoFrontmatter>[]> {
  const allEventi = await getAllEventi();
  const now = new Date();
  return allEventi.filter((evento) => new Date(evento.frontmatter.data) < now);
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
