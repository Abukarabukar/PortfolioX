import React, { useState, useRef } from 'react';
import '../styles/TicTacToe.scss'; // Corrected path
import xImage from '../assets/x.png';
import oImage from '../assets/o.png';
import { motion } from 'framer-motion';
import { useFollowPointer } from '../hooks/use-follow-pointer'; // Corrected path

const TicTacToe: React.FC = () => {
  const [squares, setSquares] = useState<Array<string | null>>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const pieceRefs = useRef<(HTMLImageElement | null)[]>([]); // Separate refs for pieces

  // Apply the follow pointer effect
  const { x, y } = useFollowPointer();

  const handleClick = (index: number) => {
    if (squares[index] || calculateWinner(squares)) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const renderSquare = (index: number) => {
    return (
      <motion.button
        className="square"
        onClick={() => handleClick(index)}
        initial={{ scale: 0.8, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {squares[index] && (
          <motion.img
            className={`piece ${squares[index]}-onboard`}
            src={squares[index] === 'X' ? xImage : oImage}
            alt={squares[index] || ''}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            ref={el => (pieceRefs.current[index] = el)} // Assign ref to piece
          />
        )}
      </motion.button>
    );
  };

  const renderSidePiece = (index: number, type: 'X' | 'O') => {
    const pieceImage = type === 'X' ? xImage : oImage;
    return (
      <motion.img
        key={index}
        className={`piece ${type}-${index + 1} off-board`}
        src={pieceImage}
        alt={type}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        ref={el => (pieceRefs.current[index] = el)} // Assign ref to piece
      />
    );
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (isXNext ? 'X' : 'O');
  }

  return (
    <div className="game">
      <div className="side-pieces left">
        <div className="pieces">
          {Array(4).fill(null).map((_, i) => renderSidePiece(i + 9, 'O'))}
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
          {Array(5).fill(null).map((_, i) => renderSidePiece(i + 13, 'X'))}
        </div>
      </div>
      <div className="game-info">
        <div>{status}</div>
      </div>
      <div className="pointer-info">
        <p>X: {x}</p>
        <p>Y: {y}</p>
      </div>
    </div>
  );
};

const calculateWinner = (squares: Array<string | null>) => {
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
      return squares[a];
    }
  }
  return null;
};

export default TicTacToe;
