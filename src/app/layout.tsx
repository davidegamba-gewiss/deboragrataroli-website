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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate structured data for the entire site
  const websiteSchema = generateWebsiteSchema();
  const musicianSchema = generateMusicianSchema();

  return (
    <html lang="it" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Structured Data (JSON-LD) */}
        <JsonLd data={[websiteSchema, musicianSchema]} />
      </head>
      <body className="min-h-screen flex flex-col bg-white antialiased">
        <ClientProviders>
          <NavigationWrapper />
          <main className="flex-1">{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
