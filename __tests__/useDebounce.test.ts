import { renderHook } from '@testing-library/react';
import useDebounce from '../src/useDebounce';

test('should return initial value', () => {
  const { result,rerender } = renderHook(() => useDebounce('test'));

  expect(result.current).toBe('test');
  rerender('ok')
  rerender('ok1')
  rerender('ok2')
  setTimeout(() => {
    expect(result.current).toBe('ok1');  
  }, 500);
});

// Add more test cases as needed
