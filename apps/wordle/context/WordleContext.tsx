import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { noop } from '@workspace/utils';

interface WordleState {
  drawnWord: string;
  verifyUserInput: (word: string) => boolean;
  isWinner: boolean;
}

const WordleContext = createContext<WordleState>({
  drawnWord: '',
  verifyUserInput: noop,
  isWinner: false,
});

export const WordleProvider: FC<PropsWithChildren> = ({ children }) => {
  const [words, setWords] = useState<string[]>([]);
  const [drawnWord, setDrawnWord] = useState<string | null>(null);
  const [isWinner, setWinner] = useState<boolean>(false);

  const verifyUserInput = useCallback(
    (word: string) => {
      const result = word === drawnWord;
      setWinner(result);

      return result;
    },
    [drawnWord]
  );

  useEffect(() => {
    (async () => {
      fetch(
        'https://gist.githubusercontent.com/cfreshman/a03ef2cba789d8cf00c08f767e0fad7b/raw/1792f853e1cd0249f7588c724e00d46dbc4894eb/wordle-answers-alphabetical.txt'
      )
        .then((res) => res.text())
        .then((res) => setWords(res.split('\n')))
        .catch((e) => console.log(e));
    })();
  }, []);

  useEffect(() => {
    if (words.length && !drawnWord) {
      setDrawnWord(words[Math.floor(Math.random() * words.length - 1)]);
    }
  }, [drawnWord, words]);

  if (!drawnWord) return null;

  return (
    <WordleContext.Provider
      value={{
        drawnWord,
        isWinner,
        verifyUserInput,
      }}
    >
      {children}
    </WordleContext.Provider>
  );
};

export const useWordle = () => {
  const ctx = useContext(WordleContext);

  if (!ctx) {
    throw new Error('useWordle must be used under WordleProvider');
  }

  return ctx;
};
