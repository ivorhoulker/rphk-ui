import { PropsWithChildren } from 'react';
import React from 'react';
import clsx from 'clsx';

export interface SectionProps extends PropsWithChildren {
  className?: string;
}
export const Section = ({ className, children }: SectionProps) => {
  return <section className={clsx('w-full p-3 sm:p-5 lg:max-w-3xl', !!className && className)}>{children}</section>;
};
