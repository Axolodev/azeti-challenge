import React from "react";
import Square from "./Square";

function Board() {
  const size = 5;
  const [squares, setSquares] = React.useState(Array(size * size).fill(false));

  const onClick = (i: number) => {
    const newSquares = squares.slice();
    newSquares[i] = !newSquares[i];
    setSquares(newSquares);
  };

  const renderSquare = (i: number) => (
    <Square value={squares[i]} key={`square-${i}`} onClick={() => onClick(i)} />
  );

  const rows = Array(size)
    .fill(0)
    .map((_, row) => {
      const columns = Array(size)
        .fill(0)
        .map((_, col) => renderSquare(row * size + col));
      return (
        <div className="board-row" key={`row-${row}`}>
          {columns}
        </div>
      );
    });

  return <div>{rows}</div>;
}

export default Board;
