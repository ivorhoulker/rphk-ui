import { ReactNode } from 'react';
import clsx from 'clsx';

interface Props {
  className?: string;
  children?: ReactNode;
  id: string;
  placeholder?: string;
}
export const TextInput = ({ placeholder, className, id, children, ...rest }: Props) => {
  return (
    <div className="group relative z-0 mb-6 w-full">
      <input
        {...rest}
        id={id}
        placeholder={placeholder ?? 'placeholder'}
        name={id}
        className={clsx(
          !!className && className,
          'peer block w-full appearance-none bg-transparent py-2.5 px-0 text-sm text-white',
          'border-0 border-b-2 border-gray-600',
          'focus:border-primary-500 focus:outline-none focus:ring-0',
        )}
      />
      <label
        htmlFor={id}
        className={clsx(
          'absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform',
          'text-sm text-gray-400 duration-300',
          'peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100',
          'peer-focus:text-primary-500 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium',
        )}
      >
        {children}
      </label>
    </div>
  );
};
