/**
 * Spacing system constants - Design System
 * Consistent spacing values across the application
 *
 * Usage:
 * - Import: import { SPACING } from '@/constants/spacing'
 * - Access: SPACING.container.maxWidth, SPACING.sections.mobile
 */

/**
 * Main spacing configuration
 */
export const SPACING = {
  /**
   * Container settings
   */
  container: {
    /** Maximum width of content container */
    maxWidth: '1280px',
    /** Centered container with padding */
    centered: {
      maxWidth: '1280px',
      marginInline: 'auto',
    },
  },

  /**
   * Responsive padding
   */
  padding: {
    /** Mobile padding (< 768px) */
    mobile: '16px',
    /** Tablet padding (768px - 1024px) */
    tablet: '24px',
    /** Desktop padding (> 1024px) */
    desktop: '32px',
  },

  /**
   * Section vertical spacing
   */
  sections: {
    /** Mobile section spacing */
    mobile: '64px',
    /** Tablet section spacing */
    tablet: '80px',
    /** Desktop section spacing */
    desktop: '96px',
  },

  /**
   * Border radius values
   */
  borders: {
    radius: {
      /** Small elements (badges, tags) */
      small: '4px',
      /** Buttons */
      buttons: '4px',
      /** Cards, containers */
      cards: '8px',
      /** Large elements (modals, panels) */
      large: '12px',
      /** Pill shape (full rounded) */
      full: '9999px',
    },
  },

  /**
   * Component-specific gaps
   */
  gaps: {
    /** Grid gap for cards */
    cards: '24px',
    /** Gap between form elements */
    form: '16px',
    /** Gap in navigation */
    nav: '32px',
    /** Gap between stacked elements */
    stack: '8px',
  },
} as const;

/**
 * Base spacing scale (in rem)
 * Maps to Tailwind's default spacing
 */
export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',   // 2px
  1: '0.25rem',      // 4px
  1.5: '0.375rem',   // 6px
  2: '0.5rem',       // 8px
  2.5: '0.625rem',   // 10px
  3: '0.75rem',      // 12px
  3.5: '0.875rem',   // 14px
  4: '1rem',         // 16px
  5: '1.25rem',      // 20px
  6: '1.5rem',       // 24px
  7: '1.75rem',      // 28px
  8: '2rem',         // 32px
  9: '2.25rem',      // 36px
  10: '2.5rem',      // 40px
  11: '2.75rem',     // 44px
  12: '3rem',        // 48px
  14: '3.5rem',      // 56px
  16: '4rem',        // 64px
  20: '5rem',        // 80px
  24: '6rem',        // 96px
  28: '7rem',        // 112px
  32: '8rem',        // 128px
} as const;

/**
 * Section spacing for consistent vertical rhythm
 */
export const sectionSpacing = {
  mobile: '64px',    // 4rem
  tablet: '80px',    // 5rem
  desktop: '96px',   // 6rem
} as const;

/**
 * Container max widths
 */
export const containerWidth = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// Type exports
export type SpacingKey = keyof typeof spacing;
export type ContainerWidth = keyof typeof containerWidth;
export type DeviceType = 'mobile' | 'tablet' | 'desktop';
