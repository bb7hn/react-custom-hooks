import { act, renderHook } from '@testing-library/react';
import { useCookie } from '../hooks/useCookie';

describe('useCookie', () => {
  beforeEach(() => {
    // Clear any existing cookies before each test
    document.cookie.split(';').forEach((c) => {
      document.cookie = c.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });
  });

  /*
    #test cases
    1.)when call the hook should return initial value
    2.)when call the update fn should return updated value
    3.)when call the delete fn should return empty string
  */

  it('should return initial value correctly', () => {
    const { result } = renderHook(() => useCookie('test', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('should update value correctly', () => {
    const { result } = renderHook(() => useCookie('test', 'initial'));
    expect(result.current[0]).toBe('initial');
    act(() => {
      result.current[1]('great');
    });
    expect(result.current[0]).toBe('great');
  });

  it('should delete value correctly', () => {
    const { result } = renderHook(() => useCookie('test', 'initial'));
    expect(result.current[0]).toBe('initial');
    act(() => {
      result.current[2]();
    });
    expect(result.current[0]).toBe(undefined);
  });

  it('should return existing cookie correctly', () => {
    renderHook(() => useCookie('test', 'initial'));
    const { result } = renderHook(() => useCookie('test', ''));
    expect(result.current[0]).toBe('initial');
  });
});
