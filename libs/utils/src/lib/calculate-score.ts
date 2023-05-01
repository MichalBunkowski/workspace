export const GUESS_IN_FIRST_TRY = 2500;

/**
 * Calculate user score based on amount of tries and correctness of guesses
 * @param {string} word - correct answer
 * @param {string[]} guesses - array of user guesses
 * @returns {number} - user score
 */
export const calculateScore = (word: string, guesses: string[]): number => {
  if (guesses.length === 1 && guesses[0] === word) {
    return GUESS_IN_FIRST_TRY;
  }

  let baseScore = 0;

  if (guesses.includes(word)) {
    baseScore = GUESS_IN_FIRST_TRY / 2.5;
  }

  return guesses.reduce<number>((acc, guess) => {
    if (guess === word) {
      return acc;
    }

    let score = 0;

    guess.split('').forEach((letter, index) => {
      if (letter === word[index]) {
        score += 100;
      } else if (word.includes(letter)) {
        score += 25;
      } else {
        score -= 50;
      }
    });

    return acc + score;
  }, baseScore);
};
