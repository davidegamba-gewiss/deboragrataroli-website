'use client';

import { NavigationProvider, useNavigation } from '@/context/NavigationContext';
import { Header } from './Header';
import { MobileMenu } from './MobileMenu';

/**
 * Navigation Content
 *
 * Internal component that uses the navigation context.
 * Must be wrapped by NavigationProvider.
 */
function NavigationContent() {
  const { menuOpen, setMenuOpen, closeMenu } = useNavigation();

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileMenu isOpen={menuOpen} onClose={closeMenu} />
      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-16" aria-hidden="true" />
    </>
  );
}

/**
 * NavigationWrapper
 *
 * Provides navigation context and renders Header + MobileMenu.
 * Use this in layout.tsx to get the full navigation experience.
 */
export function NavigationWrapper() {
  return (
    <NavigationProvider>
      <NavigationContent />
    </NavigationProvider>
  );
}

export default NavigationWrapper;
