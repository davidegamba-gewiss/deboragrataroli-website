import { stampaData, ArticoloStampaData } from '@/data/stampa';

/**
 * Get all articles sorted by ordine field (ascending)
 */
export function getArticoliStampa(): ArticoloStampaData[] {
  return [...stampaData].sort((a, b) => a.ordine - b.ordine);
}

/**
 * Get article by ID
 */
export function getArticoloById(id: string): ArticoloStampaData | undefined {
  return stampaData.find((a) => a.id === id);
}

/**
 * Format date string to Italian format
 */
export function formatDataStampa(dataString: string): string {
  const date = new Date(dataString);
  return date.toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Get unique testate (publications)
 */
export function getTestate(): string[] {
  return [...new Set(stampaData.map((a) => a.testata))];
}

/**
 * Get articles count
 */
export function getArticoliCount(): number {
  return stampaData.length;
}
