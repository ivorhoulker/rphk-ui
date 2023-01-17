import {
  ChangeEventHandler,
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { ChangeEvent } from 'react';
import clsx from 'clsx';

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  className?: string;
  id: string;
  component?: ReactElement;
  placeholder?: string;
  onValueChange?: (str: string) => void;
  onValueSubmit?: (str: string) => void;
}
export const ChatInput = ({ className, id = 'Chat', placeholder, onValueChange, onValueSubmit, ...rest }: Props) => {
  const keysUsed = ['Enter', 'Escape'];
  const ignoreIfActiveElementIsOneOf = ['input', 'textarea']; //'select', 'button', might be added if we were using e.g. enter key
  const inputRef = useRef<HTMLInputElement>();
  const activeElementIsInputField = () => {
    const activeElement = document?.activeElement;
    return activeElement && ignoreIfActiveElementIsOneOf.indexOf(activeElement.tagName.toLowerCase()) !== -1;
  };

  const [value, setValue] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setValue(e.target.value);
      onValueChange?.(e.target.value);
    }
  };

  const handleSubmit = () => {
    if (!inputRef.current.value) return;
    onValueSubmit?.(inputRef.current.value);
    setValue('');
  };

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (document.activeElement === inputRef.current) {
        event.preventDefault();
        //submit
        // if (!value) return inputRef.current.blur();
        handleSubmit();
        inputRef.current.blur();
      } else if (!activeElementIsInputField()) {
        event.preventDefault();
        inputRef.current.focus();
      }
    }

    if (event.key === 'Escape' && document.activeElement === inputRef.current) {
      event.preventDefault();
      inputRef.current.blur();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => {
      document.removeEventListener('keydown', onKeydown);
    };
  }, []);

  return (
    <div className={clsx(['h-full w-full p-1 px-2', !!className && className])}>
      <div className="group relative z-0 w-full ">
        <input
          ref={inputRef}
          {...rest}
          id={id}
          placeholder=""
          name={id}
          value={value}
          onChange={handleChange}
          className={clsx(
            'text-md peer block w-full appearance-none bg-transparent py-2.5 px-0',
            'border-0 text-white',
            'opacity-100 focus:outline-none focus:ring-0',
            !!className && className,
          )}
        />
        <label
          htmlFor={id}
          className={clsx(
            'absolute top-3 -z-10 origin-[0] -translate-y-6 scale-100 transform opacity-0',
            'text-md text-white duration-300 dark:text-white',
            'peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:opacity-100',
            'peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-primary-500 peer-focus:opacity-0',
            !!className && className,
          )}
        >
          {placeholder}
        </label>
      </div>
    </div>
  );
};
