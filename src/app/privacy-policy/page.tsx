import type { Metadata } from 'next';
import { PageLayout } from '@/components/layout/PageLayout';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Privacy Policy',
  description:
    'Informativa sulla privacy del sito di Debora Grataroli. Scopri come vengono trattati i tuoi dati personali.',
  path: '/privacy-policy',
  noIndex: true,
});

export default function PrivacyPolicyPage() {
  return (
    <PageLayout showDecorative={false}>
      <article className="py-12 lg:py-20 max-w-3xl mx-auto prose prose-purple">
        <h1 className="font-playfair text-4xl md:text-5xl text-purple-dark mb-8">
          Privacy Policy
        </h1>

        <p className="text-neutral-dark/70 mb-8">
          Ultimo aggiornamento: Febbraio 2026
        </p>

        <section className="mb-8">
          <h2 className="font-playfair text-2xl text-purple-dark mb-4">
            1. Titolare del Trattamento
          </h2>
          <p>
            Il titolare del trattamento dei dati personali raccolti tramite questo sito web
            è Debora Grataroli. Per qualsiasi informazione relativa al trattamento dei dati
            personali, puoi contattarci attraverso il{' '}
            <a href="/contatti" className="text-purple-medium hover:text-purple-dark">
              modulo di contatto
            </a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-playfair text-2xl text-purple-dark mb-4">
            2. Tipi di Dati Raccolti
          </h2>
          <p>Questo sito web può raccogliere i seguenti tipi di dati:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>
              <strong>Dati di navigazione:</strong> dati tecnici raccolti automaticamente
              durante la navigazione (indirizzo IP, browser, sistema operativo, pagine
              visitate, orario di accesso).
            </li>
            <li>
              <strong>Dati forniti volontariamente:</strong> nome, email e messaggio
              forniti tramite il modulo di contatto.
            </li>
            <li>
              <strong>Cookie:</strong> file di testo utilizzati per migliorare
              l&apos;esperienza di navigazione. Per maggiori informazioni, consulta la
              nostra{' '}
              <a href="/cookie-policy" className="text-purple-medium hover:text-purple-dark">
                Cookie Policy
              </a>.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-playfair text-2xl text-purple-dark mb-4">
            3. Finalità del Trattamento
          </h2>
          <p>I dati raccolti vengono utilizzati per:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Rispondere alle richieste inviate tramite il modulo di contatto</li>
            <li>Migliorare l&apos;esperienza di navigazione sul sito</li>
            <li>Analizzare il traffico del sito (se abilitati i cookie analitici)</li>
            <li>Adempiere ad obblighi di legge</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-playfair text-2xl text-purple-dark mb-4">
            4. Base Giuridica del Trattamento
          </h2>
          <p>
            Il trattamento dei dati personali si basa sul consenso dell&apos;utente
            (per i cookie non essenziali), sul legittimo interesse del titolare
            (per il funzionamento del sito), e sull&apos;esecuzione di un contratto
            (per rispondere alle richieste di contatto).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-playfair text-2xl text-purple-dark mb-4">
            5. Conservazione dei Dati
          </h2>
          <p>
            I dati personali saranno conservati per il tempo strettamente necessario
            a conseguire le finalità per cui sono stati raccolti, e comunque non oltre
            quanto previsto dalla normativa vigente.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-playfair text-2xl text-purple-dark mb-4">
            6. Diritti dell&apos;Interessato
          </h2>
          <p>
            Ai sensi del GDPR (Regolamento UE 2016/679), l&apos;utente ha diritto di:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Accedere ai propri dati personali</li>
            <li>Richiedere la rettifica o la cancellazione dei dati</li>
            <li>Richiedere la limitazione del trattamento</li>
            <li>Opporsi al trattamento</li>
            <li>Richiedere la portabilità dei dati</li>
            <li>Revocare il consenso in qualsiasi momento</li>
            <li>Proporre reclamo all&apos;Autorità Garante per la protezione dei dati personali</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-playfair text-2xl text-purple-dark mb-4">
            7. Sicurezza dei Dati
          </h2>
          <p>
            Adottiamo misure tecniche e organizzative appropriate per proteggere
            i dati personali da accessi non autorizzati, perdita, distruzione o
            divulgazione non autorizzata.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-playfair text-2xl text-purple-dark mb-4">
            8. Modifiche alla Privacy Policy
          </h2>
          <p>
            Questa Privacy Policy può essere aggiornata periodicamente. Ti invitiamo
            a consultare regolarmente questa pagina per essere sempre informato su
            come proteggiamo i tuoi dati.
          </p>
        </section>
      </article>
    </PageLayout>
  );
}
