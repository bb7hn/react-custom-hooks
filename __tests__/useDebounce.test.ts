import { renderHook } from '@testing-library/react';
import useDebounce from '../src/useDebounce';

test('should return initial value', () => {
  const { result,rerender } = renderHook(() => useDebounce('test'));

  expect(result.current).toBe('asd');  
});

// Add more test cases as needed
