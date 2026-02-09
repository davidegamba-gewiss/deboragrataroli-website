import type { Metadata } from 'next';
import { PageLayout } from '@/components/layout/PageLayout';
import { BranoListGrid } from '@/components/brani';
import { getAllBraniData, getBraniPage } from '@/lib/content';
import { generatePageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const pageContent = await getBraniPage();
  return generatePageMetadata({
    title: pageContent?.frontmatter.title || 'I Miei Brani',
    description:
      pageContent?.frontmatter.seo_description ||
      'Scopri il catalogo completo dei brani originali di Debora Grataroli.',
    path: '/brani',
    keywords: ['brani originali', 'canzoni italiane', 'musica cantautoriale', 'discografia'],
    type: 'music.album',
  });
}

export default async function BraniPage() {
  const [brani, pageContent] = await Promise.all([getAllBraniData(), getBraniPage()]);

  const title = pageContent?.frontmatter.title || 'I Miei Brani';
  const subtitle = pageContent?.frontmatter.hero_subtitle || 'Ascolta la mia musica';
  const heroImage = pageContent?.frontmatter.hero_image || '/images/hero-brani.jpg';

  return (
    <PageLayout
      hero={{
        imageSrc: heroImage,
        title: title,
        subtitle: subtitle,
        imageAlt: title,
      }}
    >
      <section className="py-16 lg:py-24">
        {/* Section Header */}
        <header className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-purple-dark mb-4">
            {title}
          </h2>
          {pageContent?.htmlContent && (
            <div
              className="text-neutral-dark/70 text-base md:text-lg max-w-2xl mx-auto prose prose-purple"
              dangerouslySetInnerHTML={{ __html: pageContent.htmlContent }}
            />
          )}
          {!pageContent?.htmlContent && (
            <p className="text-neutral-dark/70 text-base md:text-lg max-w-2xl mx-auto">
              Scopri il catalogo completo dei miei brani originali
            </p>
          )}
        </header>

        {/* Brani Grid */}
        <BranoListGrid brani={brani} />
      </section>
    </PageLayout>
  );
}
