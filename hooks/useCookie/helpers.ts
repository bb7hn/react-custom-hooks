/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
/* eslint-disable @typescript-eslint/prefer-for-of */

export function setCookie<T extends unknown>(cname:string, value:T, expDays = 7) {
  const d = new Date();
  d.setTime(d.getTime() + (expDays * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${JSON.stringify(value)};${expires};path=/`;
}

export function getCookie<T>(cname:string):T | undefined {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.startsWith(' ')) {
      c = c.substring(1);
    }
    if (c.startsWith(name)) {
      try {
        return JSON.parse(c.substring(name.length, c.length)) as T;
      } catch (error) {
        return c.substring(name.length, c.length) as T;
      }
    }
  }
  return undefined;
}
