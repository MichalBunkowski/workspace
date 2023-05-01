import { calculateScore, GUESS_IN_FIRST_TRY } from './calculateScore';

const correctWord = 'hello';

describe('calculateScore', () => {
  it(`should return ${GUESS_IN_FIRST_TRY} for guess in first try`, () => {
    const guesses = ['hello'];

    const score = calculateScore(correctWord, guesses);

    expect(score).toEqual(GUESS_IN_FIRST_TRY);
  });

  it(`should return 825 for guess on second try, 
  while first guess have only one correct letter but at wrong position`, () => {
    const guesses = ['brave', correctWord];

    const score = calculateScore(correctWord, guesses);

    expect(score).toEqual(825);
  });
});
