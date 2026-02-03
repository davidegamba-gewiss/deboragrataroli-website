'use client';

import { GlobalSettingsProvider } from '@/context/GlobalSettingsContext';
import { CookieProvider } from '@/context/CookieContext';
import CookieBanner from '@/components/common/CookieBanner';
import CookiePreferencesModal from '@/components/common/CookiePreferencesModal';
import type { ReactNode } from 'react';

interface ClientProvidersProps {
  children: ReactNode;
}

/**
 * ClientProviders
 *
 * Wrapper component for all client-side context providers.
 * Use this in layout.tsx to provide global state to all pages.
 *
 * Includes:
 * - CookieProvider (GDPR cookie consent management)
 * - GlobalSettingsProvider (contact info, social links)
 * - CookieBanner and CookiePreferencesModal components
 */
export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <CookieProvider>
      <GlobalSettingsProvider>
        {children}
        <CookieBanner />
        <CookiePreferencesModal />
      </GlobalSettingsProvider>
    </CookieProvider>
  );
}

export default ClientProviders;
