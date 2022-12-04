import * as React from 'react';

import clsx from 'clsx';

interface Props {
  children: React.ReactNode;
  variant: 'primary' | 'secondary' | 'tertiary' | 'warning' | 'confirmation';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export function NotificationText({ children, size, className, variant = 'primary' }: Props) {
  return (
    <span
      className={clsx(
        'font-bold',
        variant === 'primary' && 'text-primary-800 dark:text-primary-300',
        variant === 'secondary' && 'text-secondary-800 dark:text-secondary-300',
        variant === 'tertiary' && 'text-tertiary-800 dark:text-tertiary-300',
        variant === 'warning' && 'text-red-700 dark:text-red-300',
        variant === 'confirmation' && 'text-green-700 dark:text-green-300',
        size === 'xs' && 'text-xs',
        size === 'sm' && 'text-sm',
        size === 'lg' && 'text-lg',
        'text-center font-medium',
        'transition-colors duration-100 ease-out',
        !!className && className,
      )}
    >
      {children}
    </span>
  );
}
