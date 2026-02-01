import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // Custom breakpoints
    screens: {
      sm: '640px',
      md: '768px',      // tablet
      lg: '1024px',     // desktop
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      // Custom colors - Purple palette
      colors: {
        purple: {
          dark: '#7b4397',
          DEFAULT: '#9b59b6',
          medium: '#9b59b6',
          light: '#c8a2d6',
        },
        // Semantic colors
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
      },
      // Custom fonts
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        playfair: ['var(--font-playfair)', 'Georgia', 'serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      // Custom spacing for sections
      spacing: {
        'section-mobile': '64px',
        'section-desktop': '96px',
        '18': '4.5rem',
        '22': '5.5rem',
      },
      // Custom font sizes
      fontSize: {
        'display-lg': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-sm': ['2rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
      },
      // Smooth transitions
      transitionDuration: {
        DEFAULT: '200ms',
        fast: '150ms',
        slow: '300ms',
      },
      // Custom ring for focus states
      ringColor: {
        DEFAULT: '#9b59b6',
      },
      ringOffsetWidth: {
        DEFAULT: '2px',
      },
      // Animation timings
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
