'use client';

import { createContext, useContext, type ReactNode } from 'react';

/**
 * Global Settings Interface
 *
 * Contains site-wide settings including general info, contact, and social links.
 * Loaded from CMS settings collections.
 */
export interface GlobalSettings {
  // General settings
  siteName?: string;
  tagline?: string;
  siteDescription?: string;
  logo?: string;
  favicon?: string;
  // Contact settings
  emailContatto: string;
  telefonoContatto?: string;
  // Social settings
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
  siteName: 'Debora Grataroli',
  tagline: 'Cantautrice e Pianista',
  siteDescription: 'Sito ufficiale di Debora Grataroli, cantautrice e pianista italiana.',
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
