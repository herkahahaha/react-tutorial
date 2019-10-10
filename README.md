# React Tic-Tac-Toe

info :<br/>
tutorial: https://id.reactjs.org/tutorial/tutorial.html / https://reactjs.org/tutorial/tutorial.html <br/>
by [Dan Abramov](https://overreacted.io)

## Intro

> Seperti yang diulas di website official reactjs, bahwasanya reactjs adalah sekumpulan `komponent` dengan menggunakan methode `render` untuk menghubungkan satu sama lain, `baiknya, baca dokumentasinya terlebih dahulu`.

```
branch: master (intro)
        staging (file sample)
```

## Studi Kasus

> Syntax tutorial ini masih menggunakan `Class Component`, pembelajaran kali ini merapikan/refactoring kode menggunakan `HOOKS` dari reactjs terbaru saat ini.

**!!! Perlu diperhatikan, ini adalah opsional dalam penggunaan reactjs, namun ini sangat dianjurkan untuk mengatasi komponent yang menumpuk saat aplikasimu skala besar**

- coba untuk mengerti `life cycle` dari reactjs yang menggunakan `class component` terlebih dahulu sebelum mencoba `HOOKS` pada parent component

- Board.js (before)

```js
class Board extends Component {
  renderSquare = i => {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  };
  render() {
    return (
      <div>
        {/* board game */}
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
```

> mengganti `class component` dengan `const` karena `class component` cukup susah dimengerti manusia dan bahkan mesin.

- Board.js (after)

```js
import React from "react";
import Square from "./Square";

const Board = props => {
  const renderSquare = i => {
    return <Square value={props.squares[i]} onClick={() => props.onClick(i)} />;
  };
  return (
    <div>
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
  );
};

export default Board;
```

- Game.js

```js
//before
class Game extends Component {
  state = {
    history: [
      {
        squares: Array(9).fill(null)
      }
    ],
    stepNumber: 0,
    xIsNext: true
  };
}
// after
function usePlayHook() {
  // HOOKS
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setIsNext] = useState(true);
}
```

```js
// before
handleClick = i => {
  //ini tidak dipakai
  const history = this.state.history.slice(0, this.state.stepNumber + 1);
  const current = history[history.length - 1];
  //ini berubah
  const squares = current.squares.slice();
  if (calculateWinner(squares) || squares[i]) {
    return;
  }

  squares[i] = this.state.xIsNext ? "X" : "O";
  //ini berubah
  this.setState({
    history: history.concat([
      {
        squares: squares
      }
    ]),
    stepNumber: history.length,
    xIsNext: !this.state.xIsNext
  });
};
// After
const handleClick = i => {
  const squares = { ...board };
  if (calculateWinner(board) || squares[i]) return;
  squares[i] = xIsNext ? "X" : "O";
  setBoard(squares);
  setIsNext(!xIsNext);
};
```

```js
render() {
    const history = this.state.history; //ini tidak digunakan
    const current = history[this.state.stepNumber]; //ini tidak digunakan
    const winner = calculateWinner(current.squares);

    // bagian ini tidak saya gunakan di hooks
    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
}

```

```js
// After
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
```

> ini merupakan contoh sederhana menerapkan `hooks` pada file reactjs yang menggunakan `class component`.
