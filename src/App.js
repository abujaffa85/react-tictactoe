import { useState } from "react";

function Square({ value, onSquareClick,style }) {
     return (
      <button style={style} className="square" onClick={onSquareClick}>
        {value}
      </button>
    );

}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [history, setHistory] = useState([]);
  
  let styleWin=[""];

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    setHistory([...history, nextSquares]);
    //console.log(i+1);
  }

  function onListClick(idx) {
   // console.log(history[idx]);
    setSquares(history[idx]);
    
    let countX=history[idx].filter( i => { if (i==="X") return i} )
    let countO=history[idx].filter( i => { if (i==="O") return i} )

    setXIsNext((countX.length > countO.length) ? false : true);
   // console.log(countX.length +" "+countO.length+" "+xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = "Winner: " + winner[0]+" "+winner[1];
    
    styleWin[winner[1][0][0]]="red";
    styleWin[winner[1][0][1]]="red";
    styleWin[winner[1][0][2]]="red";

  } else if (squares.indexOf(null) === -1) {
    status = "Draw";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }



  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square style={{ backgroundColor: styleWin[0] }} value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square style={{ backgroundColor: styleWin[1] }} value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square style={{ backgroundColor: styleWin[2] }} value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square style={{ backgroundColor: styleWin[3] }} value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square style={{ backgroundColor: styleWin[4] }} value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square style={{ backgroundColor: styleWin[5] }} value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square style={{ backgroundColor: styleWin[6] }} value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square style={{ backgroundColor: styleWin[7] }} value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square style={{ backgroundColor: styleWin[8] }} value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <figure>
        <figcaption>Moves history: click to select.</figcaption>
        <ul className="history">
          {history.map(function (d, idx) {
            return (
              <li key={idx}>
                <button onClick={() => onListClick(idx)}>{d}</button>
              </li>
            );
          })}
        </ul>
      </figure>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], [lines[i]]];
    }
  }
  return null;
}
