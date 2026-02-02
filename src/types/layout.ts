/**
 * Layout Types
 *
 * Type definitions for page layout components.
 */

import type { ReactNode } from 'react';

/**
 * HeroSectionProps
 *
 * Props for the HeroSection component.
 */
export interface HeroSectionProps {
  /** URL of the hero image (16:9 aspect ratio recommended) */
  imageSrc: string;
  /** Main title displayed centered over the image */
  title: string;
  /** Optional subtitle below the title */
  subtitle?: string;
  /** Alt text for the hero image (required for accessibility) */
  imageAlt: string;
}

/**
 * HeroSkeletonProps
 *
 * Props for the HeroSkeleton loading component.
 */
export interface HeroSkeletonProps {
  /** Optional custom height class */
  heightClass?: string;
}

/**
 * MainContentProps
 *
 * Props for the MainContent wrapper component.
 */
export interface MainContentProps {
  /** Content to render inside the main area */
  children: ReactNode;
  /** Maximum width of the content container (default: 1280px) */
  maxWidth?: string;
  /** Custom padding overrides */
  padding?: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  /** Whether to add vertical padding (default: true) */
  withVerticalPadding?: boolean;
}

/**
 * PageLayoutProps
 *
 * Props for the main PageLayout component.
 */
export interface PageLayoutProps {
  /** Optional hero section configuration */
  hero?: HeroSectionProps;
  /** Page content */
  children: ReactNode;
  /** Whether to show decorative background elements (default: false) */
  showDecorative?: boolean;
}

/**
 * DecorativeElementsProps
 *
 * Props for the DecorativeElements component.
 */
export interface DecorativeElementsProps {
  /** Custom opacity for the decorative elements (default: 0.1) */
  opacity?: number;
  /** Whether to animate the elements (default: true) */
  animate?: boolean;
}
