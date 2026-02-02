export interface BranoData {
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
}

export const braniData: BranoData[] = [
  {
    id: '1',
    slug: 'nel-silenzio',
    titolo: 'Nel Silenzio',
    cover: '/images/brani/nel-silenzio.jpg',
    categoria: 'Singolo Originale',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    spotifyUrl: 'https://open.spotify.com/embed/track/4cOdK2wGLETKBW3PvgPWqT',
    descrizione: 'Una ballata intima che esplora il potere del silenzio nelle relazioni umane. Scritta durante un periodo di profonda riflessione, questa canzone racconta come spesso le parole non dette siano più eloquenti di quelle pronunciate.',
    lyrics: `Nel silenzio della notte
Trovo le parole che non ho mai detto
Come stelle nel cielo
Brillano i pensieri che tengo nel petto

Ritornello:
Nel silenzio io ti cerco
Nel silenzio tu mi trovi
È nel silenzio che l'amore
Trova la sua voce

Tra le ombre della sera
Si nasconde la verità che temo
Ma nel buio più profondo
È la luce che insieme noi cerchiamo`,
  },
  {
    id: '2',
    slug: 'luna-piena',
    titolo: 'Luna Piena',
    cover: '/images/brani/luna-piena.jpg',
    categoria: 'Album "Riflessi"',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    spotifyUrl: 'https://open.spotify.com/embed/track/4cOdK2wGLETKBW3PvgPWqT',
    descrizione: 'Un brano dal ritmo incalzante che celebra la magia delle notti d\'estate. La melodia evocativa trasporta l\'ascoltatore in un viaggio sotto il cielo stellato, dove ogni nota è un passo verso la libertà.',
    lyrics: `Sotto la luna piena
Danziamo senza freni
Il vento ci accarezza
Siamo finalmente liberi

La notte è giovane
E noi siamo eterni
Nel cerchio della luna
I nostri cuori si tengono

Ritornello:
Luna piena, illumina il sentiero
Luna piena, rendimi sincero
In questa notte magica
Tutto sembra possibile`,
  },
  {
    id: '3',
    slug: 'oltre-lorizzonte',
    titolo: 'Oltre l\'Orizzonte',
    cover: '/images/brani/oltre-orizzonte.jpg',
    categoria: 'Singolo Originale',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    spotifyUrl: 'https://open.spotify.com/embed/track/4cOdK2wGLETKBW3PvgPWqT',
    descrizione: 'Una canzone di speranza e determinazione. Scritta per tutti coloro che non smettono mai di sognare, "Oltre l\'Orizzonte" è un inno alla perseveranza e alla forza interiore che ci spinge sempre avanti.',
    lyrics: `Guardo lontano, oltre le montagne
Dove il sole incontra il mare
Ogni passo è una promessa
Di un domani da conquistare

Il cammino è lungo e incerto
Ma il mio cuore sa la via
Oltre l'orizzonte c'è
La vita che aspetta me

Ritornello:
Oltre l'orizzonte
Dove nascono i sogni
Oltre l'orizzonte
Troverò chi sono`,
  },
  {
    id: '4',
    slug: 'ricordi-destate',
    titolo: 'Ricordi d\'Estate',
    cover: '/images/brani/ricordi-estate.jpg',
    categoria: 'Album "Riflessi"',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    spotifyUrl: 'https://open.spotify.com/embed/track/4cOdK2wGLETKBW3PvgPWqT',
    descrizione: 'Un tuffo nostalgico nelle estati della gioventù. Questo brano cattura l\'essenza di quei momenti spensierati che rimangono impressi nel cuore per sempre, come fotografie sbiadite ma preziose.',
    lyrics: `Sabbia tra le dita
Sale sulla pelle
Quelle estati infinite
Sotto mille stelle

Risate al tramonto
Segreti sussurrati
Quei giorni d'oro
Non li ho mai dimenticati

Ritornello:
Ricordi d'estate
Che il tempo non cancella
Ricordi d'estate
La mia storia più bella`,
  },
  {
    id: '5',
    slug: 'voce-del-cuore',
    titolo: 'La Voce del Cuore',
    cover: '/images/brani/voce-cuore.jpg',
    categoria: 'Performance Live',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    spotifyUrl: 'https://open.spotify.com/embed/track/4cOdK2wGLETKBW3PvgPWqT',
    descrizione: 'Registrata dal vivo durante il concerto al Teatro dell\'Opera. Questa versione acustica cattura tutta l\'emozione e l\'intensità di una performance indimenticabile, dove la voce si fonde con le note del pianoforte.',
    lyrics: `Ascolta la voce del cuore
Che sussurra nel vento
Ogni battito è un messaggio
Che il mondo non ha ancora sentito

Non servono parole
Quando l'anima parla
Nel linguaggio universale
Dell'amore che non si ferma

Ritornello:
La voce del cuore
Non conosce confini
La voce del cuore
Unisce i destini`,
    imagineExtra: '/images/brani/voce-cuore-live.jpg',
  },
  {
    id: '6',
    slug: 'alba-nuova',
    titolo: 'Alba Nuova',
    cover: '/images/brani/alba-nuova.jpg',
    categoria: 'Singolo Originale',
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    spotifyUrl: 'https://open.spotify.com/embed/track/4cOdK2wGLETKBW3PvgPWqT',
    descrizione: 'Il brano che apre ogni concerto. "Alba Nuova" rappresenta la rinascita, il coraggio di ricominciare dopo le difficoltà. Una melodia che cresce progressivamente, come il sole che sorge all\'orizzonte.',
    lyrics: `Dopo la notte più buia
Arriva sempre l'alba
Un nuovo giorno si sveglia
E con lui la speranza

I colori del cielo
Dipingono il futuro
Ogni alba è una promessa
Di un amore più puro

Ritornello:
Alba nuova, vita nuova
Tutto può ricominciare
Alba nuova, forza nuova
Ho il coraggio di cambiare`,
  },
];
