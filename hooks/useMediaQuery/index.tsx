import { useState, useEffect } from 'react';

export default function useMediaQuery(query:string): boolean {
  if (
    typeof window?.matchMedia === 'undefined'
  ) {
    console.warn('The runtime environment does not support window.matchMedia.');
    return false;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [matches, setMatches] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const media = window.matchMedia(query);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

    media.addEventListener('change', listener);

    // Initial check
    setMatches(media.matches);

    return () => (media.removeEventListener('change', listener));
  }, [query]);

  return matches;
}
