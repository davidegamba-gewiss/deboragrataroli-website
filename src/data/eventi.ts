export interface EventoData {
  id: string;
  titolo: string;
  luogo?: string;
  data?: string; // YYYY-MM-DD format
  ora?: string; // HH:mm format
  descrizione: string;
  annoGruppo?: number; // for past events grouping
  nomeTour?: string; // e.g., "Tour Note d'Incanto"
}

export const eventiData: EventoData[] = [
  // Future events (2026)
  {
    id: '1',
    titolo: 'Concerto Estate 2026',
    luogo: 'Teatro alla Scala, Milano',
    data: '2026-06-15',
    ora: '20:30',
    descrizione: 'Un concerto speciale con tutti i miei brani originali, accompagnata da una band dal vivo in una serata indimenticabile.',
  },
  {
    id: '2',
    titolo: 'Festival Musica Italiana',
    luogo: 'Auditorium Parco della Musica, Roma',
    data: '2026-07-20',
    ora: '19:00',
    descrizione: 'Esibizione al prestigioso Festival della Musica Italiana con artisti emergenti e affermati.',
  },
  {
    id: '3',
    titolo: 'Concerto al Tramonto',
    luogo: 'Arena di Verona, Verona',
    data: '2026-08-10',
    ora: '21:00',
    descrizione: 'Una serata magica nell\'iconica Arena di Verona con un repertorio di brani originali e cover.',
  },
  {
    id: '4',
    titolo: 'Acoustic Night',
    luogo: 'Blue Note, Milano',
    data: '2026-03-22',
    ora: '21:30',
    descrizione: 'Serata intima con arrangiamenti acustici dei miei brani più amati.',
  },
  // Past events (2025) - Tour Note d'Incanto
  {
    id: '5',
    titolo: 'Concerto di Natale',
    luogo: 'Teatro Regio, Torino',
    data: '2025-12-20',
    ora: '20:00',
    descrizione: 'Concerto natalizio con brani della tradizione e canzoni originali.',
    annoGruppo: 2025,
    nomeTour: "Tour Note d'Incanto",
  },
  {
    id: '6',
    titolo: 'Serata d\'Autunno',
    luogo: 'Teatro Massimo, Palermo',
    data: '2025-11-15',
    ora: '21:00',
    descrizione: 'Una serata dedicata alla musica d\'autore italiana.',
    annoGruppo: 2025,
    nomeTour: "Tour Note d'Incanto",
  },
  {
    id: '7',
    titolo: 'Concerto a Firenze',
    luogo: 'Salone dei Cinquecento, Firenze',
    data: '2025-10-08',
    ora: '20:30',
    descrizione: 'Performance live in una location storica unica.',
    annoGruppo: 2025,
    nomeTour: "Tour Note d'Incanto",
  },
  {
    id: '8',
    titolo: 'Festival del Mediterraneo',
    luogo: 'Teatro Greco, Siracusa',
    data: '2025-09-05',
    ora: '21:30',
    descrizione: 'Partecipazione al festival con un set speciale.',
    annoGruppo: 2025,
    nomeTour: "Tour Note d'Incanto",
  },
  // Past events (2024) - Tour Estate 2024
  {
    id: '9',
    titolo: 'Notte Bianca della Musica',
    luogo: 'Piazza San Marco, Venezia',
    data: '2024-08-25',
    ora: '22:00',
    descrizione: 'Esibizione durante la Notte Bianca di Venezia.',
    annoGruppo: 2024,
    nomeTour: 'Tour Estate 2024',
  },
  {
    id: '10',
    titolo: 'Concerto al Porto',
    luogo: 'Porto Antico, Genova',
    data: '2024-07-18',
    ora: '21:00',
    descrizione: 'Serata estiva con vista sul mare.',
    annoGruppo: 2024,
    nomeTour: 'Tour Estate 2024',
  },
  {
    id: '11',
    titolo: 'Festival Jazz & Soul',
    luogo: 'Umbria Jazz, Perugia',
    data: '2024-07-10',
    ora: '20:00',
    descrizione: 'Partecipazione speciale al festival con un set jazz.',
    annoGruppo: 2024,
    nomeTour: 'Tour Estate 2024',
  },
  // Past events (2023) - Tour Primi Passi
  {
    id: '12',
    titolo: 'Debutto Live',
    luogo: 'Alcatraz, Milano',
    data: '2023-11-20',
    ora: '21:00',
    descrizione: 'Il mio primo concerto da solista, una serata emozionante.',
    annoGruppo: 2023,
    nomeTour: 'Tour Primi Passi',
  },
  {
    id: '13',
    titolo: 'Showcase Artisti Emergenti',
    luogo: 'Monk Club, Roma',
    data: '2023-09-15',
    ora: '20:00',
    descrizione: 'Showcase per artisti emergenti con performance acustica.',
    annoGruppo: 2023,
    nomeTour: 'Tour Primi Passi',
  },
];
