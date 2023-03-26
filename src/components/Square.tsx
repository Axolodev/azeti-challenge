import React from "react";
import { Button } from "@mui/material";
import styles from "@/styles/square.module.css";

interface SquareProps {
  value: boolean;
  onClick: () => void;
  word: string;
}

const Square = ({ value, onClick, word }: SquareProps) => {
  return (
    <Button
      className={styles.square}
      onClick={onClick}
      variant={value ? "contained" : "outlined"}
    >
      {word}
    </Button>
  );
};

export default Square;
