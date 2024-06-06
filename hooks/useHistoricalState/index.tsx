/* eslint-disable @typescript-eslint/no-unnecessary-type-constraint */
import { useCallback, useRef, useState } from 'react';
import { ReturnValue, SetterParam } from './types';

export default function useHistoricalState <T extends unknown>(
  defaultValue:T,
  capacity = Number.POSITIVE_INFINITY,
):ReturnValue<T> {
  const [value, setValue] = useState(defaultValue);
  const historyRef = useRef([value]);
  const pointerRef = useRef(0);
  const set = useCallback(
    (v:SetterParam<T> | T) => {
      const resolvedValue = typeof v === 'function' ? (v as SetterParam<T>)(value) : v;
      if (historyRef.current[pointerRef.current] !== resolvedValue) {
        if (pointerRef.current < historyRef.current.length - 1) {
          historyRef.current.splice(pointerRef.current + 1);
        }
        historyRef.current.push(resolvedValue);

        while (historyRef.current.length > capacity) {
          historyRef.current.shift();
        }
        pointerRef.current = historyRef.current.length - 1;
      }
      setValue(resolvedValue);
    },
    [capacity, value],
  );

  const previous = useCallback(() => {
    let p = undefined as T;
    setValue((prev) => {
      if (pointerRef.current <= 0) {
        p = prev;
        return prev;
      }
      pointerRef.current -= 1;
      p = historyRef.current[pointerRef.current];
      return historyRef.current[pointerRef.current];
    });
    return p;
  }, []);

  const next = useCallback(() => {
    let n = undefined as T;
    setValue((prev) => {
      if (pointerRef.current >= historyRef.current.length - 1) {
        n = prev;
        return prev;
      }
      pointerRef.current += 1;
      n = historyRef.current[pointerRef.current];
      return historyRef.current[pointerRef.current];
    });
    return n;
  }, []);

  const go = useCallback((index:number) => {
    let g = undefined as T;
    setValue((prev) => {
      if (index < 0 || index > historyRef.current.length - 1) {
        g = prev;
        return prev;
      }
      pointerRef.current = index;
      g = historyRef.current[pointerRef.current];
      return historyRef.current[pointerRef.current];
    });
    return g;
  }, []);

  return [
    value,
    set,
    {
      history: historyRef.current,
      pointer: pointerRef.current,
      previous,
      next,
      go,
    },
  ];
}
