'use client';

import Link from 'next/link';
import type { ButtonProps } from '@/types';

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-purple-medium text-white hover:bg-purple-dark active:bg-purple-dark/90',
  secondary: 'bg-purple-light text-purple-dark hover:bg-purple-medium hover:text-white',
  outline: 'border-2 border-purple-medium text-purple-medium bg-transparent hover:bg-purple-medium hover:text-white',
  ghost: 'text-purple-medium bg-transparent hover:bg-purple-light/20',
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-4 py-2.5 text-sm rounded min-h-[44px]',
  md: 'px-5 py-3 text-base rounded-md min-h-[48px]',
  lg: 'px-6 py-3.5 text-lg rounded-lg min-h-[52px]',
};

export function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  href,
  ariaLabel,
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-medium focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </>
  );

  // If href is provided, render as Link
  if (href && !disabled) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-busy={loading}
    >
      {content}
    </button>
  );
}

export default Button;
