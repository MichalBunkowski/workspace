import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { noop } from '@workspace/utils';

export interface SingleWordState {
  value: string;
  letters: string[];
  updateLetterAtIndex(index: number, value: string): void;
}

const SingleWordContext = createContext<SingleWordState>({
  value: '',
  letters: [],
  updateLetterAtIndex: noop,
});

interface SingleWordProviderProps {
  isTouched: boolean;
  onChange?: (value: string) => void;
}

export const SingleWordProvider: FC<
  PropsWithChildren<SingleWordProviderProps>
> = ({ children, isTouched, onChange }) => {
  const [letters, setLetters] = useState<string[]>([]);

  const value = useMemo(() => {
    return letters.join('');
  }, [letters]);

  const updateLetterAtIndex = useCallback((index: number, value: string) => {
    setLetters((prev) => {
      const next = [...prev];
      next[index] = value;

      return next;
    });
  }, []);

  useEffect(() => {
    if (isTouched) {
      onChange?.(value);
    }
  }, [isTouched, onChange, value]);

  return (
    <SingleWordContext.Provider value={{ value, letters, updateLetterAtIndex }}>
      {children}
    </SingleWordContext.Provider>
  );
};

export const SingleWordConsumer = SingleWordContext.Consumer;
export const useSingleWord = () => {
  const ctx = useContext(SingleWordContext);

  if (!ctx) {
    throw new Error('useSingleWord must be used under SingleWordProvider');
  }

  return ctx;
};
