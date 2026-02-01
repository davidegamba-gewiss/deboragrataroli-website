/**
 * Color palette constants
 * These colors are also defined in tailwind.config.ts for utility classes
 */

export const colors = {
  purple: {
    dark: '#7b4397',
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
    white: '#ffffff',
    black: '#000000',
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },
} as const;

export type ColorKey = keyof typeof colors;
export type PurpleShade = keyof typeof colors.purple;
export type PrimaryShade = keyof typeof colors.primary;
