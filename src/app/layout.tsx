import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ClientProviders } from '@/components/providers/ClientProviders';
import { NavigationWrapper } from '@/components/layout/NavigationWrapper';
import { Footer } from '@/components/layout/Footer';
import {
  generateBaseMetadata,
  generateWebsiteSchema,
  generateMusicianSchema,
  JsonLd,
} from '@/lib/seo';
import { getSocialSettings, getContactSettings } from '@/lib/content';

// Configure Inter font (primary font)
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
});

// Configure Playfair Display font (accent font for quotes/emphasis)
const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

// Generate base metadata from SEO library
export const metadata: Metadata = generateBaseMetadata();

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#7b4397',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate structured data for the entire site
  const websiteSchema = generateWebsiteSchema();
  const musicianSchema = generateMusicianSchema();

  // Load settings from CMS
  const [socialSettings, contactSettings] = await Promise.all([
    getSocialSettings(),
    getContactSettings(),
  ]);

  // Map CMS settings to GlobalSettings format
  const cmsSettings = {
    emailContatto: contactSettings.email,
    telefonoContatto: contactSettings.telefono,
    socialInstagram: socialSettings.instagram,
    socialFacebook: socialSettings.facebook,
    socialYoutube: socialSettings.youtube,
    socialTiktok: socialSettings.tiktok,
    socialSpotify: socialSettings.spotify,
  };

  return (
    <html lang="it" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Structured Data (JSON-LD) */}
        <JsonLd data={[websiteSchema, musicianSchema]} />
      </head>
      <body className="min-h-screen flex flex-col bg-white antialiased overflow-x-hidden">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-purple-dark focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:outline-none focus:ring-2 focus:ring-purple-light"
        >
          Salta al contenuto principale
        </a>
        <ClientProviders settings={cmsSettings}>
          <NavigationWrapper />
          <main id="main-content" className="flex-1" tabIndex={-1}>{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
