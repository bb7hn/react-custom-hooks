import { renderHook } from '@testing-library/react';
import useMediaQuery from '../hooks/useMediaQuery';

// Mocking window.matchMedia with TypeScript
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query: string) => ({
      matches: query === '(min-width: 960px)',
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

test('should return initial value', () => {
  const { result } = renderHook(() => useMediaQuery('(min-width: 960px)'));

  expect(result.current).toBe(true);
});
