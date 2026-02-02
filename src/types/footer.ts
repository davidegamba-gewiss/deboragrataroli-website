/**
 * Footer Types
 *
 * Type definitions for the Footer component.
 */

/**
 * FooterProps
 *
 * Footer is self-contained and reads from GlobalSettings context,
 * so no props are needed.
 */
export interface FooterProps {
  // Footer is self-contained, no props needed
}

/**
 * Social Platform Types
 */
export type SocialPlatform = 'instagram' | 'facebook' | 'youtube' | 'tiktok' | 'spotify';

/**
 * SocialLink Interface
 *
 * Represents a social media link with platform info.
 */
export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  label: string;
}

/**
 * FooterSocialLinks Type
 *
 * Array of social links for the footer.
 */
export type FooterSocialLinks = SocialLink[];
