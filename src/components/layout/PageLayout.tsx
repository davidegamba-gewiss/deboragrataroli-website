'use client';

import type { PageLayoutProps } from '@/types/layout';
import { HeroSection } from '@/components/common/HeroSection';
import { DecorativeElements } from '@/components/common/DecorativeElements';
import { MainContent } from './MainContent';

/**
 * PageLayout Component
 *
 * Reusable page layout wrapper that provides consistent structure.
 * Features:
 * - Optional hero section with image and title
 * - Main content area with responsive padding
 * - Optional decorative background elements
 * - Semantic HTML structure for accessibility
 *
 * Note: Header and Footer are handled by RootLayout,
 * so this component only manages the page-specific content.
 */
export function PageLayout({
  hero,
  children,
  showDecorative = false,
}: PageLayoutProps) {
  return (
    <>
      {/* Decorative elements (behind content) */}
      {showDecorative && <DecorativeElements />}

      {/* Hero Section (optional) */}
      {hero && (
        <HeroSection
          imageSrc={hero.imageSrc}
          title={hero.title}
          subtitle={hero.subtitle}
          imageAlt={hero.imageAlt}
        />
      )}

      {/* Main Content Area */}
      <MainContent>
        {children}
      </MainContent>
    </>
  );
}

export default PageLayout;
