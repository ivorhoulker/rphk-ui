import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

import { Field } from 'formik';
import clsx from 'clsx';

export interface TextInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string;
  label: string;
  id: string;
  formik?: boolean;
  errors?: string;
  touched?: boolean;
  isSubmitting?: boolean;
}
export const TextInput = ({
  className,
  id = 'username',
  label = 'Username',
  required,
  value,
  isSubmitting = false,
  errors,
  touched,
  ...rest
}: TextInputProps) => {
  return (
    <div className={clsx('group relative z-0 mb-6 w-full text-gray-900 dark:text-gray-50', !!className && className)}>
      <input
        {...rest}
        id={id}
        placeholder=""
        // required={required}
        name={id}
        className={clsx(
          'peer block w-full appearance-none bg-transparent py-2.5 px-0 text-xl sm:text-sm',
          'border-0 border-b-2 border-gray-400 dark:border-gray-300',
          'focus:border-primary-500 focus:outline-none focus:ring-0',

          isSubmitting && 'text-gray-400 dark:text-gray-400',
        )}
        required={required}
        value={value}
      />

      <label
        htmlFor={id}
        className={clsx(
          'absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform',

          'text-sm text-gray-400 duration-300 dark:text-gray-300',
          'peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100',
          'peer-focus:text-primary-500 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium',
          !!className && className,
        )}
      >
        {label}
      </label>
      {errors && touched && <p className="mt-2 text-sm text-red-400">{errors}</p>}
    </div>
  );
};
