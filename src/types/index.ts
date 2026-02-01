/**
 * Global type definitions
 */

// Navigation types
export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Button variants
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends BaseComponentProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  href?: string;
  ariaLabel?: string;
}

// Image types
export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  fill?: boolean;
  sizes?: string;
}

// Layout types
export interface LayoutProps {
  children: React.ReactNode;
}

// Page metadata
export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

// Social links
export interface SocialLink {
  platform: 'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'youtube';
  url: string;
  label: string;
}

// Contact info
export interface ContactInfo {
  email?: string;
  phone?: string;
  address?: string;
}

// Generic callback types
export type VoidCallback = () => void;
export type AsyncVoidCallback = () => Promise<void>;
