'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { useGlobalSettings } from '@/context/GlobalSettingsContext';

export default function ContattiPage() {
  const settings = useGlobalSettings();
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');

    // Simulate form submission
    setTimeout(() => {
      setFormStatus('sent');
    }, 1000);
  };

  return (
    <PageLayout
      hero={{
        imageSrc: '/images/hero-contatti.jpg',
        title: 'Contatti',
        subtitle: 'Scrivimi per collaborazioni ed eventi',
        imageAlt: 'Contatta Debora Grataroli',
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Parliamo!
          </h2>

          <p className="text-gray-600 mb-8">
            Hai una domanda, vuoi organizzare un evento o semplicemente
            scambiare due parole sulla musica? Non esitare a contattarmi!
          </p>

          {/* Email */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Email
            </h3>
            <a
              href={`mailto:${settings.emailContatto}`}
              className="text-lg text-purple-medium hover:text-purple-dark transition-colors"
            >
              {settings.emailContatto}
            </a>
          </div>

          {/* Social Links */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Seguimi sui social
            </h3>
            <div className="flex gap-4">
              {settings.socialInstagram && (
                <a
                  href={settings.socialInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-purple-light/20 flex items-center justify-center text-purple-medium hover:bg-purple-medium hover:text-white transition-all"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              )}
              {settings.socialFacebook && (
                <a
                  href={settings.socialFacebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-purple-light/20 flex items-center justify-center text-purple-medium hover:bg-purple-medium hover:text-white transition-all"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}
              {settings.socialYoutube && (
                <a
                  href={settings.socialYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-purple-light/20 flex items-center justify-center text-purple-medium hover:bg-purple-medium hover:text-white transition-all"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* For Events */}
          <div className="p-6 bg-purple-light/10 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">
              Per eventi e collaborazioni
            </h3>
            <p className="text-gray-600 text-sm">
              Se sei interessato a organizzare un evento o una collaborazione musicale,
              compila il form o contattami direttamente via email specificando i dettagli
              della tua richiesta.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Inviami un messaggio
          </h2>

          {formStatus === 'sent' ? (
            <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 font-medium">
                Messaggio inviato con successo!
              </p>
              <p className="text-green-600 text-sm mt-1">
                Ti risponderò il prima possibile.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                  Nome *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-medium focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-medium focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label htmlFor="oggetto" className="block text-sm font-medium text-gray-700 mb-1">
                  Oggetto
                </label>
                <select
                  id="oggetto"
                  name="oggetto"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-medium focus:border-transparent transition-colors"
                >
                  <option value="info">Informazioni generali</option>
                  <option value="evento">Richiesta per evento</option>
                  <option value="collaborazione">Collaborazione</option>
                  <option value="altro">Altro</option>
                </select>
              </div>

              <div>
                <label htmlFor="messaggio" className="block text-sm font-medium text-gray-700 mb-1">
                  Messaggio *
                </label>
                <textarea
                  id="messaggio"
                  name="messaggio"
                  rows={5}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-medium focus:border-transparent transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="btn-primary btn-lg w-full disabled:opacity-50"
              >
                {formStatus === 'sending' ? 'Invio in corso...' : 'Invia messaggio'}
              </button>
            </form>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
