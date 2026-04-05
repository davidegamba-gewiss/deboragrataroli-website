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
      'Ascolta i brani originali di Debora Grataroli. Musica italiana d\'autore con testi originali e arrangiamenti per pianoforte.',
    path: '/brani',
    keywords: ['brani originali', 'canzoni italiane', 'musica cantautoriale', 'discografia'],
    type: 'music.album',
  });
}

export default async function BraniPage() {
  const [brani, pageContent] = await Promise.all([getAllBraniData(), getBraniPage()]);

  const title = pageContent?.frontmatter.title || 'I Miei Brani';
  const subtitle = pageContent?.frontmatter.hero_subtitle || '';
  const heroImage = pageContent?.frontmatter.hero_image || '/images/hero-brani.jpg';

  return (
    <PageLayout
      hero={{
        imageSrc: heroImage,
        title: title,
        subtitle: subtitle,
        imageAlt: `Debora Grataroli – ${title}`,
      }}
    >
      <section className="py-16 lg:py-24" aria-labelledby="brani-intro">
        {/* Section Intro - no redundant heading since H1 is in hero */}
        <div className="text-center mb-12">
          {pageContent?.htmlContent && (
            <div
              id="brani-intro"
              className="text-neutral-dark/70 text-base md:text-lg max-w-2xl mx-auto prose prose-purple"
              dangerouslySetInnerHTML={{ __html: pageContent.htmlContent }}
            />
          )}
          {!pageContent?.htmlContent && (
            <p id="brani-intro" className="text-neutral-dark/70 text-base md:text-lg max-w-2xl mx-auto">
              Scopri il catalogo completo dei miei brani originali
            </p>
          )}
        </div>

        {/* Brani Grid */}
        <BranoListGrid brani={brani} />
      </section>
    </PageLayout>
  );
}
