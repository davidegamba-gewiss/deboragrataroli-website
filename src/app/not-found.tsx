import Link from 'next/link';
import { ROUTES } from '@/utils/routing';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="text-center">
        {/* 404 Number */}
        <h1 className="text-9xl font-bold text-purple-light/50 mb-4">
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
          Pagina non trovata
        </h2>

        <p className="text-gray-600 max-w-md mx-auto mb-8">
          La pagina che stai cercando non esiste o è stata spostata.
          Torna alla homepage per continuare a esplorare.
        </p>

        {/* Back to Home Button */}
        <Link
          href={ROUTES.HOME}
          className="btn-primary btn-lg inline-flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Torna alla Homepage
        </Link>

        {/* Alternative Links */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
          <Link
            href={ROUTES.BRANI}
            className="text-purple-medium hover:text-purple-dark transition-colors"
          >
            I Miei Brani
          </Link>
          <span className="text-gray-300">•</span>
          <Link
            href={ROUTES.EVENTI}
            className="text-purple-medium hover:text-purple-dark transition-colors"
          >
            Eventi
          </Link>
          <span className="text-gray-300">•</span>
          <Link
            href={ROUTES.CONTATTI}
            className="text-purple-medium hover:text-purple-dark transition-colors"
          >
            Contatti
          </Link>
        </div>
      </div>
    </div>
  );
}
