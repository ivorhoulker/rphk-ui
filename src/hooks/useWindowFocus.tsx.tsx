import { useEffect, useState } from 'react';

// User has switched back to the tab

export function useWindowFocus() {
  const [isFocused, setIsFocused] = useState(true);
  const onFocus = () => {
    setIsFocused(true);
  };

  // User has switched away from the tab (AKA tab is hidden)
  const onBlur = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);
    // Calls onFocus when the window first loads
    onFocus();
    // Specify how to clean up after this effect:
    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  return { isFocused };
}
