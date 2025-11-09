import { useEffect, useState } from 'react';

/**
 * Sets and returns a value to state after the passed in millisecond delay
 *
 * @remarks
 * This function can be useful for delayed searching when receiving user inputs in rapid
 * succession.
 *
 * @param value - the value to set after the debounced time
 * @param delay - the time delay in milliseconds before setting the value
 * @returns The set value after the given delay time
 */
export function useDebounce<T>(value: T, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
