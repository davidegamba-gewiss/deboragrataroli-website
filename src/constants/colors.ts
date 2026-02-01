/**
 * Color palette constants - Design System
 * All colors are WCAG 2.1 AA compliant for accessibility
 *
 * Usage:
 * - Import directly: import { COLORS } from '@/constants/colors'
 * - Via Tailwind: className="text-purple-dark bg-purple-light"
 */

export const COLORS = {
  /**
   * Primary Purple Palette
   * Used for branding, CTAs, and key UI elements
   */
  primary: {
    /** Viola Scuro - Header, menu, titoli principali */
    dark: '#7b4397',
    /** Viola Medio - Link, hover states, accenti */
    medium: '#9b59b6',
    /** Viola Chiaro - Sfondi, decorazioni, backgrounds */
    light: '#c8a2d6',
  },

  /**
   * Neutral Colors
   * Used for text, backgrounds, and UI elements
   */
  neutral: {
    /** Pure black - Footer backgrounds, strong text */
    black: '#000000',
    /** Dark gray - Body text, paragraphs (WCAG AA on white) */
    dark: '#1a1a1a',
    /** Pure white - Backgrounds, text on dark surfaces */
    white: '#ffffff',
  },

  /**
   * Extended Gray Scale
   * For subtle UI elements and borders
   */
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  /**
   * Semantic Colors
   * For status indicators and feedback
   */
  semantic: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },

  /**
   * Social Media Brand Colors
   */
  social: {
    instagram: '#E4405F',
    facebook: '#1877F2',
    youtube: '#FF0000',
    spotify: '#1DB954',
    tiktok: '#000000',
    twitter: '#1DA1F2',
  },
} as const;

/**
 * Color roles for semantic usage
 */
export const COLOR_ROLES = {
  /** Primary action buttons, links */
  action: COLORS.primary.medium,
  /** Hover state for actions */
  actionHover: COLORS.primary.dark,
  /** Primary text color */
  text: COLORS.neutral.dark,
  /** Secondary/muted text */
  textMuted: COLORS.gray[500],
  /** Page background */
  background: COLORS.neutral.white,
  /** Card/section backgrounds */
  surface: COLORS.gray[50],
  /** Borders */
  border: COLORS.gray[200],
  /** Focus ring */
  focus: COLORS.primary.medium,
} as const;

/**
 * Gradient definitions
 */
export const GRADIENTS = {
  /** Primary brand gradient */
  primary: `linear-gradient(135deg, ${COLORS.primary.dark} 0%, ${COLORS.primary.medium} 100%)`,
  /** Subtle background gradient */
  subtle: `linear-gradient(180deg, ${COLORS.gray[50]} 0%, ${COLORS.neutral.white} 100%)`,
  /** Purple overlay for images */
  overlay: `linear-gradient(180deg, rgba(123, 67, 151, 0.8) 0%, rgba(155, 89, 182, 0.6) 100%)`,
} as const;

// Type exports for TypeScript support
export type PrimaryColor = keyof typeof COLORS.primary;
export type NeutralColor = keyof typeof COLORS.neutral;
export type GrayShade = keyof typeof COLORS.gray;
export type SemanticColor = keyof typeof COLORS.semantic;
export type SocialColor = keyof typeof COLORS.social;
export type ColorRole = keyof typeof COLOR_ROLES;

// Legacy export for backward compatibility
export const colors = COLORS;
