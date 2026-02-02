'use client';

import type { MainContentProps } from '@/types/layout';

/**
 * MainContent Component
 *
 * Wrapper component for main page content with responsive padding and max-width.
 * Features:
 * - Max-width container (default: 1280px)
 * - Responsive horizontal padding: 16px (mobile), 24px (tablet), 32px (desktop)
 * - Responsive vertical padding: 64px (mobile), 96px (desktop)
 * - Centered layout with auto margins
 */
export function MainContent({
  children,
  maxWidth = '1280px',
  withVerticalPadding = true,
}: MainContentProps) {
  return (
    <div
      className={`
        w-full mx-auto
        px-4 md:px-6 lg:px-8
        ${withVerticalPadding ? 'py-16 lg:py-24' : ''}
      `}
      style={{ maxWidth }}
    >
      {children}
    </div>
  );
}

export default MainContent;
