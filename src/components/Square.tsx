import React from "react";
import { Button } from "@mui/material";
import styles from "@/styles/square.module.css";
import { useGameStateContext } from "./GameStateContext";
import { linearBoardSize, totalBoardSize } from "@/lib/config";

interface SquareProps {
  value: boolean;
  onClick: () => void;
  word: string;
  index: number;
}

const Square = ({ value, onClick, word, index }: SquareProps) => {
  const {
    playerWon,
    indexForVictoryRow,
    indexForVictoryColumn,
    hasDiagonalVictory,
    hasInverseDiagonalVictory,
  } = useGameStateContext();

  const currentRow = Math.floor(index / linearBoardSize);
  const currentCol = Math.floor(index % linearBoardSize);
  const isInMainDiagonal = index % (linearBoardSize + 1) === 0;
  const isInInverseDiagonal =
    index % (linearBoardSize - 1) === 0 &&
    index !== 0 &&
    index !== totalBoardSize - 1;

  const shouldBeGreen =
    currentCol === indexForVictoryColumn ||
    currentRow === indexForVictoryRow ||
    (isInMainDiagonal && hasDiagonalVictory) ||
    (isInInverseDiagonal && hasInverseDiagonalVictory);

  return (
    <Button
      className={`${styles.square} ${playerWon && styles.victory}`}
      onClick={onClick}
      variant={value ? "contained" : "outlined"}
      color={shouldBeGreen ? "success" : "primary"}
      tabIndex={playerWon ? -1 : 0}
    >
      {word}
    </Button>
  );
};

export default Square;
