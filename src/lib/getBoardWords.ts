import { totalBoardSize } from "./config";

/**
 * Generates a list of N non-repeating words, where N is the total size of the
 * Buzzword Bingo playing board
 * @param words A list of non-repeating words
 * @returns A string array with non-repeating words
 */
function getBoardWords(words: string[]): string[] {
  const dictionaryCopy = [...words];
  const result: string[] = [];

  while (result.length < totalBoardSize) {
    const randomWordIndex = Math.floor(Math.random() * dictionaryCopy.length);
    const newWord = dictionaryCopy[randomWordIndex];
    result.push(newWord);
    dictionaryCopy.splice(randomWordIndex, 1);
  }

  return result;
}

export default getBoardWords;
