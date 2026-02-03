'use client';

import { useCallback, KeyboardEvent } from 'react';

export interface ToggleSwitchProps {
  /** Whether the toggle is enabled */
  enabled: boolean;
  /** Callback when toggle state changes */
  onChange: (enabled: boolean) => void;
  /** Whether the toggle is disabled */
  disabled?: boolean;
  /** Accessible label */
  ariaLabel?: string;
  /** ID for label association */
  id?: string;
}

export default function ToggleSwitch({
  enabled,
  onChange,
  disabled = false,
  ariaLabel,
  id,
}: ToggleSwitchProps) {
  const handleClick = useCallback(() => {
    if (!disabled) {
      onChange(!enabled);
    }
  }, [disabled, enabled, onChange]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      if (disabled) return;

      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        onChange(!enabled);
      }
    },
    [disabled, enabled, onChange]
  );

  return (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={enabled}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`
        relative inline-flex h-6 w-12 flex-shrink-0 cursor-pointer
        rounded-full border-2 border-transparent
        transition-colors duration-200 ease-in-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-medium
        focus-visible:ring-offset-2
        ${enabled ? 'bg-purple-medium' : 'bg-gray-300'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'}
      `}
    >
      <span className="sr-only">
        {enabled ? 'Abilitato' : 'Disabilitato'}
      </span>
      <span
        aria-hidden="true"
        className={`
          pointer-events-none inline-block h-5 w-5 rounded-full
          bg-white shadow-lg ring-0
          transform transition duration-200 ease-in-out
          ${enabled ? 'translate-x-6' : 'translate-x-0'}
        `}
      />
    </button>
  );
}
