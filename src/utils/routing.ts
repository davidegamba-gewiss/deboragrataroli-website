/**
 * Routing Utilities
 *
 * Helper functions and constants for routing.
 */

/**
 * Generate URL-friendly slug from title
 *
 * @param title - The title to convert to a slug
 * @returns URL-friendly slug string
 *
 * @example
 * generateSlug("La Mia Canzone") // "la-mia-canzone"
 * generateSlug("Brano Live!") // "brano-live"
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, '') // Remove leading/trailing hyphens
    .trim();
}

/**
 * Route constants
 *
 * Centralized route definitions for the application.
 */
export const ROUTES = {
  HOME: '/',
  BIOGRAFIA: '/biografia',
  EVENTI: '/eventi',
  ESIBIZIONI: '/esibizioni',
  BRANI: '/brani',
  BRANI_DETAIL: (slug: string) => `/brani/${slug}`,
  CONTATTI: '/contatti',
  PARLANO_DI_ME: '/parlano-di-me',
} as const;

/**
 * Route metadata
 *
 * Default metadata for each route.
 */
export const ROUTE_METADATA = {
  [ROUTES.HOME]: {
    title: 'Debora Grataroli - Cantautrice e Pianista',
    description:
      'Debora Grataroli, cantautrice e pianista italiana. Scopri i miei brani originali, eventi live e la mia storia musicale.',
  },
  [ROUTES.BIOGRAFIA]: {
    title: 'Biografia - Debora Grataroli',
    description:
      'Leggi la biografia di Debora Grataroli. Scopri la mia storia, il mio percorso musicale e le mie ispirazioni.',
  },
  [ROUTES.EVENTI]: {
    title: 'Eventi - Debora Grataroli',
    description:
      'Scopri i prossimi eventi e concerti di Debora Grataroli. Non perdere le date dei live!',
  },
  [ROUTES.ESIBIZIONI]: {
    title: 'Esibizioni - Debora Grataroli',
    description:
      'Guarda le esibizioni video di Debora Grataroli. Performance live, cover e brani originali.',
  },
  [ROUTES.BRANI]: {
    title: 'I Miei Brani - Debora Grataroli',
    description:
      'Ascolta i brani originali di Debora Grataroli. Canzoni, testi e musica dal cuore.',
  },
  [ROUTES.CONTATTI]: {
    title: 'Contatti - Debora Grataroli',
    description:
      'Contatta Debora Grataroli per collaborazioni, eventi e informazioni.',
  },
  [ROUTES.PARLANO_DI_ME]: {
    title: 'Parlano di Me - Debora Grataroli',
    description:
      'Rassegna stampa e articoli su Debora Grataroli. Leggi cosa dicono di me.',
  },
} as const;

/**
 * Check if a route is active
 *
 * @param currentPath - The current URL path
 * @param routePath - The route path to check
 * @returns Whether the route is active
 */
export function isRouteActive(currentPath: string, routePath: string): boolean {
  if (routePath === '/') {
    return currentPath === '/';
  }
  return currentPath.startsWith(routePath);
}
