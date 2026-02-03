'use client';

import { useEffect, useState } from 'react';
import { useCookieConsent } from '@/context/CookieContext';

export default function CookieBanner() {
  const {
    isBannerVisible,
    acceptAll,
    rejectAll,
    setShowPreferencesModal,
  } = useCookieConsent();

  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Handle animation states
  useEffect(() => {
    if (isBannerVisible) {
      setShouldRender(true);
      // Small delay to allow DOM to update before animation
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      // Wait for exit animation before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isBannerVisible]);

  // Handle keyboard events
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isBannerVisible) {
        rejectAll();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isBannerVisible, rejectAll]);

  if (!shouldRender) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Consenso Cookie"
      aria-describedby="cookie-banner-description"
      className={`
        fixed bottom-4 right-4 z-50
        w-[calc(100%-2rem)] sm:w-[350px] max-w-[380px]
        m-4 sm:m-0 sm:mr-6 sm:mb-6
        bg-[#1a1a1a] text-white
        rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.3)]
        p-6
        transform transition-all duration-400 ease-out
        ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
      `}
    >
      {/* Title */}
      <h2 className="text-lg font-semibold mb-3">
        Cookie e Privacy
      </h2>

      {/* Description */}
      <p
        id="cookie-banner-description"
        className="text-sm leading-relaxed text-[#e0e0e0] mb-5"
      >
        Utilizziamo i cookie per migliorare l&apos;esperienza sul nostro sito.
        Puoi accettare tutti i cookie o personalizzare le tue preferenze.
      </p>

      {/* Manage preferences link */}
      <button
        type="button"
        onClick={() => setShowPreferencesModal(true)}
        className="
          text-xs text-purple-medium underline
          hover:text-purple-light cursor-pointer
          mb-4 block transition-colors
        "
      >
        Gestisci preferenze
      </button>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          type="button"
          onClick={acceptAll}
          className="
            flex-1 bg-purple-medium text-white
            py-2.5 px-5 text-sm font-semibold
            rounded border-none cursor-pointer
            transition-colors hover:bg-purple-light
            focus:outline-none focus-visible:ring-2
            focus-visible:ring-purple-light focus-visible:ring-offset-2
            focus-visible:ring-offset-[#1a1a1a]
          "
        >
          Accetta tutto
        </button>

        <button
          type="button"
          onClick={rejectAll}
          className="
            flex-1 bg-transparent text-[#e0e0e0]
            border border-[#555] py-2.5 px-5
            text-sm font-semibold rounded cursor-pointer
            transition-colors hover:bg-[#333] hover:border-[#999]
            focus:outline-none focus-visible:ring-2
            focus-visible:ring-purple-light focus-visible:ring-offset-2
            focus-visible:ring-offset-[#1a1a1a]
          "
        >
          Rifiuta
        </button>
      </div>

      {/* Policy links */}
      <div className="mt-4 text-xs text-[#999] flex gap-4 justify-center">
        <a
          href="/privacy-policy"
          className="hover:text-purple-medium transition-colors"
        >
          Privacy Policy
        </a>
        <a
          href="/cookie-policy"
          className="hover:text-purple-medium transition-colors"
        >
          Cookie Policy
        </a>
      </div>
    </div>
  );
}
