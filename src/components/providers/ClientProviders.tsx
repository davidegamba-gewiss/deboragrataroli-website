'use client';

import { GlobalSettingsProvider, type GlobalSettings } from '@/context/GlobalSettingsContext';
import { CookieProvider } from '@/context/CookieContext';
import CookieBanner from '@/components/common/CookieBanner';
import CookiePreferencesModal from '@/components/common/CookiePreferencesModal';
import type { ReactNode } from 'react';

interface ClientProvidersProps {
  children: ReactNode;
  /** Settings loaded from CMS (passed from server component) */
  settings?: Partial<GlobalSettings>;
}

/**
 * ClientProviders
 *
 * Wrapper component for all client-side context providers.
 * Use this in layout.tsx to provide global state to all pages.
 *
 * Includes:
 * - CookieProvider (GDPR cookie consent management)
 * - GlobalSettingsProvider (contact info, social links from CMS)
 * - CookieBanner and CookiePreferencesModal components
 */
export function ClientProviders({ children, settings }: ClientProvidersProps) {
  return (
    <CookieProvider>
      <GlobalSettingsProvider settings={settings}>
        {children}
        <CookieBanner />
        <CookiePreferencesModal />
      </GlobalSettingsProvider>
    </CookieProvider>
  );
}

export default ClientProviders;
