import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageLayout } from '@/components/layout/PageLayout';
import { BranoDetailLayout } from '@/components/brani';
import { getBranoData, getAllBraniSlugs, getLabelsSettings } from '@/lib/content';
import { ROUTES } from '@/utils/routing';
import { generatePageMetadata, generateSongSchema, generateBreadcrumbSchema, JsonLd } from '@/lib/seo';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all brani
export async function generateStaticParams() {
  const slugs = await getAllBraniSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Dynamic metadata based on brano
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brano = await getBranoData(slug);

  if (!brano) {
    return {
      title: 'Brano non trovato',
      robots: { index: false, follow: false },
    };
  }

  return generatePageMetadata({
    title: brano.titolo,
    description: brano.descrizione || `Ascolta "${brano.titolo}" di Debora Grataroli. ${brano.categoria || 'Brano originale'}.`,
    path: `/brani/${slug}`,
    keywords: [brano.titolo, brano.categoria || 'brano', 'canzone italiana'],
    image: {
      url: brano.cover,
      alt: `Cover di ${brano.titolo}`,
    },
    type: 'music.song',
  });
}

export default async function BranoDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [brano, labelsSettings] = await Promise.all([
    getBranoData(slug),
    getLabelsSettings(),
  ]);

  if (!brano) {
    notFound();
  }

  // Generate structured data
  const songSchema = generateSongSchema({
    name: brano.titolo,
    url: `/brani/${slug}`,
    image: brano.cover,
    album: brano.categoria,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Brani', url: '/brani' },
    { name: brano.titolo, url: `/brani/${slug}` },
  ]);

  return (
    <PageLayout showDecorative>
      {/* Structured Data */}
      <JsonLd data={[songSchema, breadcrumbSchema]} />

      {/* Back Link */}
      <nav className="mb-8">
        <Link
          href={ROUTES.BRANI}
          className="inline-flex items-center gap-2 text-purple-medium hover:text-purple-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 rounded"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Torna ai brani
        </Link>
      </nav>

      {/* Brano Detail */}
      <BranoDetailLayout
        brano={brano}
        descriptionLabel={labelsSettings.brano_description_label}
        lyricsLabel={labelsSettings.brano_lyrics_label}
      />
    </PageLayout>
  );
}
