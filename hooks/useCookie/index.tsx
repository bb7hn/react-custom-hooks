import { useState, useCallback } from 'react';
import Cookies, { CookieAttributes } from 'js-cookie';

type UseCookieReturnType =
[string | undefined, (newValue:string, options?:CookieAttributes) =>void, ()=>void];
export default function useCookie(name:string, defaultValue:string):UseCookieReturnType {
  const [value, setValue] = useState<string | undefined>(() => {
    const cookie = Cookies.get(name);
    if (cookie) return cookie;
    Cookies.set(name, defaultValue);
    return defaultValue;
  });

  const updateCookie = useCallback(
    (newValue:string, options?:CookieAttributes) => {
      Cookies.set(name, newValue, options);
      setValue(newValue);
    },
    [name],
  );

  const deleteCookie = useCallback(() => {
    Cookies.remove(name);
    setValue(undefined);
  }, [name]);

  return [value, updateCookie, deleteCookie];
}
