import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ClientProviders } from '@/components/providers/ClientProviders';
import { NavigationWrapper } from '@/components/layout/NavigationWrapper';
import { Footer } from '@/components/layout/Footer';

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

export const metadata: Metadata = {
  title: {
    default: 'Debora Grataroli',
    template: '%s | Debora Grataroli',
  },
  description: 'Sito ufficiale di Debora Grataroli',
  keywords: ['Debora Grataroli'],
  authors: [{ name: 'Debora Grataroli' }],
  creator: 'Debora Grataroli',
  metadataBase: new URL('https://deboragrataroli.com'),
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    siteName: 'Debora Grataroli',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${inter.variable} ${playfair.variable}`}>
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
