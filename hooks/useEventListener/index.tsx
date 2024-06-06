import {
  RefObject, useEffect, useRef,
} from 'react';
import { EventType } from './types';

export default function useEventListener(
  eventType:EventType,
  callback:(e:Event)=>void,
  ref?:RefObject<HTMLElement>,
) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const element = ref?.current ?? window;
    const handler = (e:Event) => callbackRef.current(e);
    element.addEventListener(eventType, handler);

    return () => element.removeEventListener(eventType, handler);
  }, [eventType, ref]);
}
