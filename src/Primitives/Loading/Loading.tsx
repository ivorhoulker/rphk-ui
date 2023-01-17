import { FC } from 'react';
import { clsx } from 'clsx';

interface Props {
  className?: string;
  variant: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
export const Loading: FC<Props> = ({ className, variant = 'primary', size = 'md' }) => {
  return (
    <>
      <div
        className={clsx({
          [className || '']: !!className,
          'text-center': true,
        })}
      >
        <div role="status">
          {/* <svg
            className={clsx(
              'mr-2 inline animate-spin text-gray-600 dark:text-gray-500',
              variant === 'primary' && ' fill-primary-600 dark:fill-primary-500',
              variant === 'secondary' && 'fill-secondary-600  dark:fill-secondary-500',
              size === 'sm' && 'h-4 w-4',
              size === 'md' && 'h-8 w-8',
              size === 'lg' && 'h-12 w-12',
              size === 'xl' && 'h-16 w-16',
            )}
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          > */}
          <svg
            className={clsx(
              '-ml-1 mr-3 animate-spin text-gray-600 dark:text-gray-500',

              variant === 'primary' && ' text-primary-600 dark:text-primary-500',
              variant === 'secondary' && 'fill-secondary-600  dark:fill-secondary-500',
              size === 'sm' && 'h-4 w-4',
              size === 'md' && 'h-5 w-5',
              size === 'lg' && 'h-8 w-8',
              size === 'xl' && 'h-12 w-12',
            )}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>

          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </>
  );
};
