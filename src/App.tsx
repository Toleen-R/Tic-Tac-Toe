import React, { useState } from 'react';
import './App.css';


//-----------------------Define types for player and board---------------------
type Player = 'X' | 'O' | null;
type Board = Player[];

//------------------------Initialize the board with null values-----------------------
const initialBoard: Board = Array(9).fill(null);

const App: React.FC = () => {
  const [board, setBoard] = useState<Board>(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null);

//-------------------------Function to handle square click-------------------
  const handleClick = (index: number) => {
    if (!board[index] && !winner) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      checkWinner(newBoard);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

//--------------------------Function to check for a winner----------------------------
  const checkWinner = (board: Board) => {
    const lines: number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinner(board[a]);
        return;
      }
    }

    if (!board.includes(null)) {
      setWinner('Draw');
    }
  };

//----------------------------Function to handle restart button click--------------------
  const handleRestart = () => {
    setBoard(initialBoard);
    setCurrentPlayer('X');
    setWinner(null);
  };

//-------------------------------Function to render a square button--------------------------
  const renderSquare = (index: number) => (
    <button className="square" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

//-----------------------------------Render the app component------------------------
  return (
    <div className="App">
      <h1 className="title">Tic-Tac-Toe</h1>
      <div className="board">
        {board.map((_, index) => (
          <div key={index} className="square-container">
            {renderSquare(index)}
          </div>
        ))}
      </div>
      <div className="status">
        {winner ? (
          <p>{winner === 'Draw' ? "It's a draw!" : `Player ${winner} wins!`}</p>
        ) : (
          <p>{`Current player: ${currentPlayer}`}</p>
        )}
        <button onClick={handleRestart}>Restart</button>
      </div>
    </div>
  );
};

export default App;
