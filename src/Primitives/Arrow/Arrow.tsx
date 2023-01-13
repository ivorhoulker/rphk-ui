import * as React from 'react';

import { CSS, animated } from '@react-spring/web';

import { CSSProperties } from 'react';
import clsx from 'clsx';

const Down = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={5}
    stroke="currentColor"
    className={className}
    style={style}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
  </svg>
);

const Left = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={5}
    stroke="currentColor"
    className={className}
    style={style}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);

const Right = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={5}
    stroke="currentColor"
    className={className}
    style={style}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const DownLeft = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={5}
    stroke="currentColor"
    className={className}
    style={style}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25" />
  </svg>
);

const DownRight = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={5}
    stroke="currentColor"
    className={className}
    style={style}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25" />
  </svg>
);

const UpLeft = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={5}
    stroke="currentColor"
    className={className}
    style={style}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 19.5l-15-15m0 0v11.25m0-11.25h11.25" />
  </svg>
);

const UpRight = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={5}
    stroke="currentColor"
    className={className}
    style={style}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
  </svg>
);

const Up = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={5}
    stroke="currentColor"
    className={className}
    style={style}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
  </svg>
);

const componentDict = {
  up: Up,
  down: Down,
  left: Left,
  right: Right,
  'down-left': DownLeft,
  'down-right': DownRight,
  'up-left': UpLeft,
  'up-right': UpRight,
} as const;

export type ArrowKey = keyof typeof componentDict;

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof componentDict;
  active?: boolean;
  style?: CSSProperties;
}

export function Arrow({ variant = 'up', className = '', active = false, style = { width: 40, height: 40 } }: Props) {
  const Component = componentDict[variant];

  return (
    <Component
      className={clsx([
        'transition-all',
        // size === 'md' ? 'h-6 w-6' : size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-8 w-8' : 'h-3 w-3',
        !active && 'text-gray-500',
        active && 'text-purple-500',
        !!className && className,
      ])}
      style={style}
    />
  );
}
