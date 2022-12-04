import { DetailedHTMLProps, InputHTMLAttributes, ReactElement } from 'react';

import clsx from 'clsx';

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string;
  id: string;
  component?: ReactElement;
}
export const TextInput = ({ className, id = 'Username', ...rest }: Props) => {
  return (
    <div className="group relative z-0 mb-6 w-full text-gray-900 dark:text-gray-50">
      <input
        {...rest}
        id={id}
        placeholder=""
        name={id}
        className={clsx(
          'peer block w-full appearance-none bg-transparent py-2.5 px-0 text-sm',
          'border-0 border-b-2 border-gray-400 dark:border-gray-300',
          'focus:border-primary-500 focus:outline-none focus:ring-0',
          !!className && className,
        )}
      />
      <label
        htmlFor={id}
        className={clsx(
          'absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform',
          'text-sm text-gray-400 duration-300 dark:text-gray-300',
          'peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100',
          'peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-primary-500',
          !!className && className,
        )}
      >
        {id}
      </label>
    </div>
  );
};
