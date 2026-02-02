/**
 * Navigation types for Header and Menu components
 */

// Context types
export interface NavigationContextType {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
  toggleMenu: () => void;
  closeMenu: () => void;
}

// Header props
export interface HeaderProps {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
}

// Mobile menu props
export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// Menu item props
export interface MenuItemProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

// Navigation link props
export interface NavLinkProps {
  href: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

// Navigation item definition
export interface NavigationItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

// Social link definition
export interface SocialLink {
  platform: 'instagram' | 'facebook' | 'youtube' | 'tiktok' | 'spotify';
  url: string;
  label: string;
}

/**
 * Main navigation items
 * Order matches the requested menu structure
 */
export const NAVIGATION_ITEMS: NavigationItem[] = [
  { label: 'Biografia', href: '/biografia' },
  { label: 'Eventi', href: '/eventi' },
  { label: 'Esibizioni', href: '/esibizioni' },
  { label: 'I miei brani', href: '/brani' },
  { label: 'Contatti', href: '/contatti' },
  { label: 'Parlano di me', href: '/parlano-di-me' },
];

/**
 * Social media links
 * URLs should be configured in CMS/environment
 */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: 'instagram',
    url: 'https://instagram.com/deboragrataroli',
    label: 'Instagram',
  },
  {
    platform: 'facebook',
    url: 'https://facebook.com/deboragrataroli',
    label: 'Facebook',
  },
  {
    platform: 'youtube',
    url: 'https://youtube.com/@deboragrataroli',
    label: 'YouTube',
  },
  {
    platform: 'tiktok',
    url: 'https://tiktok.com/@deboragrataroli',
    label: 'TikTok',
  },
  {
    platform: 'spotify',
    url: 'https://open.spotify.com/artist/deboragrataroli',
    label: 'Spotify',
  },
];
