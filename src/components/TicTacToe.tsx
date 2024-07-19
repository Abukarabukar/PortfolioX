import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/TicTacToe.scss';
import xImage from '../assets/x.png';
import oImage from '../assets/o.png';
import { useFollowPointer } from '../hooks/use-follow-pointer'; // Import the hook

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const { x: pointerX, y: pointerY } = useFollowPointer(); // Use the hook to get pointer position

  const handleSquareClick = (index: number) => {
    const newBoard = board.slice();
    if (newBoard[index]) return;
    newBoard[index] = isXNext ? `x-${index}` : `o-${index}`;
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handlePieceClick = (piece: string) => {
    console.log(`${piece} clicked`);
  };

  const renderSquare = (index: number) => (
    <div className="square" onClick={() => handleSquareClick(index)}>
      {board[index] && (
        <img
          src={board[index].startsWith('x') ? xImage : oImage}
          alt={board[index]}
        />
      )}
    </div>
  );

  return (
    <div className="game">
      <div className="side-pieces left">
        <div className="pieces">
          <img
            key="o-1"
            src={oImage}
            alt="o-1"
            onClick={() => handlePieceClick('o-1')}
            style={{
              position: 'absolute',
              left: '100px',
              top: '100px',
            }}
          />
          <img
            key="o-2"
            src={oImage}
            alt="o-2"
            onClick={() => handlePieceClick('o-2')}
            style={{
              position: 'absolute',
              left: '100px',
              top: '200px',
            }}
          />
          <img
            key="o-3"
            src={oImage}
            alt="o-3"
            onClick={() => handlePieceClick('o-3')}
            style={{
              position: 'absolute',
              left: '100px',
              top: '300px',
            }}
          />
          <img
            key="o-4"
            src={oImage}
            alt="o-4"
            onClick={() => handlePieceClick('o-4')}
            style={{
              position: 'absolute',
              left: '100px',
              top: '400px',
            }}
          />
        </div>
      </div>
      <div className="game-board">
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
      <div className="side-pieces right">
        <div className="pieces">
          <img
            key="x-1"
            src={xImage}
            alt="x-1"
            onClick={() => handlePieceClick('x-1')}
            style={{
              position: 'absolute',
              left: '1000px',
              top: '100px',
            }}
          />
          <img
            key="x-2"
            src={xImage}
            alt="x-2"
            onClick={() => handlePieceClick('x-2')}
            style={{
              position: 'absolute',
              left: '1000px',
              top: '200px',
            }}
          />
          <img
            key="x-3"
            src={xImage}
            alt="x-3"
            onClick={() => handlePieceClick('x-3')}
            style={{
              position: 'absolute',
              left: '1000px',
              top: '300px',
            }}
          />
          <img
            key="x-4"
            src={xImage}
            alt="x-4"
            onClick={() => handlePieceClick('x-4')}
            style={{
              position: 'absolute',
              left: '1000px',
              top: '400px',
            }}
          />
          <img
            key="x-5"
            src={xImage}
            alt="x-5"
            onClick={() => handlePieceClick('x-5')}
            style={{
              position: 'absolute',
              left: '1000px',
              top: '500px',
            }}
          />
        </div>
      </div>
      <div className="game-info">
        <div>Next player: {isXNext ? 'X' : 'O'}</div>
      </div>
      <div className="pointer-info">
        <p>Pointer X: {pointerX}</p>
        <p>Pointer Y: {pointerY}</p>
      </div>
    </div>
  );
};

export default TicTacToe;
