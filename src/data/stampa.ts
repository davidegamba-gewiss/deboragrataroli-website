export interface ArticoloStampaData {
  id: string;
  titolo: string;
  testata: string;
  dataPubblicazione: string; // YYYY-MM-DD format
  estratto: string;
  immagine: string;
  linkEsterno?: string;
  ordine: number; // For manual ordering via CMS drag-drop
}

export const stampaData: ArticoloStampaData[] = [
  {
    id: '1',
    titolo: 'La nuova voce della musica italiana che sta conquistando il pubblico',
    testata: 'La Repubblica',
    dataPubblicazione: '2026-01-15',
    estratto:
      'Debora Grataroli emerge come una delle voci più interessanti della musica italiana contemporanea. Con il suo stile unico che fonde tradizione e modernità, la cantautrice sta rapidamente conquistando un posto di rilievo nel panorama musicale nazionale.',
    immagine: '/images/stampa/repubblica.jpg',
    linkEsterno: 'https://www.repubblica.it',
    ordine: 1,
  },
  {
    id: '2',
    titolo: 'Intervista esclusiva: Debora Grataroli racconta il suo viaggio musicale',
    testata: 'Corriere della Sera',
    dataPubblicazione: '2025-12-20',
    estratto:
      'Una conversazione intima con la cantautrice romana su composizione, performance live e i progetti futuri. "La musica è il mio modo di comunicare emozioni che altrimenti non saprei esprimere", confida.',
    immagine: '/images/stampa/corriere.jpg',
    linkEsterno: 'https://www.corriere.it',
    ordine: 2,
  },
  {
    id: '3',
    titolo: 'Il tour 2025: sold out in tutta Italia',
    testata: 'Vanity Fair',
    dataPubblicazione: '2025-11-10',
    estratto:
      'Il Tour "Note d\'Incanto" di Debora Grataroli registra il tutto esaurito in tutte le date italiane. Un successo che conferma la crescita esponenziale di questa artista talentuosa e autentica.',
    immagine: '/images/stampa/vanity.jpg',
    linkEsterno: 'https://www.vanityfair.it',
    ordine: 3,
  },
  {
    id: '4',
    titolo: 'Le nuove leve della canzone d\'autore italiana',
    testata: 'Rolling Stone Italia',
    dataPubblicazione: '2025-09-05',
    estratto:
      'Nella nostra selezione delle artiste emergenti più promettenti, Debora Grataroli si distingue per la profondità dei testi e l\'intensità interpretativa. Una voce da tenere d\'occhio.',
    immagine: '/images/stampa/rollingstone.jpg',
    linkEsterno: 'https://www.rollingstone.it',
    ordine: 4,
  },
  {
    id: '5',
    titolo: 'Album dell\'anno: "Riflessi" tra i preferiti dalla critica',
    testata: 'Il Messaggero',
    dataPubblicazione: '2025-07-22',
    estratto:
      'L\'album "Riflessi" di Debora Grataroli entra nella lista dei migliori dischi dell\'anno secondo la critica musicale. Undici tracce che raccontano storie di vita, amore e rinascita.',
    immagine: '/images/stampa/messaggero.jpg',
    ordine: 5,
  },
  {
    id: '6',
    titolo: 'Festival del Mediterraneo: standing ovation per Debora Grataroli',
    testata: 'La Stampa',
    dataPubblicazione: '2025-06-15',
    estratto:
      'Al Teatro Greco di Siracusa, la performance di Debora Grataroli ha emozionato il pubblico fino alle lacrime. Una serata indimenticabile che conferma il suo talento straordinario.',
    immagine: '/images/stampa/lastampa.jpg',
    linkEsterno: 'https://www.lastampa.it',
    ordine: 6,
  },
];
