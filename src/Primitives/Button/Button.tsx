import * as React from 'react';

import { forwardRef, useEffect, useRef, useState } from 'react';

import NextLink from 'next/link';
import clsx from 'clsx';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'cancel';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  disabled?: boolean;
  hotKey?: string;
  className?: string;
  href?: string;
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(props, ref) {
  const {
    children,
    type = 'button',
    size = 'md',
    variant = 'primary',
    disabled = false,
    hotKey,
    className,
    ...args
  } = props;
  const activeElementIsInputField = () => {
    const ignoreIfActiveElementIsOneOf = ['input', 'textarea']; //'select', 'button', might be added if we were using e.g. enter key
    const activeElement = document?.activeElement;
    return activeElement && ignoreIfActiveElementIsOneOf.indexOf(activeElement.tagName.toLowerCase()) !== -1;
  };

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [showInteraction, setShowInteraction] = useState(false);

  const isDown = useRef(false);

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === hotKey && !isDown.current && !activeElementIsInputField()) {
      isDown.current = true;
      event.preventDefault();
      buttonRef.current?.click();
      setShowInteraction(true);
    }
  };
  const onKeyup = (event: KeyboardEvent) => {
    if (event.key === hotKey && isDown.current) {
      isDown.current = false;
      setShowInteraction(false);
    }
  };

  useEffect(() => {
    hotKey && document.addEventListener('keydown', onKeydown);
    hotKey && document.addEventListener('keyup', onKeyup);
    return () => {
      hotKey && document.removeEventListener('keydown', onKeydown);
      hotKey && document.removeEventListener('keyup', onKeyup);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button
      ref={buttonRef}
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
        variant === 'primary' && !showInteraction && 'bg-primary-700',
        variant === 'primary' && showInteraction && 'bg-primary-600',
        variant === 'primary' &&
          !disabled &&
          'hover:bg-primary-800 focus-visible:ring-primary-300 active:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus-visible:ring-primary-800 dark:active:bg-primary-500',
        variant === 'secondary' && 'bg-secondary-700',
        variant === 'secondary' &&
          !disabled &&
          ' hover:bg-secondary-800 focus-visible:ring-secondary-300 active:bg-secondary-600 dark:bg-secondary-600 dark:hover:bg-secondary-700 dark:focus-visible:ring-secondary-800 dark:active:bg-secondary-500',
        variant === 'tertiary' && 'bg-tertiary-700',
        variant === 'tertiary' && !disabled && !showInteraction && 'bg-tertiary-700 dark:bg-tertiary-600',
        variant === 'outline' && showInteraction && 'bg-tertiary-600 dark:bg-tertiary-500',
        variant === 'tertiary' &&
          !disabled &&
          ' hover:bg-tertiary-800 focus-visible:ring-tertiary-300 active:bg-tertiary-600  dark:hover:bg-tertiary-700 dark:focus-visible:ring-tertiary-800 dark:active:bg-tertiary-500',
        variant === 'outline' && 'border-2 border-gray-400 bg-opacity-20 text-gray-500 dark:bg-opacity-20',
        variant === 'outline' && !showInteraction && 'bg-gray-100  dark:bg-gray-400',
        variant === 'outline' && showInteraction && 'bg-gray-900 dark:bg-gray-900',
        variant === 'outline' &&
          !disabled &&
          'focus-visible:ring-primary-300 hover:bg-opacity-70 hover:text-gray-900 active:bg-gray-200 dark:border-gray-400 dark:text-gray-300 dark:hover:bg-opacity-70 dark:hover:text-white dark:focus-visible:ring-gray-600 dark:active:bg-gray-500',
        !!className && className,
      )}
      type={type}
    >
      {children}
    </button>
  );
});

export const CustomButton = forwardRef<HTMLButtonElement, Props>(function CustomButton(props, ref) {
  const { href, children, ...rest } = props;
  if (href) {
    return (
      <>
        <NextLink passHref href={href}>
          <Button ref={ref} {...rest}>
            {children}
          </Button>
        </NextLink>
      </>
    );
  }
  return (
    <Button ref={ref} {...rest}>
      {children}
    </Button>
  );
});
