/**
 * Breakpoints constants - Design System
 * Centralized responsive breakpoint definitions
 *
 * Usage:
 * - Import: import { BREAKPOINTS } from '@/constants/breakpoints'
 * - Media queries: use with MEDIA helpers
 */

/**
 * Main breakpoint configuration
 * Values represent minimum widths for each device category
 */
export const BREAKPOINTS = {
  /** Mobile: up to 767px */
  mobile: '768px',
  /** Tablet: 768px - 1023px */
  tablet: '768px',
  /** Desktop: 1024px and above */
  desktop: '1024px',
  /** Large desktop: 1280px and above */
  largeDesktop: '1280px',
  /** Extra large: 1536px and above */
  extraLarge: '1536px',
} as const;

/**
 * Numeric breakpoint values (for JS calculations)
 */
export const BREAKPOINT_VALUES = {
  mobile: 768,
  tablet: 768,
  desktop: 1024,
  largeDesktop: 1280,
  extraLarge: 1536,
} as const;

/**
 * Tailwind-compatible screen config
 */
export const screens = {
  sm: '640px',
  md: '768px',      // tablet
  lg: '1024px',     // desktop
  xl: '1280px',     // large desktop
  '2xl': '1536px',  // extra large
} as const;

/**
 * Media query helpers
 * Use with styled-components or CSS-in-JS
 */
export const MEDIA = {
  /** Mobile only (max-width: 767px) */
  mobileOnly: '@media (max-width: 767px)',
  /** Tablet and up (min-width: 768px) */
  tablet: '@media (min-width: 768px)',
  /** Desktop and up (min-width: 1024px) */
  desktop: '@media (min-width: 1024px)',
  /** Large desktop and up (min-width: 1280px) */
  largeDesktop: '@media (min-width: 1280px)',
  /** Tablet only (768px - 1023px) */
  tabletOnly: '@media (min-width: 768px) and (max-width: 1023px)',
} as const;

/**
 * Device detection helpers (for use with window.matchMedia)
 */
export const DEVICE_QUERIES = {
  isMobile: '(max-width: 767px)',
  isTablet: '(min-width: 768px) and (max-width: 1023px)',
  isDesktop: '(min-width: 1024px)',
  isTouchDevice: '(hover: none) and (pointer: coarse)',
} as const;

// Type exports
export type Breakpoint = keyof typeof BREAKPOINTS;
export type Screen = keyof typeof screens;
export type MediaQuery = keyof typeof MEDIA;
