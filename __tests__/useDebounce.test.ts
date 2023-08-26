import { renderHook, act } from '@testing-library/react';
import useDebounce from '../src/useDebounce';

jest.useFakeTimers();

test('should return initial value', () => {
  const { result } = renderHook(() => useDebounce('test'));

  expect(result.current).toBe('test');
});

test('should debounce input value', () => {
  const { result, rerender } = renderHook(({ inputValue }) => useDebounce(inputValue), {
    initialProps: { inputValue: 'initial' },
  });

  // Initial value
  expect(result.current).toBe('initial');

  // Change input value and debounce
  rerender({ inputValue: '1' });
  act(() => {
    jest.advanceTimersByTime(100); // Advance timer by less than debounce time
  });
  expect(result.current).toBe('initial'); // Debounced value hasn't changed yet

  // Change input value again and debounce
  rerender({ inputValue: '2' });
  act(() => {
    jest.advanceTimersByTime(100); // Advance timer by less than debounce time
  });
  expect(result.current).toBe('initial'); // Debounced value still hasn't changed

  // Change input value once more and debounce
  rerender({ inputValue: '3' });
  act(() => {
    jest.advanceTimersByTime(500); // Advance timer by debounce time
  });
  expect(result.current).toBe('3'); // Debounced value should have change
});
