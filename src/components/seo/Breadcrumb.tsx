'use client';

import Link from 'next/link';
import Script from 'next/script';
import { SITE_CONFIG } from '@/lib/seo';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

/**
 * Breadcrumb Component
 *
 * Renders a navigation breadcrumb with semantic HTML and JSON-LD structured data.
 * Features:
 * - Accessible nav element with aria-label
 * - Ordered list structure for screen readers
 * - Visual separators between items
 * - Current page marked with aria-current
 * - JSON-LD BreadcrumbList schema for Google
 */
export function Breadcrumb({ items }: BreadcrumbProps) {
  if (items.length < 2) return null;

  // Generate JSON-LD structured data
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${SITE_CONFIG.url}${item.href === '/' ? '' : item.href}`,
    })),
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Visual Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 text-sm text-neutral-dark/60"
      >
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={item.href} className="flex items-center">
                {isLast ? (
                  <span
                    aria-current="page"
                    className="text-purple-medium font-medium"
                  >
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.href}
                      className="hover:text-purple-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 rounded"
                    >
                      {item.label}
                    </Link>
                    <span
                      className="mx-2 text-neutral-dark/40 select-none"
                      aria-hidden="true"
                    >
                      ›
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

export default Breadcrumb;
