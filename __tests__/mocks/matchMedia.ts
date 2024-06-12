export default function matchMediaMock(window:Window) {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => {
      let listeners: ((event: MediaQueryListEvent) => void)[] = [];
      const instance = {
        matches: query.includes('min-width') ? parseInt(query.match(/\d+/)![0], 10) <= window.innerWidth : parseInt(query.match(/\d+/)![0], 10) >= window.innerWidth,
        media: query,
        onchange: null,
        /* addListener: (
          listener: (event: MediaQueryListEvent) => void,
        ) => listeners.push(listener), // Deprecated */
        // eslint-disable-next-line no-return-assign
        /* removeListener: (
          listener: (event: MediaQueryListEvent) => void,
        ) => listeners = listeners.filter((l) => l !== listener), // Deprecated */
        addEventListener: (event: string, listener: (event: MediaQueryListEvent) => void) => {
          if (event === 'change') listeners.push(listener);
        },
        removeEventListener: (event: string, listener: (event: MediaQueryListEvent) => void) => {
          if (event === 'change') listeners = listeners.filter((l) => l !== listener);
        },
        dispatchEvent: (event: Event) => {
          if (event.type === 'change') listeners.forEach((listener) => listener(event as MediaQueryListEvent));
        },
      };

      window.addEventListener('resize', () => {
        const match = query.includes('min-width') ? parseInt(query.match(/\d+/)![0], 10) <= window.innerWidth : parseInt(query.match(/\d+/)![0], 10) >= window.innerWidth;
        if (instance.matches !== match) {
          instance.matches = match;
          const event = new Event('change') as MediaQueryListEvent;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          event.matches = match;
          instance.dispatchEvent(event);
        }
      });

      return instance;
    }),
  });
}
