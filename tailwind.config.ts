import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

/**
 * Tailwind CSS Configuration
 * Integrated with Design System from /src/constants
 *
 * Design tokens are imported from:
 * - colors: /src/constants/colors.ts
 * - typography: /src/constants/typography.ts
 * - spacing: /src/constants/spacing.ts
 * - breakpoints: /src/constants/breakpoints.ts
 */

// Design System Colors
const designColors = {
  purple: {
    dark: '#7b4397',
    DEFAULT: '#9b59b6',
    medium: '#9b59b6',
    light: '#c8a2d6',
  },
  primary: {
    50: '#f5f0f7',
    100: '#ebe1ef',
    200: '#d7c3df',
    300: '#c8a2d6',
    400: '#b57dc6',
    500: '#9b59b6',
    600: '#7b4397',
    700: '#5c3271',
    800: '#3d224b',
    900: '#1e1126',
  },
  neutral: {
    black: '#000000',
    dark: '#1a1a1a',
    white: '#ffffff',
  },
  semantic: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  social: {
    instagram: '#E4405F',
    facebook: '#1877F2',
    youtube: '#FF0000',
    spotify: '#1DB954',
    tiktok: '#000000',
    twitter: '#1DA1F2',
  },
};

// Design System Spacing
const designSpacing = {
  'section-mobile': '64px',
  'section-tablet': '80px',
  'section-desktop': '96px',
  'padding-mobile': '16px',
  'padding-tablet': '24px',
  'padding-desktop': '32px',
  '18': '4.5rem',
  '22': '5.5rem',
};

// Design System Border Radius
const designBorderRadius = {
  'button': '4px',
  'card': '8px',
  'large': '12px',
};

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // Custom breakpoints from Design System
    screens: {
      sm: '640px',
      md: '768px',      // tablet
      lg: '1024px',     // desktop
      xl: '1280px',     // large desktop
      '2xl': '1536px',  // extra large
    },
    extend: {
      // Colors from Design System
      colors: designColors,

      // Font families from Design System
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },

      // Spacing from Design System
      spacing: designSpacing,

      // Border radius from Design System
      borderRadius: designBorderRadius,

      // Font sizes from Design System (responsive)
      fontSize: {
        // Display sizes
        'display-lg': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-sm': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        // Heading sizes (desktop)
        'h1': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h2': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }],
        'h3': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'h4': ['1.75rem', { lineHeight: '1.4', fontWeight: '600' }],
        // Body sizes
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
      },

      // Container max width
      maxWidth: {
        'container': '1280px',
      },

      // Smooth transitions (200ms standard)
      transitionDuration: {
        DEFAULT: '200ms',
        fast: '150ms',
        slow: '300ms',
      },

      // Custom focus ring (purple #9b59b6)
      ringColor: {
        DEFAULT: '#9b59b6',
        purple: '#9b59b6',
      },
      ringOffsetWidth: {
        DEFAULT: '2px',
      },
      ringWidth: {
        DEFAULT: '2px',
      },

      // Box shadows
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'purple': '0 4px 14px 0 rgba(155, 89, 182, 0.39)',
      },

      // Animations
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },

      // Background images for gradients
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #7b4397 0%, #9b59b6 100%)',
        'gradient-subtle': 'linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)',
        'gradient-overlay': 'linear-gradient(180deg, rgba(123, 67, 151, 0.8) 0%, rgba(155, 89, 182, 0.6) 100%)',
      },
    },
  },
  plugins: [
    // Custom plugin for focus ring
    plugin(function({ addUtilities }) {
      addUtilities({
        '.focus-ring': {
          '&:focus': {
            'outline': 'none',
            'box-shadow': '0 0 0 2px #ffffff, 0 0 0 4px #9b59b6',
          },
        },
        '.focus-ring-inset': {
          '&:focus': {
            'outline': 'none',
            'box-shadow': 'inset 0 0 0 2px #9b59b6',
          },
        },
      });
    }),
    // Custom plugin for text gradient
    plugin(function({ addUtilities }) {
      addUtilities({
        '.text-gradient': {
          'background': 'linear-gradient(135deg, #7b4397 0%, #9b59b6 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
      });
    }),
    // Custom plugin for container utilities
    plugin(function({ addComponents }) {
      addComponents({
        '.container-custom': {
          'width': '100%',
          'max-width': '1280px',
          'margin-left': 'auto',
          'margin-right': 'auto',
          'padding-left': '16px',
          'padding-right': '16px',
          '@screen md': {
            'padding-left': '24px',
            'padding-right': '24px',
          },
          '@screen lg': {
            'padding-left': '32px',
            'padding-right': '32px',
          },
        },
      });
    }),
    // Custom plugin for card styles
    plugin(function({ addComponents }) {
      addComponents({
        '.card': {
          'background-color': '#ffffff',
          'border-radius': '8px',
          'box-shadow': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          'transition': 'box-shadow 200ms ease',
          '&:hover': {
            'box-shadow': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
        },
      });
    }),
  ],
};

export default config;
