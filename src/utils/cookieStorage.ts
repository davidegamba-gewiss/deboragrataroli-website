/**
 * Cookie consent storage utilities
 * GDPR-compliant cookie preference management
 */

export interface CookieConsent {
  necessary: boolean; // Always true (required for site function)
  analytics: boolean; // Google Analytics
  marketing: boolean; // Conversion tracking
  preferences: boolean; // User preferences storage
}

const COOKIE_CONSENT_KEY = 'cookie-consent';
const COOKIE_CONSENT_VERSION = '1.0'; // Bump to force re-consent

interface StoredConsent {
  consent: CookieConsent;
  version: string;
  timestamp: number;
}

/**
 * Default consent state (only necessary cookies enabled)
 */
export const defaultConsent: CookieConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

/**
 * Full consent state (all cookies enabled)
 */
export const fullConsent: CookieConsent = {
  necessary: true,
  analytics: true,
  marketing: true,
  preferences: true,
};

/**
 * Save cookie consent to localStorage
 */
export function saveCookieConsent(consent: CookieConsent): void {
  if (typeof window === 'undefined') return;

  const storedData: StoredConsent = {
    consent,
    version: COOKIE_CONSENT_VERSION,
    timestamp: Date.now(),
  };

  try {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(storedData));
  } catch (error) {
    console.error('Failed to save cookie consent:', error);
  }
}

/**
 * Get cookie consent from localStorage
 */
export function getCookieConsent(): CookieConsent | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!stored) return null;

    const parsed: StoredConsent = JSON.parse(stored);

    // Check version - if outdated, return null to force re-consent
    if (parsed.version !== COOKIE_CONSENT_VERSION) {
      clearCookieConsent();
      return null;
    }

    return parsed.consent;
  } catch (error) {
    console.error('Failed to read cookie consent:', error);
    return null;
  }
}

/**
 * Clear cookie consent from localStorage
 */
export function clearCookieConsent(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(COOKIE_CONSENT_KEY);
  } catch (error) {
    console.error('Failed to clear cookie consent:', error);
  }
}

/**
 * Check if cookie consent has been given
 */
export function isCookieConsentGiven(): boolean {
  return getCookieConsent() !== null;
}

/**
 * Check if a specific cookie category is allowed
 */
export function isCookieAllowed(category: keyof CookieConsent): boolean {
  const consent = getCookieConsent();
  if (!consent) return category === 'necessary';
  return consent[category];
}

/**
 * Get consent timestamp
 */
export function getConsentTimestamp(): number | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!stored) return null;

    const parsed: StoredConsent = JSON.parse(stored);
    return parsed.timestamp;
  } catch {
    return null;
  }
}
