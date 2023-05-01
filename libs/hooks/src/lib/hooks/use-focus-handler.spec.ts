import { act, renderHook, waitFor } from '@testing-library/react';

import { useFocusHandler, UseFocusHandlerOptions } from './use-focus-handler';
import React from 'react';

describe('useFocusHandler', () => {
  const mockFindInputElementAndFocus = jest.fn();

  const setup = () => {
    const initialProps: UseFocusHandlerOptions = {
      observe: 'observe',
      isValid: false,
      isEmpty: false,
      previousInputName: 'previousInputName',
      nextInputName: 'nextInputName',
    };

    const { result, rerender } = renderHook(
      (initialValue) => useFocusHandler(initialValue),
      { initialProps }
    );

    return { result, rerender, initialProps };
  };

  beforeAll(() => {
    jest.mock('@workspace/utils', () => ({
      ...jest.requireActual('@workspace/utils'),
      findInputElementAndFocus: mockFindInputElementAndFocus,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should change focus value when callback is triggered', () => {
    const { result } = setup();

    expect(result.current[0]).toBe(false);

    act(() => {
      result.current[1](true);
    });

    expect(result.current[0]).toBe(true);
  });

  it('should call find and focus next element when valid', () => {
    const { result, rerender, initialProps } = setup();

    act(() => {
      result.current[1](true);
    });

    expect(result.current[0]).toBe(true);

    initialProps.isValid = true;

    rerender(initialProps);

    waitFor(() => {
      expect(mockFindInputElementAndFocus).toBeCalledWith(
        'input[name="nextInputName"]'
      );
    });
  });

  it('should call find and focus previous element when empty', () => {
    const { result, rerender, initialProps } = setup();

    act(() => {
      result.current[1](true);
    });

    expect(result.current[0]).toBe(true);

    initialProps.isEmpty = true;
    rerender(initialProps);

    result.current[2]({ key: 'Backspace' } as React.KeyboardEvent);

    waitFor(() => {
      expect(mockFindInputElementAndFocus).toBeCalledWith(
        'input[name="previousInputName"]'
      );
    });
  });
});
