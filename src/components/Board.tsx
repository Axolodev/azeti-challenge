import { linearBoardSize, totalBoardSize } from "@/lib/config";
import styles from "@/styles/board.module.css";
import React from "react";
import { useGameStateContext } from "./GameStateContext";
import Square from "./Square";

function Board() {
  const { currentlySelectedWords, toggleWordIndex, words } =
    useGameStateContext();

  const renderSquare = (index: number) => (
    <Square
      value={currentlySelectedWords[index]}
      key={`square-${index}`}
      onClick={() => toggleWordIndex(index)}
      word={words[index]}
    />
  );

  const squares = Array(totalBoardSize)
    .fill(0)
    .map((_, idx) => renderSquare(idx));

  const containerCustomProperties = {
    "--size": linearBoardSize,
  } as React.CSSProperties;

  return (
    <div className={styles.container} style={containerCustomProperties}>
      {squares}
    </div>
  );
}

export default Board;
