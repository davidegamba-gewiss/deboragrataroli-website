'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import type { NavItem } from '@/types';

interface MobileMenuProps {
  isOpen: boolean;
  navItems: NavItem[];
  onClose: () => void;
}

export function MobileMenu({ isOpen, navItems, onClose }: MobileMenuProps) {
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      id="mobile-menu"
      className="md:hidden fixed inset-0 top-16 z-40 bg-white"
      role="dialog"
      aria-modal="true"
      aria-label="Menu di navigazione"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/20"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Content */}
      <nav className="relative bg-white h-full overflow-y-auto">
        <ul className="container-custom py-6 space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                className="block py-3 px-4 text-lg font-medium text-gray-700 hover:text-purple-medium hover:bg-purple-light/10 rounded-lg transition-colors focus-ring"
              >
                {item.label}
              </Link>
            </li>
          ))}

          {/* Mobile CTA */}
          <li className="pt-4 border-t border-gray-100 mt-4">
            <Link
              href="/contatti"
              onClick={onClose}
              className="btn-primary btn-lg w-full text-center"
            >
              Prenota
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
