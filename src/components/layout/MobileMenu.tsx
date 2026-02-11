'use client';

import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInstagram, FaFacebook, FaYoutube, FaTiktok, FaSpotify } from 'react-icons/fa';
import { NAVIGATION_ITEMS, SOCIAL_LINKS } from '@/types/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * MobileMenu Component
 *
 * Animated slide-in menu from left with overlay.
 * Features focus trap, social links, and active page highlighting.
 */
export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLAnchorElement>(null);
  const lastFocusableRef = useRef<HTMLAnchorElement>(null);

  // Focus trap
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Tab' && isOpen && menuRef.current) {
      const focusableElements = menuRef.current.querySelectorAll(
        'a[href], button:not([disabled])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    }
  }, [isOpen]);

  // Set up focus trap
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Focus first element when menu opens
      setTimeout(() => {
        firstFocusableRef.current?.focus();
      }, 100);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  // Check if current path matches menu item
  const isActivePath = (href: string): boolean => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-16 z-30 bg-black/50"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed left-0 top-16 z-40 h-[calc(100vh-64px)] w-[80%] md:w-80 bg-white shadow-xl overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Menu di navigazione"
          >
            {/* Navigation Links */}
            <nav className="flex flex-col h-full">
              <ul>
                {NAVIGATION_ITEMS.map((item, index) => {
                  const isActive = isActivePath(item.href);
                  return (
                    <li key={item.href}>
                      <Link
                        ref={index === 0 ? firstFocusableRef : undefined}
                        href={item.href}
                        onClick={onClose}
                        className={`
                          block py-4 px-6 text-base font-normal
                          border-b border-gray-200
                          transition-colors duration-200
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-purple
                          ${isActive
                            ? 'bg-gray-100 font-semibold border-l-4 border-l-purple-medium pl-5 text-neutral-dark'
                            : 'text-neutral-dark hover:bg-gray-50'
                          }
                        `}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Social Links Section - positioned at bottom */}
              <div className="mt-auto border-t border-gray-200 p-6">
                <p className="text-sm text-gray-500 mb-4 font-medium">Seguimi sui social</p>
                <div className="flex items-center flex-wrap gap-3">
                  {SOCIAL_LINKS.map((social, index) => (
                    <a
                      key={social.platform}
                      ref={index === SOCIAL_LINKS.length - 1 ? lastFocusableRef : undefined}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-11 h-11 text-[#4a1d6a] hover:text-[#7c3aed] hover:bg-purple-100 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple focus-visible:ring-offset-2 rounded-lg"
                      aria-label={social.label}
                    >
                      {social.platform === 'instagram' && <FaInstagram className="w-6 h-6" />}
                      {social.platform === 'facebook' && <FaFacebook className="w-6 h-6" />}
                      {social.platform === 'youtube' && <FaYoutube className="w-6 h-6" />}
                      {social.platform === 'tiktok' && <FaTiktok className="w-6 h-6" />}
                      {social.platform === 'spotify' && <FaSpotify className="w-6 h-6" />}
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default MobileMenu;
