import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageLayout } from '@/components/layout/PageLayout';
import { BranoDetailLayout } from '@/components/brani';
import { getBrano, getAllBraniSlugs } from '@/utils/braniData';
import { ROUTES } from '@/utils/routing';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths for all brani
export async function generateStaticParams() {
  const slugs = getAllBraniSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Dynamic metadata based on brano
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brano = getBrano(slug);

  if (!brano) {
    return {
      title: 'Brano non trovato - Debora Grataroli',
    };
  }

  return {
    title: `${brano.titolo} - Debora Grataroli`,
    description: brano.descrizione,
    openGraph: {
      title: brano.titolo,
      description: brano.descrizione,
      images: [{ url: brano.cover }],
      type: 'music.song',
    },
  };
}

export default async function BranoDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const brano = getBrano(slug);

  if (!brano) {
    notFound();
  }

  return (
    <PageLayout showDecorative>
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
      <BranoDetailLayout brano={brano} />
    </PageLayout>
  );
}
