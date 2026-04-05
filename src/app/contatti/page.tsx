import type { Metadata } from 'next';
import { PageLayout } from '@/components/layout/PageLayout';
import { ContactForm } from '@/components/contatti';
import { getContattiPage, getContactSettings, getSocialSettings } from '@/lib/content';
import { generatePageMetadata } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const pageContent = await getContattiPage();
  const base = generatePageMetadata({
    title: pageContent?.frontmatter.title || 'Contatti',
    description:
      pageContent?.frontmatter.seo_description ||
      'Contatta Debora Grataroli per collaborazioni, concerti e informazioni. Scrivici tramite il form o via email.',
    path: '/contatti',
    keywords: ['contatti', 'email', 'collaborazioni', 'eventi', 'booking'],
  });
  return {
    ...base,
    robots: {
      index: true,
      follow: true,
      noarchive: true,
    },
  };
}

export default async function ContattiPage() {
  const [pageContent, contactSettings, socialSettings] = await Promise.all([
    getContattiPage(),
    getContactSettings(),
    getSocialSettings(),
  ]);

  const title = pageContent?.frontmatter.title || 'Contatti';
  const subtitle = pageContent?.frontmatter.hero_subtitle || '';
  const heroImage = pageContent?.frontmatter.hero_image || '/images/hero-contatti.jpg';
  const email = contactSettings.email || 'debora.grataroli@gmail.com';
  const contactInfoTitle = pageContent?.frontmatter.contact_info_title && pageContent.frontmatter.contact_info_title.trim()
    ? pageContent.frontmatter.contact_info_title
    : 'Parliamo!';
  const contactFormTitle = pageContent?.frontmatter.contact_form_title && pageContent.frontmatter.contact_form_title.trim()
    ? pageContent.frontmatter.contact_form_title
    : 'Inviami un messaggio';

  return (
    <PageLayout
      hero={{
        imageSrc: heroImage,
        title: title,
        subtitle: subtitle,
        imageAlt: `Debora Grataroli – ${title}`,
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <section aria-labelledby="contact-info-title">
          <h2 id="contact-info-title" className="text-2xl font-semibold text-gray-900 mb-6">{contactInfoTitle}</h2>

          {pageContent?.htmlContent ? (
            <div
              className="text-gray-600 mb-8 prose prose-purple"
              dangerouslySetInnerHTML={{ __html: pageContent.htmlContent }}
            />
          ) : (
            <p className="text-gray-600 mb-8">
              Hai una domanda, vuoi organizzare un evento o semplicemente scambiare due parole
              sulla musica? Non esitare a contattarmi!
            </p>
          )}

          {/* Contact Info with address tag for semantic SEO */}
          <address className="not-italic mb-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Email
            </h3>
            <a
              href={`mailto:${email}`}
              className="text-lg text-purple-medium hover:text-purple-dark transition-colors"
            >
              {email}
            </a>
          </address>

          {/* Social Links */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Seguimi sui social
            </h3>
            <div className="flex gap-4">
              {socialSettings.instagram && (
                <a
                  href={socialSettings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-purple-light/20 flex items-center justify-center text-purple-medium hover:bg-purple-medium hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              )}
              {socialSettings.facebook && (
                <a
                  href={socialSettings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-purple-light/20 flex items-center justify-center text-purple-medium hover:bg-purple-medium hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}
              {socialSettings.youtube && (
                <a
                  href={socialSettings.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-purple-light/20 flex items-center justify-center text-purple-medium hover:bg-purple-medium hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              )}
              {socialSettings.tiktok && (
                <a
                  href={socialSettings.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-purple-light/20 flex items-center justify-center text-purple-medium hover:bg-purple-medium hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2"
                  aria-label="TikTok"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </a>
              )}
              {socialSettings.spotify && (
                <a
                  href={socialSettings.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-purple-light/20 flex items-center justify-center text-purple-medium hover:bg-purple-medium hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2"
                  aria-label="Spotify"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* For Events */}
          <div className="p-6 bg-purple-light/10 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">Per eventi e collaborazioni</h3>
            <p className="text-gray-600 text-sm">
              Se sei interessato a organizzare un evento o una collaborazione musicale, compila il
              form o contattami direttamente via email specificando i dettagli della tua richiesta.
            </p>
          </div>
        </section>

        {/* Contact Form */}
        <section aria-labelledby="contact-form-title">
          <h2 id="contact-form-title" className="text-2xl font-semibold text-gray-900 mb-6">{contactFormTitle}</h2>

          <ContactForm />
        </section>
      </div>
    </PageLayout>
  );
}
