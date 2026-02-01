/**
 * Design System utility functions
 * Helper functions for accessing design tokens programmatically
 *
 * Usage:
 * - Import: import { getResponsivePadding, getColorByRole } from '@/utils/designSystem'
 */

import { COLORS, COLOR_ROLES, GRADIENTS } from '@/constants/colors';
import { TYPOGRAPHY, fontFamily } from '@/constants/typography';
import { SPACING, sectionSpacing } from '@/constants/spacing';
import { BREAKPOINTS, BREAKPOINT_VALUES } from '@/constants/breakpoints';

// Device types
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

// Section types
export type SectionType = 'small' | 'medium' | 'large';

// Color roles
export type ColorRoleType = keyof typeof COLOR_ROLES;

/**
 * Get responsive padding based on device type
 * @param device - The device type ('mobile' | 'tablet' | 'desktop')
 * @returns The padding value as a string
 */
export function getResponsivePadding(device: DeviceType): string {
  return SPACING.padding[device];
}

/**
 * Get responsive section spacing
 * @param device - The device type ('mobile' | 'tablet' | 'desktop')
 * @returns The section spacing value as a string
 */
export function getResponsiveSpacing(device: DeviceType): string {
  return SPACING.sections[device];
}

/**
 * Get section spacing by type
 * @param sectionType - The section type ('small' | 'medium' | 'large')
 * @returns Object with mobile and desktop values
 */
export function getSectionSpacing(sectionType: SectionType): { mobile: string; desktop: string } {
  const multipliers = {
    small: 0.5,
    medium: 1,
    large: 1.5,
  };

  const multiplier = multipliers[sectionType];
  const mobileValue = parseInt(sectionSpacing.mobile) * multiplier;
  const desktopValue = parseInt(sectionSpacing.desktop) * multiplier;

  return {
    mobile: mobileValue + 'px',
    desktop: desktopValue + 'px',
  };
}

/**
 * Get color by semantic role
 * @param role - The color role
 * @returns The color hex value
 */
export function getColorByRole(role: ColorRoleType): string {
  return COLOR_ROLES[role];
}

/**
 * Get primary color shade
 * @param shade - 'dark' | 'medium' | 'light'
 * @returns The color hex value
 */
export function getPrimaryColor(shade: keyof typeof COLORS.primary): string {
  return COLORS.primary[shade];
}

/**
 * Get gradient by name
 * @param name - The gradient name
 * @returns The CSS gradient string
 */
export function getGradient(name: keyof typeof GRADIENTS): string {
  return GRADIENTS[name];
}

/**
 * Get font family by type
 * @param type - 'primary' | 'accent'
 * @returns The font family string
 */
export function getFontFamily(type: 'primary' | 'accent'): string {
  return TYPOGRAPHY.fonts[type];
}

/**
 * Get CSS font family variable
 * @param family - The font family key
 * @returns The CSS font family string
 */
export function getCssFontFamily(family: keyof typeof fontFamily): string {
  return fontFamily[family];
}

/**
 * Get responsive font size for headings
 * @param level - 'h1' | 'h2' | 'h3' | 'h4' | 'body'
 * @param device - 'mobile' | 'desktop'
 * @returns The font size string
 */
export function getHeadingSize(
  level: 'h1' | 'h2' | 'h3' | 'h4' | 'body',
  device: 'mobile' | 'desktop'
): string {
  const heading = TYPOGRAPHY[level];
  if (typeof heading === 'object' && 'mobile' in heading) {
    return heading[device];
  }
  return heading as string;
}

/**
 * Get border radius by element type
 * @param element - 'small' | 'buttons' | 'cards' | 'large' | 'full'
 * @returns The border radius string
 */
export function getBorderRadius(
  element: keyof typeof SPACING.borders.radius
): string {
  return SPACING.borders.radius[element];
}

/**
 * Check if current viewport matches device type
 * Only works on client-side
 * @param device - The device type to check
 * @returns Boolean indicating if viewport matches
 */
export function isDevice(device: DeviceType): boolean {
  if (typeof window === 'undefined') return false;

  const width = window.innerWidth;

  switch (device) {
    case 'mobile':
      return width < BREAKPOINT_VALUES.tablet;
    case 'tablet':
      return width >= BREAKPOINT_VALUES.tablet && width < BREAKPOINT_VALUES.desktop;
    case 'desktop':
      return width >= BREAKPOINT_VALUES.desktop;
    default:
      return false;
  }
}

/**
 * Get current device type based on viewport
 * Only works on client-side
 * @returns The current device type
 */
export function getCurrentDevice(): DeviceType {
  if (typeof window === 'undefined') return 'desktop';

  const width = window.innerWidth;

  if (width < BREAKPOINT_VALUES.tablet) return 'mobile';
  if (width < BREAKPOINT_VALUES.desktop) return 'tablet';
  return 'desktop';
}

/**
 * Generate CSS custom properties from design tokens
 * Useful for injecting design system into CSS
 * @returns Object with CSS custom property names and values
 */
export function getCssCustomProperties(): Record<string, string> {
  return {
    // Colors
    '--color-primary-dark': COLORS.primary.dark,
    '--color-primary-medium': COLORS.primary.medium,
    '--color-primary-light': COLORS.primary.light,
    '--color-neutral-black': COLORS.neutral.black,
    '--color-neutral-dark': COLORS.neutral.dark,
    '--color-neutral-white': COLORS.neutral.white,

    // Spacing
    '--spacing-section-mobile': SPACING.sections.mobile,
    '--spacing-section-desktop': SPACING.sections.desktop,
    '--spacing-padding-mobile': SPACING.padding.mobile,
    '--spacing-padding-desktop': SPACING.padding.desktop,

    // Container
    '--container-max-width': SPACING.container.maxWidth,

    // Border radius
    '--radius-buttons': SPACING.borders.radius.buttons,
    '--radius-cards': SPACING.borders.radius.cards,

    // Breakpoints
    '--breakpoint-tablet': BREAKPOINTS.tablet,
    '--breakpoint-desktop': BREAKPOINTS.desktop,
  };
}

/**
 * Design System object for convenient access
 */
export const DesignSystem = {
  colors: COLORS,
  colorRoles: COLOR_ROLES,
  gradients: GRADIENTS,
  typography: TYPOGRAPHY,
  spacing: SPACING,
  breakpoints: BREAKPOINTS,

  // Helper functions
  getResponsivePadding,
  getResponsiveSpacing,
  getSectionSpacing,
  getColorByRole,
  getPrimaryColor,
  getGradient,
  getFontFamily,
  getHeadingSize,
  getBorderRadius,
  isDevice,
  getCurrentDevice,
  getCssCustomProperties,
} as const;

export default DesignSystem;
