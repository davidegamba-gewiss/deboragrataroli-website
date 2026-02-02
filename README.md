# Sito Web Debora Grataroli

Sito web ufficiale di Debora Grataroli, costruito con Next.js 14, TypeScript e Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **CMS**: Decap CMS (Git-based)
- **Animations**: Framer Motion
- **Deploy**: Vercel

## Setup Locale

### Prerequisiti

- Node.js 18+ 
- npm o yarn

### Installazione

```bash
# Clona il repository
git clone https://github.com/davidegamba-gewiss/deboragrataroli-website.git
cd deboragrataroli-website

# Installa le dipendenze
npm install --legacy-peer-deps

# Copia le variabili d'ambiente
cp .env.local.example .env.local

# Avvia il server di sviluppo
npm run dev
```

Accedi a [http://localhost:3000](http://localhost:3000)

## Admin CMS

### Sviluppo Locale

```bash
# Avvia Next.js + CMS proxy server
npm run dev:cms
```

Accedi a [http://localhost:3000/admin](http://localhost:3000/admin)

### Produzione

Accedi a [https://deboragrataroli.it/admin](https://deboragrataroli.it/admin)

Richiede autenticazione GitHub OAuth.

## Scripts

| Script | Descrizione |
|--------|-------------|
| `npm run dev` | Avvia server di sviluppo |
| `npm run dev:cms` | Avvia server + CMS proxy |
| `npm run build` | Build di produzione |
| `npm run start` | Avvia server di produzione |
| `npm run lint` | Esegue ESLint |
| `npm run type-check` | Verifica TypeScript |
| `npm run cms` | Avvia solo CMS proxy server |

## Struttura Progetto

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Layout principale
│   ├── page.tsx            # Home page
│   └── globals.css         # Stili globali
├── components/
│   ├── layout/             # Header, Footer, MobileMenu
│   └── common/             # Button, Card, etc.
├── constants/              # Design System tokens
│   ├── colors.ts           # Palette colori
│   ├── typography.ts       # Scale tipografica
│   ├── spacing.ts          # Sistema spacing
│   └── breakpoints.ts      # Breakpoints responsive
├── utils/
│   └── designSystem.ts     # Helper functions
└── types/
    └── index.ts            # Type definitions

content/                    # Contenuti CMS (Markdown)
├── pages/                  # Pagine statiche
├── brani/                  # Brani musicali
├── eventi/                 # Eventi e concerti
├── esibizioni/             # Video esibizioni
├── rassegna-stampa/        # Articoli stampa
└── settings/               # Impostazioni globali

public/
├── admin/                  # Decap CMS
│   ├── config.yml          # Configurazione CMS
│   └── index.html          # Entry point CMS
└── media/                  # Media files
```

## Design System

### Colori

| Nome | Valore | Uso |
|------|--------|-----|
| `purple-dark` | `#7b4397` | Header, menu, titoli |
| `purple-medium` | `#9b59b6` | Link, hover, accenti |
| `purple-light` | `#c8a2d6` | Sfondi, decorazioni |

### Font

- **Inter**: Titoli, menu, body text
- **Playfair Display**: Citazioni, enfasi

### Breakpoints

| Nome | Valore | Descrizione |
|------|--------|-------------|
| `sm` | 640px | Small |
| `md` | 768px | Tablet |
| `lg` | 1024px | Desktop |
| `xl` | 1280px | Large desktop |

## Deploy

### Vercel (Automatico)

Push su `main` branch → Deploy automatico su Vercel

```bash
git add .
git commit -m "feat: descrizione modifica"
git push origin main
```

Il deploy richiede circa 2-3 minuti.

### Variabili d'Ambiente (Vercel)

Configura in Vercel Dashboard → Settings → Environment Variables:

- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`

## CMS Collections

| Collection | Descrizione |
|------------|-------------|
| **Pagine** | Home, Biografia, Contatti |
| **Brani** | Discografia con cover, lyrics, link streaming |
| **Eventi** | Concerti e date live |
| **Esibizioni** | Video YouTube (Live, Studio, Cover) |
| **Rassegna Stampa** | Articoli e menzioni media |
| **Impostazioni** | Contatti, social, colori tema |

## Contribuire

1. Crea un branch: `git checkout -b feature/nome-feature`
2. Commit: `git commit -m "feat: descrizione"`
3. Push: `git push origin feature/nome-feature`
4. Apri una Pull Request

## License

Tutti i diritti riservati © Debora Grataroli
