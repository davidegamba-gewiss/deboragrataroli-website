import { Button } from '@/components/common/Button';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-section-mobile lg:py-section-desktop">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-gray-900 mb-6">
              Benvenuti nel sito di{' '}
              <span className="text-gradient">Debora Grataroli</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 mb-8 font-playfair italic">
              &ldquo;Una citazione o frase di ispirazione&rdquo;
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Scopri di più
              </Button>
              <Button variant="outline" size="lg">
                Contattami
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-section-mobile lg:py-section-desktop bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-gray-900 mb-12">
            I miei servizi
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="card p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="w-12 h-12 bg-purple-light rounded-lg flex items-center justify-center mb-4">
                <span className="text-purple-dark text-2xl">✦</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Servizio 1
              </h3>
              <p className="text-gray-600">
                Descrizione del primo servizio offerto.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="card p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="w-12 h-12 bg-purple-light rounded-lg flex items-center justify-center mb-4">
                <span className="text-purple-dark text-2xl">✦</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Servizio 2
              </h3>
              <p className="text-gray-600">
                Descrizione del secondo servizio offerto.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="card p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="w-12 h-12 bg-purple-light rounded-lg flex items-center justify-center mb-4">
                <span className="text-purple-dark text-2xl">✦</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Servizio 3
              </h3>
              <p className="text-gray-600">
                Descrizione del terzo servizio offerto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-section-mobile lg:py-section-desktop">
        <div className="container-custom">
          <blockquote className="max-w-2xl mx-auto text-center">
            <p className="text-2xl md:text-3xl font-playfair italic text-gray-700 mb-4">
              &ldquo;Inserisci qui una citazione significativa che rappresenti la tua filosofia.&rdquo;
            </p>
            <footer className="text-purple-medium font-medium">
              — Debora Grataroli
            </footer>
          </blockquote>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-section-mobile lg:py-section-desktop bg-gradient-to-r from-purple-dark to-purple-medium">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Pronta a iniziare?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-xl mx-auto">
            Contattami per una consulenza personalizzata.
          </p>
          <Button variant="secondary" size="lg">
            Contattami ora
          </Button>
        </div>
      </section>
    </div>
  );
}
