import { describe, expect, test } from "@jest/globals";
import { totalBoardSize } from "./config";
import dictionary from "./Dictionary";
import getBoardWords from "./getBoardWords";

function checkWordsAreUnique(words: string[]): boolean {
  let [currentWord, ...remainingWords] = words;

  while (remainingWords.length > 1) {
    if (remainingWords.indexOf(currentWord) !== -1) {
      return false;
    }

    [currentWord, ...remainingWords] = remainingWords;
  }
  return true;
}

describe("getWords", () => {
  test("results should have exactly `totalBoardSize` words", () => {
    const result = getBoardWords(dictionary);
    expect(result.length).toBe(totalBoardSize);
  });

  test("words only appear once", () => {
    const dictionaryCopy = dictionary.slice(0, totalBoardSize);
    const result1 = getBoardWords(dictionaryCopy);
    const result2 = getBoardWords(dictionaryCopy);
    const result3 = getBoardWords(dictionaryCopy);

    expect(checkWordsAreUnique(result1)).toBe(true);
    expect(checkWordsAreUnique(result2)).toBe(true);
    expect(checkWordsAreUnique(result3)).toBe(true);
  });
});
