import { renderHook, act } from '@testing-library/react';
import { useOutsideClick } from '../hooks/useOutsideClick';

describe('Test useOutsideClick', () => {
  it('should call callback', () => {
    const callback = jest.fn();
    const ref = { current: document.createElement('div') };
    const { unmount } = renderHook(() => useOutsideClick(ref, callback));

    act(() => {
      document.body.click();
    });

    expect(callback).toHaveBeenCalled();
    unmount();
  });

  it('should not call callback', () => {
    const callback = jest.fn();
    const ref = { current: document.createElement('div') };
    const { unmount } = renderHook(() => useOutsideClick(ref, callback));

    act(() => {
      ref.current.click();
    });

    expect(callback).not.toHaveBeenCalled();
    unmount();
  });
});
