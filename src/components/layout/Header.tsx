'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { HeaderProps } from '@/types/navigation';

/**
 * Header Component
 *
 * Sticky header with logo and animated hamburger menu.
 * Features glass-morphism effect on scroll.
 */
export function Header({ menuOpen, setMenuOpen }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for glass-morphism effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 h-16
        transition-all duration-300 ease-in-out
        ${isScrolled
          ? 'bg-purple-dark/95 backdrop-blur-[10px] shadow-lg'
          : 'bg-purple-dark/90'
        }
        border-b border-white/10
      `}
    >
      <nav className="h-full px-4 md:px-8">
        <div className="flex items-center justify-between h-full max-w-[1280px] mx-auto">
          {/* Logo */}
          <Link
            href="/"
            className="text-lg md:text-xl font-bold text-white hover:text-purple-light transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-purple-dark rounded"
          >
            Debora Grataroli
          </Link>

          {/* Hamburger Menu Button */}
          <button
            type="button"
            onClick={toggleMenu}
            className="relative w-12 h-12 -mr-3 flex flex-col items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 focus-visible:ring-offset-purple-dark rounded"
            aria-label="Menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {/* Top line */}
            <motion.span
              className="absolute w-6 h-0.5 bg-white rounded-full"
              initial={false}
              animate={{
                rotate: menuOpen ? 45 : 0,
                y: menuOpen ? 0 : -8,
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />

            {/* Middle line */}
            <motion.span
              className="absolute w-6 h-0.5 bg-white rounded-full"
              initial={false}
              animate={{
                opacity: menuOpen ? 0 : 1,
                scaleX: menuOpen ? 0 : 1,
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />

            {/* Bottom line */}
            <motion.span
              className="absolute w-6 h-0.5 bg-white rounded-full"
              initial={false}
              animate={{
                rotate: menuOpen ? -45 : 0,
                y: menuOpen ? 0 : 8,
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          </button>
        </div>
      </nav>
    </header>
  );
}

/**
 * Standalone Header with internal state management
 * Use this when Header is not controlled by parent component
 */
export function HeaderStandalone() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      {/* Spacer to prevent content from going under fixed header */}
      <div className="h-16" />
    </>
  );
}

export default Header;
