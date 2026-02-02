import { eventiData, EventoData } from '@/data/eventi';

/**
 * Get future events sorted by date ascending (closest first)
 */
export function getEventiFuturi(): EventoData[] {
  const oggi = new Date();
  oggi.setHours(0, 0, 0, 0); // Start of today

  return eventiData
    .filter((e) => e.data && new Date(e.data) >= oggi)
    .sort((a, b) => new Date(a.data!).getTime() - new Date(b.data!).getTime());
}

/**
 * Get past events grouped by year/tour
 */
export interface EventiPassatiGroup {
  anno: number;
  nomeTour?: string;
  eventi: EventoData[];
}

export function getEventiPassati(): EventiPassatiGroup[] {
  const oggi = new Date();
  oggi.setHours(0, 0, 0, 0);

  const passati = eventiData.filter((e) => e.data && new Date(e.data) < oggi);

  // Group by year and tour
  const groupMap = new Map<string, EventiPassatiGroup>();

  passati.forEach((evento) => {
    const anno = evento.annoGruppo || new Date(evento.data!).getFullYear();
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
      (a, b) => new Date(b.data!).getTime() - new Date(a.data!).getTime()
    );
  });

  // Convert to array and sort by year descending
  return Array.from(groupMap.values()).sort((a, b) => b.anno - a.anno);
}

/**
 * Format date string to Italian format
 */
export function formatData(dataString: string): string {
  const date = new Date(dataString);
  return date.toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Format time string (HH:mm)
 */
export function formatOra(oraString: string): string {
  return oraString; // Already in HH:mm format
}

/**
 * Check if an event is upcoming (within next 30 days)
 */
export function isUpcoming(dataString: string): boolean {
  const eventDate = new Date(dataString);
  const oggi = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(oggi.getDate() + 30);

  return eventDate >= oggi && eventDate <= thirtyDaysFromNow;
}

/**
 * Get all events
 */
export function getAllEventi(): EventoData[] {
  return eventiData;
}

/**
 * Get event by ID
 */
export function getEventoById(id: string): EventoData | undefined {
  return eventiData.find((e) => e.id === id);
}
