import { KeyboardEventHandler, useCallback, useEffect, useState } from 'react';

interface UseFocusHandlerOptions {
  observe: unknown;
  isValid: boolean;
  isEmpty: boolean;
  previousInputName?: string;
  nextInputName?: string;
}
export const useFocusHandler = ({
  observe,
  isValid,
  isEmpty,
  previousInputName,
  nextInputName,
}: UseFocusHandlerOptions) => {
  const [isFocused, setFocused] = useState(false);

  useEffect(() => {
    if (isValid && isFocused) {
      const input = document.querySelector<HTMLInputElement>(
        `input[name="${nextInputName}"]`
      );
      if (input) {
        input.focus();
        input.select();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid, observe]);

  const handleFocusPreviousInput = useCallback<KeyboardEventHandler>(
    (event) => {
      if (isEmpty && isFocused && event.key === 'Backspace') {
        const input = document.querySelector<HTMLInputElement>(
          `input[name="${previousInputName}"]`
        );
        if (input) {
          input.focus();
        }
      }
    },
    [isEmpty, isFocused, previousInputName]
  );

  return { setFocused, handleFocusPreviousInput };
};
