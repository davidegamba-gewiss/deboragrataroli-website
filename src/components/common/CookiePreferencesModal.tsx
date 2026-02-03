'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useCookieConsent, type CookieConsent } from '@/context/CookieContext';
import ToggleSwitch from './ToggleSwitch';

interface CookieCategory {
  key: keyof CookieConsent;
  label: string;
  description: string;
  info: string;
  disabled?: boolean;
}

const cookieCategories: CookieCategory[] = [
  {
    key: 'necessary',
    label: 'Cookie Necessari',
    description: 'Necessari per il funzionamento del sito',
    info: 'Non possono essere disabilitati',
    disabled: true,
  },
  {
    key: 'analytics',
    label: 'Cookie Analitici',
    description: 'Google Analytics per analizzare il traffico',
    info: 'Ci aiutano a migliorare il sito',
  },
  {
    key: 'marketing',
    label: 'Cookie Marketing',
    description: 'Per misurare il successo delle campagne',
    info: 'Completamente facoltativi',
  },
  {
    key: 'preferences',
    label: 'Cookie Preferenze',
    description: 'Per ricordare le tue scelte',
    info: 'Nessun tracciamento',
  },
];

export default function CookiePreferencesModal() {
  const {
    consent,
    setConsent,
    acceptAll,
    showPreferencesModal,
    setShowPreferencesModal,
  } = useCookieConsent();

  // Local state for unsaved changes
  const [localConsent, setLocalConsent] = useState<CookieConsent>(consent);

  // Animation states
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Ref for focus trap
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const lastFocusableRef = useRef<HTMLButtonElement>(null);

  // Sync local state when consent changes or modal opens
  useEffect(() => {
    if (showPreferencesModal) {
      setLocalConsent(consent);
    }
  }, [consent, showPreferencesModal]);

  // Handle animation states
  useEffect(() => {
    if (showPreferencesModal) {
      setShouldRender(true);
      const timer = setTimeout(() => {
        setIsAnimating(true);
        // Focus first element
        firstFocusableRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [showPreferencesModal]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!showPreferencesModal) return;

      // Close on Escape
      if (e.key === 'Escape') {
        setShowPreferencesModal(false);
        return;
      }

      // Focus trap
      if (e.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showPreferencesModal, setShowPreferencesModal]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showPreferencesModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showPreferencesModal]);

  // Handle toggle change
  const handleToggle = useCallback((key: keyof CookieConsent, enabled: boolean) => {
    setLocalConsent((prev) => ({
      ...prev,
      [key]: enabled,
    }));
  }, []);

  // Save preferences
  const handleSave = useCallback(() => {
    setConsent(localConsent);
  }, [localConsent, setConsent]);

  // Accept all and close
  const handleAcceptAll = useCallback(() => {
    acceptAll();
  }, [acceptAll]);

  // Close modal
  const handleClose = useCallback(() => {
    setShowPreferencesModal(false);
  }, [setShowPreferencesModal]);

  // Handle overlay click
  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }, [handleClose]);

  if (!shouldRender) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-prefs-title"
      aria-describedby="cookie-prefs-description"
      className={`
        fixed inset-0 z-[60] flex items-center justify-center p-4
        transition-opacity duration-300
        ${isAnimating ? 'opacity-100' : 'opacity-0'}
      `}
      onClick={handleOverlayClick}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70"
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className={`
          relative bg-white rounded-lg shadow-2xl
          w-full sm:w-[500px] max-h-[80vh] overflow-y-auto
          p-6 sm:p-8
          transform transition-transform duration-300
          ${isAnimating ? 'scale-100' : 'scale-95'}
        `}
      >
        {/* Close button */}
        <button
          ref={firstFocusableRef}
          type="button"
          onClick={handleClose}
          className="
            absolute top-4 right-4
            text-gray-400 hover:text-gray-900
            transition-colors
            focus:outline-none focus-visible:ring-2
            focus-visible:ring-purple-medium focus-visible:ring-offset-2
          "
          aria-label="Chiudi"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <h2
          id="cookie-prefs-title"
          className="font-display text-2xl sm:text-[28px] text-purple-dark mb-2"
        >
          Preferenze Cookie
        </h2>

        <p
          id="cookie-prefs-description"
          className="text-sm text-gray-600 mb-6"
        >
          Personalizza le tue preferenze sui cookie. I cookie necessari sono sempre
          attivi per garantire il funzionamento del sito.
        </p>

        {/* Cookie categories */}
        <div className="space-y-4 mb-6">
          {cookieCategories.map((category) => (
            <div
              key={category.key}
              className="
                bg-gray-50 rounded p-4
                hover:bg-gray-100 transition-colors
              "
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <label
                    htmlFor={`cookie-toggle-${category.key}`}
                    className="text-base sm:text-lg font-semibold text-gray-900 cursor-pointer"
                  >
                    {category.label}
                  </label>
                  <p className="text-sm text-gray-600 mt-1">
                    {category.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {category.info}
                  </p>
                </div>

                <div className="flex-shrink-0 pt-1">
                  <ToggleSwitch
                    id={`cookie-toggle-${category.key}`}
                    enabled={localConsent[category.key]}
                    onChange={(enabled) => handleToggle(category.key, enabled)}
                    disabled={category.disabled}
                    ariaLabel={`${category.disabled ? 'Sempre attivo: ' : ''}${category.label}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={handleSave}
            className="
              w-full bg-purple-dark text-white
              py-3 px-8 text-sm font-semibold
              rounded transition-colors
              hover:bg-purple-medium
              focus:outline-none focus-visible:ring-2
              focus-visible:ring-purple-medium focus-visible:ring-offset-2
            "
          >
            Salva preferenze
          </button>

          <button
            ref={lastFocusableRef}
            type="button"
            onClick={handleAcceptAll}
            className="
              w-full bg-gray-100 text-gray-900
              border border-gray-300
              py-3 px-8 text-sm font-semibold
              rounded transition-colors
              hover:bg-gray-200
              focus:outline-none focus-visible:ring-2
              focus-visible:ring-purple-medium focus-visible:ring-offset-2
            "
          >
            Accetta tutto
          </button>
        </div>

        {/* Policy links */}
        <div className="mt-6 pt-4 border-t border-gray-200 text-center">
          <div className="text-xs text-gray-500 flex gap-4 justify-center">
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
      </div>
    </div>
  );
}
