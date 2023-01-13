import * as React from 'react';

import clsx from 'clsx';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export function Button({ children, size = 'md', variant = 'primary', disabled = false, ...args }: Props) {
  return (
    <button
      {...args}
      disabled={disabled}
      className={clsx(
        'text-center font-medium text-white',
        'inline-flex items-center rounded-lg',
        'focus:outline-none focus-visible:ring-4',
        'transition-all duration-100 ease-out',
        !!disabled && 'cursor-not-allowed opacity-70',
        size === 'xs' && 'px-2.5 py-1 text-xs',
        size === 'sm' && 'px-5 py-2.5 text-sm',
        size === 'md' && 'px-5 py-2.5 text-base',
        size === 'lg' && 'py-2.5 px-5 text-lg',
        variant === 'primary' && 'bg-primary-700 ',
        variant === 'primary' &&
          !disabled &&
          'hover:bg-primary-800 focus-visible:ring-primary-300 active:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus-visible:ring-primary-800 dark:active:bg-primary-500',
        variant === 'secondary' && 'bg-secondary-700',
        variant === 'secondary' &&
          !disabled &&
          ' hover:bg-secondary-800 focus-visible:ring-secondary-300 active:bg-secondary-600 dark:bg-secondary-600 dark:hover:bg-secondary-700 dark:focus-visible:ring-secondary-800 dark:active:bg-secondary-500',
        variant === 'tertiary' && 'bg-tertiary-700',
        variant === 'tertiary' &&
          !disabled &&
          ' hover:bg-tertiary-800 focus-visible:ring-tertiary-300 active:bg-tertiary-600 dark:bg-tertiary-600 dark:hover:bg-tertiary-700 dark:focus-visible:ring-tertiary-800 dark:active:bg-tertiary-500',
        variant === 'outline' &&
          'border-2 border-gray-400 bg-gray-100 bg-opacity-20 text-gray-500 dark:bg-gray-400 dark:bg-opacity-20',
        variant === 'outline' &&
          !disabled &&
          'hover:bg-opacity-70 hover:text-gray-900 focus-visible:ring-primary-300 active:bg-gray-200 dark:border-gray-400 dark:text-gray-300 dark:hover:bg-opacity-70 dark:hover:text-white dark:focus-visible:ring-gray-600 dark:active:bg-gray-500',
      )}
      type="button"
    >
      {children}
    </button>
  );
}
