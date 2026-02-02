'use client';

import { motion } from 'framer-motion';
import type { DecorativeElementsProps } from '@/types/layout';

/**
 * DecorativeElements Component
 *
 * Subtle decorative background elements with floating animation.
 * Features:
 * - Two gradient circles (top-right and bottom-left)
 * - Blur effect for soft appearance
 * - Slow floating animation (20s duration)
 * - Non-intrusive (z-index: -1, behind content)
 */
export function DecorativeElements({
  opacity = 0.08,
  animate = true,
}: DecorativeElementsProps) {
  // Animation variants for floating effect
  const floatVariants = {
    animate: {
      y: [-25, 25, -25],
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    static: {},
  };

  // Slightly different timing for the second element
  const floatVariantsAlt = {
    animate: {
      y: [25, -25, 25],
      transition: {
        duration: 25,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
    static: {},
  };

  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      {/* Top right circle - larger */}
      <motion.div
        variants={floatVariants}
        animate={animate ? 'animate' : 'static'}
        className="absolute -top-20 -right-20 md:-top-32 md:-right-32"
        style={{
          width: '300px',
          height: '300px',
          background: `radial-gradient(circle, rgba(200, 162, 214, ${opacity}) 0%, transparent 70%)`,
          filter: 'blur(80px)',
        }}
      />

      {/* Bottom left circle - smaller */}
      <motion.div
        variants={floatVariantsAlt}
        animate={animate ? 'animate' : 'static'}
        className="absolute -bottom-16 -left-16 md:-bottom-24 md:-left-24"
        style={{
          width: '200px',
          height: '200px',
          background: `radial-gradient(circle, rgba(155, 89, 182, ${opacity}) 0%, transparent 70%)`,
          filter: 'blur(60px)',
        }}
      />

      {/* Optional center accent - very subtle */}
      <motion.div
        variants={floatVariants}
        animate={animate ? 'animate' : 'static'}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:block"
        style={{
          width: '400px',
          height: '400px',
          background: `radial-gradient(circle, rgba(123, 67, 151, ${opacity * 0.5}) 0%, transparent 60%)`,
          filter: 'blur(100px)',
        }}
      />
    </div>
  );
}

export default DecorativeElements;
