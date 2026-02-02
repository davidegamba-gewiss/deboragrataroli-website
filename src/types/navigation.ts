/**
 * Navigation types for Header and Menu components
 */

export interface HeaderProps {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface NavLinkProps {
  href: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

export interface NavigationItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Biografia', href: '/biografia' },
  { label: 'Brani', href: '/brani' },
  { label: 'Eventi', href: '/eventi' },
  { label: 'Esibizioni', href: '/esibizioni' },
  { label: 'Rassegna Stampa', href: '/rassegna-stampa' },
  { label: 'Contatti', href: '/contatti' },
];
