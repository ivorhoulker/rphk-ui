import { AnchorHTMLAttributes, forwardRef } from 'react';

import NextLink from 'next/link';
import { clsx } from 'clsx';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  selected?: boolean;
  href?: string;
  disabled?: boolean;
}

const CustomLinkInside = forwardRef<HTMLAnchorElement, Props>(function CustomLink(props, ref) {
  const { className, children, selected, variant, size, disabled, ...rest } = props;

  return (
    <>
      <a
        {...rest}
        ref={ref}
        aria-disabled={disabled}
        className={clsx(
          className && className,
          selected && 'ring-4',

          !disabled && variant === 'primary' && 'text-primary-400 hover:text-primary-300 ',
          !disabled && variant === 'primary' && selected && 'ring-primary-400',
          !disabled && variant === 'secondary' && 'text-secondary-400 hover:text-secondary-300 ',
          !disabled && variant === 'secondary' && selected && 'ring-secondary-400',

          disabled && 'text-tertiary-400',
          disabled && selected && 'ring-tertiary-400',
          size === 'xs' && 'text-xs',
          size === 'sm' && 'text-sm',
          size === 'md' && 'text-md',
          size === 'lg' && 'text-lg',
          !disabled && 'cursor-pointer',

          'underline underline-offset-4',
          'hover:underline-offset-8',
          'transition-all duration-150 ease-out',
          // "transform-none cursor-not-allowed opacity-50": disabled,
        )}
      >
        {children}
      </a>
    </>
  );
});

export const CustomLink = forwardRef<HTMLAnchorElement, Props>(function CustomLink(props, ref) {
  const { href, ...rest } = props;
  if (href && !href.startsWith('http')) {
    return (
      <>
        <NextLink href={href}>
          <CustomLinkInside ref={ref} {...rest} />
        </NextLink>
      </>
    );
  } else if (href) {
    return <CustomLinkInside href={href} target={'_blank'} ref={ref} {...rest} />;
  }
  return <CustomLinkInside ref={ref} {...rest} />;
});
