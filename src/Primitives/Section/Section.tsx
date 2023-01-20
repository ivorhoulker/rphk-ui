import { PropsWithChildren } from 'react';
import clsx from 'clsx';

export interface SectionProps extends PropsWithChildren {
  className?: string;
}
export const Section = ({ className, children }: SectionProps) => {
  return (
    <section
      className={clsx('lg: w-full text-gray-900 dark:text-gray-50  lg:max-w-3xl lg:py-10', !!className && className)}
    >
      {children}
    </section>
  );
};
