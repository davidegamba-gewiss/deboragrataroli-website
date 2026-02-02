'use client';

import { createContext, useContext, type ReactNode } from 'react';

/**
 * Global Settings Interface
 *
 * Contains site-wide settings like contact info and social links.
 * Will be expanded in Phase 3 to read from CMS.
 */
export interface GlobalSettings {
  emailContatto: string;
  telefonoContatto?: string;
  socialInstagram?: string;
  socialFacebook?: string;
  socialYoutube?: string;
  socialTiktok?: string;
  socialSpotify?: string;
}

/**
 * Default settings values
 * These serve as fallbacks when CMS data is not available
 */
const defaultSettings: GlobalSettings = {
  emailContatto: 'debora.grataroli@gmail.com',
  socialInstagram: 'https://instagram.com/deboragrataroli',
  socialFacebook: 'https://facebook.com/deboragrataroli',
  socialYoutube: 'https://youtube.com/@deboragrataroli',
  socialTiktok: 'https://tiktok.com/@deboragrataroli',
  socialSpotify: 'https://open.spotify.com/artist/deboragrataroli',
};

/**
 * Global Settings Context
 */
const GlobalSettingsContext = createContext<GlobalSettings>(defaultSettings);

/**
 * Props for GlobalSettingsProvider
 */
interface GlobalSettingsProviderProps {
  children: ReactNode;
  settings?: Partial<GlobalSettings>;
}

/**
 * GlobalSettingsProvider
 *
 * Provides global site settings to all child components.
 * Settings can be overridden by passing a settings prop (for CMS integration).
 */
export function GlobalSettingsProvider({
  children,
  settings,
}: GlobalSettingsProviderProps) {
  const mergedSettings: GlobalSettings = {
    ...defaultSettings,
    ...settings,
  };

  return (
    <GlobalSettingsContext.Provider value={mergedSettings}>
      {children}
    </GlobalSettingsContext.Provider>
  );
}

/**
 * useGlobalSettings Hook
 *
 * Access global settings from any component.
 */
export function useGlobalSettings(): GlobalSettings {
  const context = useContext(GlobalSettingsContext);
  if (!context) {
    throw new Error('useGlobalSettings must be used within a GlobalSettingsProvider');
  }
  return context;
}

export default GlobalSettingsContext;
