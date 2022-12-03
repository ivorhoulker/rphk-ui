import * as React from 'react';

import clsx from 'clsx';

export interface Props {
  children: React.ReactNode;
  variant: 'primary' | 'secondary';
  disabled?: boolean;
}

export function Button({ children, variant = 'primary', disabled = false }: Props) {
  return (
    <button
      disabled={disabled}
      className={clsx([
        'inline-flex items-center rounded-lg px-4 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4',
        !!disabled && 'cursor-not-allowed',
        variant === 'primary' &&
          'bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800',
        variant === 'secondary' &&
          'bg-secondary-700 hover:bg-secondary-800 focus:ring-secondary-300 dark:bg-secondary-600 dark:hover:bg-secondary-700 dark:focus:ring-secondary-800',
      ])}
      type="button"
    >
      {children}
    </button>
  );
}

Button.displayName = 'Button';
