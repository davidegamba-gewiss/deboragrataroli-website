/**
 * Typography system constants - Design System
 * Responsive font scales, line heights, and font weights
 *
 * Usage:
 * - Import: import { TYPOGRAPHY } from '@/constants/typography'
 * - Access: TYPOGRAPHY.h1.mobile, TYPOGRAPHY.fonts.primary
 */

/**
 * Main typography configuration
 */
export const TYPOGRAPHY = {
  /**
   * Heading 1 - Hero titles, main page headers
   */
  h1: {
    mobile: '48px',   // 3rem
    desktop: '64px',  // 4rem
    lineHeight: 1.1,
    letterSpacing: '-0.02em',
    fontWeight: 700,
  },

  /**
   * Heading 2 - Section titles
   */
  h2: {
    mobile: '36px',   // 2.25rem
    desktop: '48px',  // 3rem
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
    fontWeight: 600,
  },

  /**
   * Heading 3 - Subsection titles, card headers
   */
  h3: {
    mobile: '28px',   // 1.75rem
    desktop: '36px',  // 2.25rem
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
    fontWeight: 600,
  },

  /**
   * Heading 4 - Small headers
   */
  h4: {
    mobile: '22px',   // 1.375rem
    desktop: '28px',  // 1.75rem
    lineHeight: 1.4,
    letterSpacing: '0',
    fontWeight: 600,
  },

  /**
   * Body text - Paragraphs, general content
   */
  body: {
    mobile: '16px',   // 1rem
    desktop: '18px',  // 1.125rem
    lineHeight: 1.6,
    letterSpacing: '0',
    fontWeight: 400,
  },

  /**
   * Small text - Captions, labels, meta info
   */
  small: '14px',      // 0.875rem

  /**
   * Extra small - Legal text, fine print
   */
  xs: '12px',         // 0.75rem

  /**
   * Font families
   */
  fonts: {
    /** Primary font - Used for headings, menu, body text */
    primary: 'Inter, sans-serif',
    /** Accent font - Used for quotes, emphasis, artistic elements */
    accent: 'Playfair Display, serif',
  },
} as const;

/**
 * Font family configuration for Tailwind/CSS
 */
export const fontFamily = {
  sans: 'var(--font-inter), system-ui, sans-serif',
  display: 'var(--font-playfair), Georgia, serif',
  inter: 'var(--font-inter), system-ui, sans-serif',
  playfair: 'var(--font-playfair), Georgia, serif',
} as const;

/**
 * Complete font size scale
 */
export const fontSize = {
  xs: '0.75rem',      // 12px
  sm: '0.875rem',     // 14px
  base: '1rem',       // 16px
  lg: '1.125rem',     // 18px
  xl: '1.25rem',      // 20px
  '2xl': '1.5rem',    // 24px
  '3xl': '1.875rem',  // 30px
  '4xl': '2.25rem',   // 36px
  '5xl': '3rem',      // 48px
  '6xl': '3.75rem',   // 60px
  '7xl': '4.5rem',    // 72px
} as const;

/**
 * Font weight scale
 */
export const fontWeight = {
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

/**
 * Line height scale
 */
export const lineHeight = {
  none: 1,
  tight: 1.1,
  snug: 1.25,
  normal: 1.5,
  relaxed: 1.6,
  loose: 2,
} as const;

/**
 * Letter spacing scale
 */
export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const;

/**
 * Text styles presets for common use cases
 */
export const TEXT_STYLES = {
  /** Hero title style */
  heroTitle: {
    fontFamily: fontFamily.sans,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.tight,
  },
  /** Quote/testimonial style */
  quote: {
    fontFamily: fontFamily.playfair,
    fontWeight: fontWeight.normal,
    lineHeight: lineHeight.relaxed,
    fontStyle: 'italic',
  },
  /** Button text style */
  button: {
    fontFamily: fontFamily.sans,
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.wide,
  },
  /** Navigation link style */
  navLink: {
    fontFamily: fontFamily.sans,
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.normal,
  },
} as const;

// Type exports
export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4';
export type FontFamily = keyof typeof fontFamily;
export type FontSize = keyof typeof fontSize;
export type FontWeight = keyof typeof fontWeight;
export type LineHeight = keyof typeof lineHeight;
export type LetterSpacing = keyof typeof letterSpacing;
