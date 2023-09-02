/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */

import { useState } from 'react';

function getCookie(cname:string) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.startsWith(' ')) {
      c = c.substring(1);
    }
    if (c.startsWith(name)) {
      return c.substring(name.length, c.length);
    }
  }
  return undefined;
}

function setCookie<T extends unknown>(cname:string, cvalue:T, expDays = 7) {
  const d = new Date();
  d.setTime(d.getTime() + (expDays * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${JSON.stringify(cvalue)};${expires};path=/`;
}

export function useCookie<T extends unknown>(name:string, defaultValue:T, expirationDays?:number) {
  const [cookie, setValue] = useState(
    () => {
      const cookieValue = getCookie(name);

      if (cookieValue === undefined) {
        setCookie(name, expirationDays);
        return defaultValue;
      }

      return cookieValue;
    },
  );

  const updateCookie = (value = getCookie(name) ?? defaultValue, expDays?:number) => {
    setValue(value);
    setCookie(name, value, expDays);
  };

  const deleteCookie = () => {
    setCookie(name, '', 0);
  };

  return [cookie, updateCookie, deleteCookie];
}

export default useCookie;
