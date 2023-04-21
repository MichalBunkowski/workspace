import { findInputElementAndFocus } from '@workspace/utils';
import {
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

interface UseFocusHandlerOptions {
  observe: unknown;
  isValid: boolean;
  isEmpty: boolean;
  previousInputName?: string;
  nextInputName?: string;
}

type UseFocusHandlerReturn = [
  boolean,
  Dispatch<SetStateAction<boolean>>,
  KeyboardEventHandler
];

export const useFocusHandler = ({
  observe,
  isValid,
  isEmpty,
  previousInputName,
  nextInputName,
}: UseFocusHandlerOptions): UseFocusHandlerReturn => {
  const [isFocused, setFocused] = useState(false);

  useEffect(() => {
    if (isValid && isFocused) {
      findInputElementAndFocus(`input[name="${nextInputName}"]`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValid, observe]);

  const handleFocusPreviousInput = useCallback<KeyboardEventHandler>(
    (event) => {
      if (isEmpty && isFocused && event.key === 'Backspace') {
        findInputElementAndFocus(`input[name="${previousInputName}"]`);
      }
    },
    [isEmpty, isFocused, previousInputName]
  );

  return useMemo(
    () => [isFocused, setFocused, handleFocusPreviousInput],
    [isFocused, handleFocusPreviousInput]
  );
};
