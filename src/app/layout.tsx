import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ClientProviders } from '@/components/providers/ClientProviders';
import { NavigationWrapper } from '@/components/layout/NavigationWrapper';
import { Footer } from '@/components/layout/Footer';
import {
  generateWebsiteSchema,
  generateMusicianSchema,
  JsonLd,
  SITE_CONFIG,
} from '@/lib/seo';
import { getSocialSettings, getContactSettings, getGeneralSettings } from '@/lib/content';

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

// Generate dynamic metadata from CMS
export async function generateMetadata(): Promise<Metadata> {
  const generalSettings = await getGeneralSettings();

  const siteName = generalSettings.site_name || SITE_CONFIG.name;
  const siteDescription = generalSettings.site_description || SITE_CONFIG.description;
  const tagline = generalSettings.tagline || 'Cantautrice e Pianista';

  const defaultDescription =
    'Debora Grataroli, cantautrice e pianista italiana. Scopri i miei brani originali, eventi live e la mia storia musicale.';

  return {
    metadataBase: new URL(SITE_CONFIG.url),
    title: {
      default: `${siteName} – ${tagline}`,
      template: `%s | ${siteName}`,
    },
    description: siteDescription || defaultDescription,
    keywords: [...SITE_CONFIG.keywords],
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: SITE_CONFIG.url,
    },
    openGraph: {
      type: 'website',
      locale: SITE_CONFIG.locale,
      url: SITE_CONFIG.url,
      siteName: siteName,
      title: `${siteName} – ${tagline}`,
      description: siteDescription || defaultDescription,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${siteName} – ${tagline}`,
      description: siteDescription || defaultDescription,
      creator: SITE_CONFIG.twitterHandle,
    },
    icons: generalSettings.favicon
      ? {
          icon: generalSettings.favicon,
          apple: generalSettings.favicon,
        }
      : undefined,
  };
}

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

  // Load all settings from CMS
  const [socialSettings, contactSettings, generalSettings] = await Promise.all([
    getSocialSettings(),
    getContactSettings(),
    getGeneralSettings(),
  ]);

  // Map CMS settings to GlobalSettings format
  const cmsSettings = {
    // General settings
    siteName: generalSettings.site_name,
    tagline: generalSettings.tagline,
    siteDescription: generalSettings.site_description,
    logo: generalSettings.logo,
    favicon: generalSettings.favicon,
    // Contact settings
    emailContatto: contactSettings.email,
    telefonoContatto: contactSettings.telefono,
    // Social settings
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
          <main id="main-content" className="flex-1" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
