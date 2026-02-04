import type { Metadata } from 'next';
import { PageLayout } from '@/components/layout/PageLayout';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Cookie Policy',
  description:
    'Informativa sui cookie utilizzati dal sito di Debora Grataroli. Scopri quali cookie utilizziamo e come gestirli.',
  path: '/cookie-policy',
  noIndex: true,
});

export default function CookiePolicyPage() {
  return (
    <PageLayout showDecorative={false}>
      <article className="py-12 lg:py-20 max-w-3xl mx-auto prose prose-purple">
        <h1 className="font-playfair text-4xl md:text-5xl text-purple-dark mb-8">
          Cookie Policy
        </h1>

        <p className="text-neutral-dark/70 mb-8">
          Ultimo aggiornamento: Febbraio 2026
        </p>

        <section className="mb-8">
          <h2 className="font-playfair text-2xl text-purple-dark mb-4">
            1. Cosa sono i Cookie
          </h2>
          <p>
            I cookie sono piccoli file di testo che vengono memorizzati sul tuo
            dispositivo quando visiti un sito web. Vengono utilizzati per migliorare
            l&apos;esperienza di navigazione, memorizzare le preferenze e raccogliere
            informazioni statistiche anonime sull&apos;utilizzo del sito.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-playfair text-2xl text-purple-dark mb-4">
            2. Cookie Utilizzati
          </h2>
          <p>Questo sito utilizza le seguenti categorie di cookie:</p>

          <div className="mt-6 space-y-6">
            <div className="bg-purple-light/10 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-dark mb-2">
                Cookie Necessari
              </h3>
              <p className="text-sm">
                Questi cookie sono essenziali per il funzionamento del sito e non
                possono essere disabilitati. Includono cookie per la gestione delle
                sessioni e delle preferenze sui cookie.
              </p>
              <table className="w-full mt-3 text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Nome</th>
                    <th className="text-left py-2">Durata</th>
                    <th className="text-left py-2">Scopo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2">cookie_consent</td>
                    <td className="py-2">1 anno</td>
                    <td className="py-2">Memorizza le preferenze sui cookie</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-purple-light/10 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-dark mb-2">
                Cookie Analitici
              </h3>
              <p className="text-sm">
                Questi cookie ci aiutano a capire come i visitatori interagiscono
                con il sito, raccogliendo informazioni anonime. Utilizziamo Google
                Analytics.
              </p>
              <table className="w-full mt-3 text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Nome</th>
                    <th className="text-left py-2">Durata</th>
                    <th className="text-left py-2">Scopo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2">_ga</td>
                    <td className="py-2">2 anni</td>
                    <td className="py-2">Distingue gli utenti</td>
                  </tr>
                  <tr>
                    <td className="py-2">_ga_*</td>
                    <td className="py-2">2 anni</td>
                    <td className="py-2">Mantiene lo stato della sessione</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-purple-light/10 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-dark mb-2">
                Cookie di Marketing
              </h3>
              <p className="text-sm">
                Questi cookie possono essere utilizzati per tracciare il successo
                delle campagne pubblicitarie. Al momento non utilizziamo cookie di
                marketing attivi.
              </p>
            </div>

            <div className="bg-purple-light/10 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-dark mb-2">
                Cookie di Preferenze
              </h3>
              <p className="text-sm">
                Questi cookie permettono al sito di ricordare le scelte effettuate
                (come la lingua o la regione) e fornire funzionalità personalizzate.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="font-playfair text-2xl text-purple-dark mb-4">
            3. Cookie di Terze Parti
          </h2>
          <p>
            Questo sito può includere contenuti incorporati da terze parti (come
            video YouTube o player Spotify) che potrebbero impostare propri cookie.
            Non abbiamo controllo su questi cookie. Ti consigliamo di consultare
            le policy delle rispettive piattaforme:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-medium hover:text-purple-dark"
              >
                Google (YouTube) Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="https://www.spotify.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-medium hover:text-purple-dark"
              >
                Spotify Privacy Policy
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-playfair text-2xl text-purple-dark mb-4">
            4. Come Gestire i Cookie
          </h2>
          <p>
            Puoi gestire le tue preferenze sui cookie in qualsiasi momento
            cliccando su &quot;Gestisci Cookie&quot; nel footer del sito o
            attraverso le impostazioni del tuo browser.
          </p>
          <p className="mt-4">
            Puoi anche disabilitare completamente i cookie modificando le
            impostazioni del tuo browser. Ecco le guide per i browser più comuni:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-medium hover:text-purple-dark"
              >
                Google Chrome
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/it/kb/Attivare%20e%20disattivare%20i%20cookie"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-medium hover:text-purple-dark"
              >
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/it-it/guide/safari/sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-medium hover:text-purple-dark"
              >
                Safari
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-medium hover:text-purple-dark"
              >
                Microsoft Edge
              </a>
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-playfair text-2xl text-purple-dark mb-4">
            5. Conseguenze della Disabilitazione dei Cookie
          </h2>
          <p>
            La disabilitazione dei cookie necessari potrebbe compromettere il
            corretto funzionamento del sito. La disabilitazione dei cookie analitici
            e di marketing non avrà effetti sulla navigazione ma ci impedirà di
            migliorare il sito basandoci sui dati di utilizzo.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-playfair text-2xl text-purple-dark mb-4">
            6. Aggiornamenti
          </h2>
          <p>
            Questa Cookie Policy può essere aggiornata periodicamente. Ti invitiamo
            a consultare regolarmente questa pagina per essere sempre informato su
            come utilizziamo i cookie.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-playfair text-2xl text-purple-dark mb-4">
            7. Contatti
          </h2>
          <p>
            Per qualsiasi domanda riguardante questa Cookie Policy o i tuoi dati
            personali, puoi contattarci attraverso il{' '}
            <a href="/contatti" className="text-purple-medium hover:text-purple-dark">
              modulo di contatto
            </a>{' '}
            o consultare la nostra{' '}
            <a href="/privacy-policy" className="text-purple-medium hover:text-purple-dark">
              Privacy Policy
            </a>.
          </p>
        </section>
      </article>
    </PageLayout>
  );
}
