import { act, renderHook } from '@testing-library/react';
import useMediaQuery from '../hooks/useMediaQuery';
import matchMediaMock from './mocks/matchMedia';

const defaultInnerWidth = 800;

describe('useMediaQuery', () => {
  describe('without window.matchMedia', () => {
    const originalConsoleWarn = console.warn;
    const originalMatchMedia = window.matchMedia;

    beforeEach(() => {
      console.warn = jest.fn();
      window.matchMedia = undefined as unknown as (q:string)=>MediaQueryList;
    });

    afterEach(() => {
      console.warn = originalConsoleWarn;
      window.matchMedia = originalMatchMedia;
    });

    it('should still work without window.matchMedia available', () => {
      const { result } = renderHook(() => useMediaQuery('(max-width:600px)'));
      expect(result.current).toBe(false);
    });
  });

  describe('with window.matchMedia', () => {
    const originalConsoleError = console.error;

    beforeAll(() => {
      matchMediaMock(window);

      window.resizeTo = function resizeTo(
        width = defaultInnerWidth,
        height = 800,
      ) {
        Object.assign(this, {
          innerWidth: width,
          innerHeight: height,
          outerWidth: width,
          outerHeight: height,
        }).dispatchEvent(new this.Event('resize'));
      };
    });

    beforeEach(() => {
      window.resizeTo(600, 800);
      console.error = jest.fn();
    });

    afterEach(() => {
      console.error = originalConsoleError;
    });

    it('returns a match if the query string matches an active media', () => {
      const { result } = renderHook(() => useMediaQuery('(min-width: 400px)'));
      expect(result.current).toBe(true);
    });

    it('should not return a match if the query string does not match an active media', () => {
      const { result } = renderHook(() => useMediaQuery('(min-width: 1000px)'));
      expect(result.current).toBe(false);
    });

    it('should only reconcile if the media query is changed or is matched/unmatched', () => {
      const { result } = renderHook(() => useMediaQuery('(max-width: 400px)'));
      expect(result.current).toBe(false);

      act(() => {
        window.resizeTo(800, 600);
      });

      expect(result.current).toBe(false);
    });

    it('should return a new match if the media is changed dynamically', () => {
      const { result } = renderHook(() => useMediaQuery('(min-width: 1000px)'));
      expect(result.current).toBe(false);

      act(() => {
        window.resizeTo(1200, 800);
      });

      expect(result.current).toBe(true);
    });
  });
});
