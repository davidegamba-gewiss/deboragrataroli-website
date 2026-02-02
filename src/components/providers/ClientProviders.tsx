'use client';

import { GlobalSettingsProvider } from '@/context/GlobalSettingsContext';
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
 * - GlobalSettingsProvider (contact info, social links)
 * - Future providers can be added here
 */
export function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <GlobalSettingsProvider>
      {children}
    </GlobalSettingsProvider>
  );
}

export default ClientProviders;
