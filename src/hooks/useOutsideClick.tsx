import { Ref, useEffect, useRef } from 'react';

/**
 * Hook that alerts clicks outside of the passed ref
 */
export function useOutsideClick(onClick: () => void) {
  const ref = useRef(null);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref?.current && !ref?.current.contains(event?.target as Node)) {
        onClick();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
  return ref;
}
