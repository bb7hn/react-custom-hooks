import { useEffect, RefObject, useCallback } from 'react';

export default function useOutsideClick(ref: RefObject<HTMLElement>, callback: () => void) {
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (!ref.current || ref.current !== event.target && !ref.current.contains(event.target as Node)) {
        callback();
    }
  },[callback, ref]);

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);
    return () => {
        window.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside, ref]);

  return {
    ref,
  };
}

export {useOutsideClick}