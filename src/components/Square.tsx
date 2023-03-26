import React from "react";
import { Button } from "@mui/material";
import styles from "@/styles/square.module.css";

interface SquareProps {
  value: boolean;
  onClick: () => void;
}

const Square = ({ value, onClick }: SquareProps) => {
  return (
    <Button
      className={styles.square}
      onClick={onClick}
      variant={value ? "contained" : "outlined"}
    >
      Word
    </Button>
  );
};

export default Square;
