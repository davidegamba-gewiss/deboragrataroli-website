import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageLayout } from '@/components/layout/PageLayout';
import { BranoDetailLayout, BranoCard } from '@/components/brani';
import { getBranoData, getAllBraniSlugs, getAllBraniData, getLabelsSettings } from '@/lib/content';
import { ROUTES } from '@/utils/routing';
import { generatePageMetadata, generateSongSchema, generateBreadcrumbSchema, JsonLd } from '@/lib/seo';
import { Breadcrumb } from '@/components/seo/Breadcrumb';

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
      alt: `Cover ufficiale del brano ${brano.titolo} di Debora Grataroli`,
    },
    type: 'music.song',
  });
}

export default async function BranoDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [brano, allBrani, labelsSettings] = await Promise.all([
    getBranoData(slug),
    getAllBraniData(),
    getLabelsSettings(),
  ]);

  if (!brano) {
    notFound();
  }

  // Get related brani (exclude current, take up to 3)
  const altriBrani = allBrani
    .filter((b) => b.slug !== slug)
    .slice(0, 3);

  // Generate structured data
  const songSchema = generateSongSchema({
    name: brano.titolo,
    url: `/brani/${slug}`,
    image: brano.cover,
    album: brano.categoria,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'I Miei Brani', url: '/brani' },
    { name: brano.titolo, url: `/brani/${slug}` },
  ]);

  return (
    <PageLayout showDecorative>
      {/* Structured Data */}
      <JsonLd data={[songSchema, breadcrumbSchema]} />

      {/* Visual Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'I Miei Brani', href: '/brani' },
          { label: brano.titolo, href: `/brani/${slug}` },
        ]}
      />

      {/* Brano Detail */}
      <BranoDetailLayout
        brano={brano}
        descriptionLabel={labelsSettings.brano_description_label}
        lyricsLabel={labelsSettings.brano_lyrics_label}
      />

      {/* Altri Brani Section - Internal Linking */}
      {altriBrani.length > 0 && (
        <section className="mt-16 pt-12 border-t border-neutral-light">
          <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-purple-dark mb-8 text-center">
            Altri brani
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {altriBrani.map((altroBrano) => (
              <BranoCard
                key={altroBrano.id}
                id={altroBrano.id}
                titolo={altroBrano.titolo}
                slug={altroBrano.slug}
                cover={altroBrano.cover}
                categoria={altroBrano.categoria}
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href={ROUTES.BRANI}
              className="inline-flex items-center gap-2 text-purple-medium hover:text-purple-dark transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 rounded"
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
              Torna a tutti i brani
            </Link>
          </div>
        </section>
      )}
    </PageLayout>
  );
}
