/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import { useEffect, useState } from 'react';

export default function useDebounce<T extends unknown>(initialValue: T, timeOutInMs = 500): T {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValue(initialValue);
    }, timeOutInMs);

    // Clear the timer if the effect re-runs before the timeout
    return () => {
      clearTimeout(timer);
    };
  }, [initialValue, timeOutInMs]);

  return value;
}
