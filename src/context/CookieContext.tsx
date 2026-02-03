'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import {
  getCookieConsent,
  saveCookieConsent,
  defaultConsent,
  fullConsent,
  type CookieConsent,
} from '@/utils/cookieStorage';
import {
  initializeGoogleAnalytics,
  disableGoogleAnalytics,
} from '@/lib/googleAnalytics';

interface CookieContextType {
  /** Current consent state */
  consent: CookieConsent;
  /** Update consent preferences */
  setConsent: (consent: CookieConsent) => void;
  /** Accept all cookies */
  acceptAll: () => void;
  /** Reject all optional cookies */
  rejectAll: () => void;
  /** Whether the banner should be visible */
  isBannerVisible: boolean;
  /** Hide the banner */
  hideBanner: () => void;
  /** Show the banner again */
  showBanner: () => void;
  /** Whether preferences modal is open */
  showPreferencesModal: boolean;
  /** Open/close preferences modal */
  setShowPreferencesModal: (show: boolean) => void;
  /** Whether consent has been given */
  hasConsented: boolean;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

interface CookieProviderProps {
  children: ReactNode;
}

export function CookieProvider({ children }: CookieProviderProps) {
  // Consent state
  const [consent, setConsentState] = useState<CookieConsent>(defaultConsent);

  // UI state
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Initialize from localStorage on mount (client-side only)
  useEffect(() => {
    const storedConsent = getCookieConsent();

    if (storedConsent) {
      setConsentState(storedConsent);
      setHasConsented(true);
      setIsBannerVisible(false);

      // Initialize analytics if previously consented
      if (storedConsent.analytics) {
        initializeGoogleAnalytics();
      }
    } else {
      setIsBannerVisible(true);
    }

    setIsHydrated(true);
  }, []);

  // Handle consent changes
  const handleSetConsent = useCallback((newConsent: CookieConsent) => {
    // Ensure necessary is always true
    const finalConsent: CookieConsent = {
      ...newConsent,
      necessary: true,
    };

    setConsentState(finalConsent);
    saveCookieConsent(finalConsent);
    setHasConsented(true);
    setIsBannerVisible(false);
    setShowPreferencesModal(false);

    // Handle analytics consent change
    if (finalConsent.analytics) {
      initializeGoogleAnalytics();
    } else {
      disableGoogleAnalytics();
    }
  }, []);

  // Accept all cookies
  const acceptAll = useCallback(() => {
    handleSetConsent(fullConsent);
  }, [handleSetConsent]);

  // Reject all optional cookies
  const rejectAll = useCallback(() => {
    handleSetConsent(defaultConsent);
  }, [handleSetConsent]);

  // Banner visibility controls
  const hideBanner = useCallback(() => {
    setIsBannerVisible(false);
  }, []);

  const showBanner = useCallback(() => {
    setIsBannerVisible(true);
  }, []);

  // Don't render children until hydrated to prevent mismatch
  // But we still provide context to avoid errors
  const value: CookieContextType = {
    consent,
    setConsent: handleSetConsent,
    acceptAll,
    rejectAll,
    isBannerVisible: isHydrated ? isBannerVisible : false,
    hideBanner,
    showBanner,
    showPreferencesModal,
    setShowPreferencesModal,
    hasConsented,
  };

  return (
    <CookieContext.Provider value={value}>
      {children}
    </CookieContext.Provider>
  );
}

/**
 * Hook to access cookie consent context
 */
export function useCookieConsent(): CookieContextType {
  const context = useContext(CookieContext);

  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieProvider');
  }

  return context;
}

export type { CookieConsent };
