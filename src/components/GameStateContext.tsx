import { linearBoardSize } from "@/lib/config";
import Dictionary from "@/lib/Dictionary";
import getBoardWords from "@/lib/getBoardWords";
import * as React from "react";

interface GameState {
  // A list of indeces of all the words that have been selected
  currentlySelectedWords: boolean[];
  // All the words for the current iteration of the game
  words: string[];
  setCurrentlySelectedWords: React.Dispatch<React.SetStateAction<boolean[]>>;
  setWords: React.Dispatch<React.SetStateAction<string[]>>;
}

const GameStateContext = React.createContext<GameState | null>(null);

export const GameStateProvider = ({ children }: React.PropsWithChildren) => {
  const [words, setWords] = React.useState<string[]>([]);
  const [currentlySelectedWords, setCurrentlySelectedWords] = React.useState<
    boolean[]
  >([]);

  return (
    <GameStateContext.Provider
      value={{
        words,
        setWords,
        currentlySelectedWords,
        setCurrentlySelectedWords,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameStateContext = () => {
  const currentUserContext = React.useContext(GameStateContext);

  if (!currentUserContext) {
    throw new Error(
      "useCurrentUser has to be used within <CurrentUserContext.Provider>"
    );
  }

  const { words, currentlySelectedWords, setWords, setCurrentlySelectedWords } =
    currentUserContext;

  React.useEffect(() => {
    setWords(getBoardWords(Dictionary));
  }, [setWords]);

  function clearCurrentlySelectedWords() {
    setCurrentlySelectedWords([]);
  }

  function generateNewBoard() {
    setWords(getBoardWords(Dictionary));
    setCurrentlySelectedWords([]);
  }

  function getIndexForVictoryRow() {
    for (let i = 0; i < linearBoardSize; i++) {
      let accum = true;

      for (let j = 0; j < linearBoardSize; j++) {
        accum &&= currentlySelectedWords[linearBoardSize * i + j];
      }

      if (accum) {
        return i;
      }
    }
    return -1;
  }

  function getIndexForVictoryColumn() {
    for (let index = 0; index < linearBoardSize; index++) {
      let accum = true;

      for (let power = 0; power < linearBoardSize; power++) {
        accum &&= currentlySelectedWords[linearBoardSize * power + index];
      }

      if (accum) {
        return index;
      }
    }

    return -1;
  }

  function checkDiagonalForVictory() {
    let hasDiagonalVictory = true;

    for (let index = 0; index < linearBoardSize; index++) {
      hasDiagonalVictory &&=
        currentlySelectedWords[linearBoardSize * index + index];
    }

    return hasDiagonalVictory;
  }

  function checkInverseDiagonalForVictory(): boolean {
    let hasInverseDiagonalVictory = true;
    for (let index = 0; index < linearBoardSize; index++) {
      hasInverseDiagonalVictory &&=
        currentlySelectedWords[linearBoardSize * (index + 1) - index - 1];
    }
    return hasInverseDiagonalVictory;
  }

  const indexForVictoryRow = getIndexForVictoryRow();
  const indexForVictoryColumn = getIndexForVictoryColumn();
  const hasDiagonalVictory = checkDiagonalForVictory();
  const hasInverseDiagonalVictory = checkInverseDiagonalForVictory();

  let playerWon =
    indexForVictoryRow !== -1 ||
    indexForVictoryColumn !== -1 ||
    hasDiagonalVictory ||
    hasInverseDiagonalVictory;

  /**
   * Adds a word index into the inner list if it does not exist, removes it if it does.
   * @param index the index to be toggled
   */
  function toggleWordIndex(index: number) {
    const currentlySelectedWordsCopy = [...currentlySelectedWords];
    currentlySelectedWordsCopy[index] = !currentlySelectedWordsCopy[index];
    setCurrentlySelectedWords(currentlySelectedWordsCopy);
  }

  return {
    words,
    currentlySelectedWords,
    clearCurrentlySelectedWords,
    generateNewBoard,
    toggleWordIndex,
    playerWon,
    indexForVictoryRow,
    indexForVictoryColumn,
    hasDiagonalVictory,
    hasInverseDiagonalVictory,
  };
};
