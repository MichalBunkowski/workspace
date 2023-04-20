import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { createSelectors } from '@workspace/utils';
import omit from 'lodash/omit';

import { MAX_AMOUNT_OF_TRIES } from '../constants/game';

interface WordleState {
  words: string[];
  drawnWord: string;
  isWinner: boolean;
  isGameOver: boolean;
  amountOfTries: number;

  isFetchingError: boolean;
}

const initialState: WordleState = {
  words: [],
  drawnWord: '',
  isWinner: false,
  isGameOver: false,
  amountOfTries: 0,

  isFetchingError: false,
};

interface WordleAction {
  draw: () => Promise<void>;
  reset: () => void;
  check: (word: string) => boolean;
}

const useWordleStoreBase = create(
  devtools(
    persist<WordleState & WordleAction>(
      (set, get) => ({
        ...initialState,

        draw: async () => {
          try {
            let words = get().words;

            if (!words.length) {
              words = await fetch(
                'https://gist.githubusercontent.com/cfreshman/a03ef2cba789d8cf00c08f767e0fad7b/raw/1792f853e1cd0249f7588c724e00d46dbc4894eb/wordle-answers-alphabetical.txt'
              )
                .then((res) => res.text())
                .then((res) => res.split('\n'));
            }

            set({
              words,
              drawnWord: words[Math.floor(Math.random() * words.length - 1)],
              isFetchingError: false,
            });
          } catch (e) {
            set({
              isFetchingError: true,
            });
          }
        },

        check: (word: string) => {
          const isCorrect = word === get().drawnWord;
          const amountOfTries = get().amountOfTries + 1;

          set({
            isWinner: isCorrect,
            isGameOver: amountOfTries >= MAX_AMOUNT_OF_TRIES || isCorrect,
            amountOfTries: amountOfTries,
          });

          return isCorrect;
        },
        reset: () => {
          set(omit(initialState, ['words', 'drawnWord', 'isFetchingError']));

          get().draw();
        },
      }),
      { name: 'wordle-storage' }
    )
  )
);

export const useWordleStore = createSelectors(useWordleStoreBase);
