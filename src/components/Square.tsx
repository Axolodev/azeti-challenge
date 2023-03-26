import React from "react";
import { Button } from "@mui/material";
import styles from "@/styles/square.module.css";
import { useGameStateContext } from "./GameStateContext";

interface SquareProps {
  value: boolean;
  onClick: () => void;
  word: string;
}

const Square = ({ value, onClick, word }: SquareProps) => {
  const { playerWon } = useGameStateContext();

  return (
    <Button
      className={`${styles.square} ${playerWon && styles.victory}`}
      onClick={onClick}
      variant={value ? "contained" : "outlined"}
      color={playerWon ? "success" : "primary"}
      tabIndex={playerWon ? -1 : 0}
    >
      {word}
    </Button>
  );
};

export default Square;
