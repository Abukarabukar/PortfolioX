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

  // Define the type for piece keys
  type PieceKey = 'x-1' | 'x-2' | 'x-3' | 'x-4' | 'x-5' | 'o-1' | 'o-2' | 'o-3' | 'o-4';

  const [piecePositions, setPiecePositions] = useState<Record<PieceKey, { x: number, y: number }>>({
    'x-1': { x: 100, y: 90 },
    'x-2': { x: 100, y: 130 },
    'x-3': { x: 100, y: 180 },
    'x-4': { x: 100, y: 240 },
    'x-5': { x: 100, y: 280 },
    'o-1': { x: 100, y: 90 },
    'o-2': { x: 100, y: 130 },
    'o-3': { x: 100, y: 180 },
    'o-4': { x: 100, y: 240 },
  });

  const handleSquareClick = (index: number) => {
    const newBoard = board.slice();
    if (newBoard[index]) return;
    newBoard[index] = isXNext ? `x-${index}` : `o-${index}`;
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handlePieceClick = (piece: PieceKey, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const containerRect = event.currentTarget.getBoundingClientRect();
    const adjustedX = event.clientX - containerRect.left; // Adjusting for the left offset
    const adjustedY = event.clientY - containerRect.top; // Adjusting for the top offset
    setPiecePositions({
      ...piecePositions,
      [piece]: { x: adjustedX, y: adjustedY }
    });
    console.log(`${piece} clicked at (${adjustedX}, ${adjustedY})`);
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
          {(['o-1', 'o-2', 'o-3', 'o-4'] as PieceKey[]).map((piece) => (
            <motion.div
              key={piece}
              className="animated-box"
              animate={{ x: piecePositions[piece].x - 50, y: piecePositions[piece].y - 50 }} // Adjust to center the box
              transition={{ duration: 1, ease: 'easeInOut' }}
              onClick={(e) => handlePieceClick(piece, e)}
            >
              <img src={oImage} alt={piece} />
            </motion.div>
          ))}
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
          {(['x-1', 'x-2', 'x-3', 'x-4', 'x-5'] as PieceKey[]).map((piece) => (
            <motion.div
              key={piece}
              className="animated-box"
              animate={{ x: piecePositions[piece].x - 50, y: piecePositions[piece].y - 50 }} // Adjust to center the box
              transition={{ duration: 1, ease: 'easeInOut' }}
              onClick={(e) => handlePieceClick(piece, e)}
            >
              <img src={xImage} alt={piece} />
            </motion.div>
          ))}
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
