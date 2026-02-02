export type CategoriaEsibizione = 'Live' | 'Studio' | 'Cover';

export interface EsibizioneData {
  id: string;
  titolo: string;
  youtubeUrl: string; // Full embed URL or video ID
  descrizione?: string;
  anno: number;
  categoria: CategoriaEsibizione;
  playlist?: string; // e.g., "Estate 2024", "Inediti Live"
}

export const esibizioniData: EsibizioneData[] = [
  // 2025 Videos
  {
    id: '1',
    titolo: 'Performance Live Milano - Teatro alla Scala',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    descrizione: 'Concerto live al prestigioso Teatro alla Scala di Milano, una serata indimenticabile.',
    anno: 2025,
    categoria: 'Live',
    playlist: 'Tour 2025',
  },
  {
    id: '2',
    titolo: 'Nel Silenzio - Versione Acustica Studio',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    descrizione: 'Registrazione in studio del mio singolo "Nel Silenzio" in versione acustica.',
    anno: 2025,
    categoria: 'Studio',
    playlist: 'Sessioni Studio',
  },
  {
    id: '3',
    titolo: 'Cover: "Caruso" di Lucio Dalla',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    descrizione: 'La mia interpretazione del capolavoro di Lucio Dalla.',
    anno: 2025,
    categoria: 'Cover',
    playlist: 'Covers Classiche',
  },
  {
    id: '4',
    titolo: 'Festival di Sanremo - Esibizione Ospite',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    descrizione: 'Esibizione come ospite speciale al Festival di Sanremo 2025.',
    anno: 2025,
    categoria: 'Live',
    playlist: 'Tour 2025',
  },
  // 2024 Videos
  {
    id: '5',
    titolo: 'Concerto Estate Roma - Auditorium',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    descrizione: 'Performance estiva all\'Auditorium Parco della Musica di Roma.',
    anno: 2024,
    categoria: 'Live',
    playlist: 'Estate 2024',
  },
  {
    id: '6',
    titolo: 'Luna Piena - Official Video',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    descrizione: 'Video ufficiale del singolo "Luna Piena", girato sulla costa amalfitana.',
    anno: 2024,
    categoria: 'Studio',
    playlist: 'Video Ufficiali',
  },
  {
    id: '7',
    titolo: 'Cover: "La Donna Cannone" di De Gregori',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    descrizione: 'Omaggio a Francesco De Gregori con questa interpretazione intima.',
    anno: 2024,
    categoria: 'Cover',
    playlist: 'Covers Classiche',
  },
  {
    id: '8',
    titolo: 'Umbria Jazz Festival - Set Completo',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    descrizione: 'Set completo della mia esibizione all\'Umbria Jazz Festival.',
    anno: 2024,
    categoria: 'Live',
    playlist: 'Estate 2024',
  },
  // 2023 Videos
  {
    id: '9',
    titolo: 'Debutto Live - Alcatraz Milano',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    descrizione: 'Il mio primo concerto da solista, una serata emozionante.',
    anno: 2023,
    categoria: 'Live',
    playlist: 'Primi Passi',
  },
  {
    id: '10',
    titolo: 'Oltre l\'Orizzonte - Lyric Video',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    descrizione: 'Lyric video del brano "Oltre l\'Orizzonte".',
    anno: 2023,
    categoria: 'Studio',
    playlist: 'Video Ufficiali',
  },
  {
    id: '11',
    titolo: 'Cover: "Con Te Partirò" di Bocelli',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    descrizione: 'La mia versione del celebre brano di Andrea Bocelli.',
    anno: 2023,
    categoria: 'Cover',
    playlist: 'Covers Classiche',
  },
  {
    id: '12',
    titolo: 'Showcase Acustico - Monk Club Roma',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    descrizione: 'Performance acustica intima al Monk Club di Roma.',
    anno: 2023,
    categoria: 'Live',
    playlist: 'Primi Passi',
  },
];
