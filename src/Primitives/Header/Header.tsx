import { PropsWithChildren } from 'react';
import clsx from 'clsx';

export interface HeaderProps extends PropsWithChildren {
  className?: string;
}
export const Header = ({ className, children }: HeaderProps) => {
  return (
    <h1
      className={clsx(
        'mb-4 w-full text-center text-8xl font-extrabold text-gray-900 dark:text-white',
        !!className && className,
      )}
    >
      <span className="to-secondary-600 from-primary-400 bg-gradient-to-r bg-clip-text text-transparent">
        {children}
      </span>
    </h1>
  );
};
