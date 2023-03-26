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

interface useGameContextReturnType
  extends Pick<GameState, "currentlySelectedWords" | "words"> {
  clearCurrentlySelectedWords: () => void;
  generateNewBoard: () => void;
  toggleWordIndex: (index: number) => void;
  playerWon: boolean;
}

export const useGameStateContext = (): useGameContextReturnType => {
  const currentUserContext = React.useContext(GameStateContext);
  let playerWon = false;

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
  };
};
