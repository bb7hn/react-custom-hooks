import { renderHook, act } from '@testing-library/react';
import { log } from 'console';
import useHistoricalState from '../hooks/useHistoricalState';

describe('useHistoricalState', () => {
  it('should set initial value correctly', () => {
    const { result } = renderHook(() => useHistoricalState('0'));
    expect(result.current[0]).toBe('0');
  });

  it('should update state and history on setter call', () => {
    const { result } = renderHook(() => useHistoricalState('0'));
    act(() => {
      result.current[1]('1');
    });

    expect(result.current[0]).toBe('1');
    expect(result.current[2].history).toEqual(['0', '1']);
  });

  it('should update state on go', () => {
    const { result } = renderHook(() => useHistoricalState('0'));
    act(() => {
      result.current[1]('1');
    });

    act(() => {
      result.current[2].go(0);
    });
    expect(result.current[0]).toBe('0');

    act(() => {
      result.current[2].go(1);
    });
    expect(result.current[0]).toBe('1');

    act(() => {
      result.current[2].go(1000);
    });
    expect(result.current[0]).toBe('1');
  });

  it('should return correct value on previous and next', () => {
    const { result } = renderHook(() => useHistoricalState('0'));
    act(() => {
      result.current[1]('1');
    });

    act(() => {
      result.current[1]('2');
    });

    act(() => {
      result.current[2].previous();
    });

    expect(result.current[0]).toBe('1'); // This should be 'updatedValue2'

    act(() => {
      result.current[2].next();
    });

    expect(result.current[0]).toBe('2'); // This should be 'initialValue'
  });

  it('should return initial state', () => {
    const { result } = renderHook(() => useHistoricalState('0'));
    act(() => {
      result.current[1]('1');
      result.current[1]('2');
      result.current[1]('3');
      result.current[2].previous();
      result.current[2].previous();
      result.current[2].previous();
      result.current[2].previous();
      result.current[2].previous();
      result.current[2].previous();
      result.current[2].previous();
      result.current[2].previous();
      result.current[2].previous();
      result.current[2].previous();
    });
    expect(result.current[0]).toBe('0');
  });

  it('should return latest state in the history', () => {
    const { result } = renderHook(() => useHistoricalState('0'));
    act(() => {
      result.current[1]('1');
      result.current[1]('1');
      result.current[1]('2');
      result.current[1]('3');
      result.current[2].next();
      result.current[2].next();
      result.current[2].next();
      result.current[2].next();
      result.current[2].next();
      result.current[2].next();
    });
    expect(result.current[0]).toBe('3');
  });

  it('history length should not be greater than 5', () => {
    const { result } = renderHook(() => useHistoricalState('0', 5));
    act(() => {
      result.current[1]('1');
      result.current[1]('1');
      result.current[1]('2');
      result.current[1]('3');
      result.current[1]('4');
      result.current[1]('5');
      result.current[1]('6');
      result.current[2].previous();
      result.current[2].previous();
      result.current[1]('7');
    });
    expect(result.current[2].history.length).toEqual(5);
    expect(result.current[0]).toBe('7');
  });

  it('should append end of history after pointer change', () => {
    const { result } = renderHook(() => useHistoricalState('0'));
    act(() => {
      result.current[1]('1');
      result.current[1]('1');
      result.current[1]('2');
      result.current[1]('3');
      result.current[1]('4');
      result.current[2].pointer = 0;
      result.current[1]('5');
    });
    expect(result.current[2].history[result.current[2].history.length - 1]).toBe('5');
  });

  it('should handle case when pointerRef is less than historyRef length - 1', () => {
    const { result } = renderHook(() => useHistoricalState('0', 2));
    act(() => {
      result.current[1]('1');
    });

    act(() => {
      result.current[1]('2');
    });

    act(() => {
      result.current[1]('3');
    });

    act(() => {
      result.current[2].previous();
    });

    act(() => {
      result.current[1]('4');
    });

    act(() => {
      log(JSON.stringify(result));
    });

    expect(result.current[2].history).toEqual(['2', '4']);
    expect(result.current[2].pointer).toEqual(1);
  });

  it('should set value correctly', () => {
    const { result } = renderHook(() => useHistoricalState('0'));
    act(() => {
      result.current[1]((prev) => `test${prev}`);
    });
    expect(result.current[0]).toBe('test0');
  });
});
