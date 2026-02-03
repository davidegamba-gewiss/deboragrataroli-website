/**
 * Google Analytics integration
 * Only initializes when user consents to analytics cookies
 */

// Google Analytics Measurement ID - replace with actual ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// Extend Window interface for gtag
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let isInitialized = false;

/**
 * Initialize Google Analytics
 * Should only be called after user consent
 */
export function initializeGoogleAnalytics(): void {
  if (typeof window === 'undefined') return;
  if (isInitialized) return;
  if (GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    console.log('[GA] Analytics not configured - skipping initialization');
    return;
  }

  try {
    // Create and append gtag script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };

    // Configure gtag
    window.gtag('js', new Date());
    window.gtag('config', GA_MEASUREMENT_ID, {
      anonymize_ip: true, // GDPR compliance
      cookie_flags: 'SameSite=None;Secure',
      send_page_view: true,
    });

    isInitialized = true;
    console.log('[GA] Google Analytics initialized');
  } catch (error) {
    console.error('[GA] Failed to initialize Google Analytics:', error);
  }
}

/**
 * Track page view
 */
export function trackPageView(path: string, title?: string): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  if (!isInitialized) return;

  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: title,
  });
}

/**
 * Track custom event
 */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  if (!isInitialized) return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
}

/**
 * Disable Google Analytics (revoke consent)
 */
export function disableGoogleAnalytics(): void {
  if (typeof window === 'undefined') return;

  // Set opt-out cookie
  const optOutKey = `ga-disable-${GA_MEASUREMENT_ID}`;
  (window as unknown as Record<string, boolean>)[optOutKey] = true;

  console.log('[GA] Google Analytics disabled');
}

/**
 * Check if Google Analytics is initialized
 */
export function isGoogleAnalyticsInitialized(): boolean {
  return isInitialized;
}
