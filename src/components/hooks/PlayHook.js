import React, { useState, memo } from "react";

function usePlayHook() {
  // HOOKS
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setIsNext] = useState(true);

  //   handleClik
  const handleClick = i => {
    const squares = { ...board };
    if (calculateWinner(board) || squares[i]) return;
    squares[i] = xIsNext ? "X" : "O";
    setBoard(squares);
    setIsNext(!xIsNext);
  };

  //   Square
  const Square = props => {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  };

  // initialize status and winner
  let status;
  const winner = calculateWinner(board);
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const renderSquare = i => {
    return <Square value={board[i]} onClick={() => handleClick(i)} />;
  };
  return (
    <div>
      <div className="status game-info">{status}</div>
      <div style={{ marginLeft: "5rem" }}>
        {/* board game */}
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </div>
  );
}

//   winner
const calculateWinner = squares => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};
export default memo(usePlayHook);
