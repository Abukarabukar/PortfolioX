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

  const initialPositions = {
    'x-1': { x: 100, y: 90 },
    'x-2': { x: 100, y: 130 },
    'x-3': { x: 100, y: 180 },
    'x-4': { x: 100, y: 240 },
    'x-5': { x: 100, y: 280 },
    'o-1': { x: 100, y: 90 },
    'o-2': { x: 100, y: 130 },
    'o-3': { x: 100, y: 180 },
    'o-4': { x: 100, y: 240 },
  };

  const [piecePositions, setPiecePositions] = useState<Record<PieceKey, { x: number, y: number }>>(initialPositions);
  const [clickPosition, setClickPosition] = useState<Record<PieceKey, { x: number; y: number }>>(initialPositions);

  const [nextXIndex, setNextXIndex] = useState(1); // Track the next 'x' piece to move

  const handleSquareClick = (index: number) => {
    const newBoard = board.slice();
    if (newBoard[index]) return;
    newBoard[index] = isXNext ? `x-${index}` : `o-${index}`;
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const handleBoardClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const containerRect = event.currentTarget.getBoundingClientRect();
    const adjustedX = event.clientX - containerRect.left + 25; // Adjusting for the left offset
    const adjustedY = event.clientY - containerRect.top + 25; // Adjusting for the top offset

    if (nextXIndex <= 5) {
      const pieceKey: PieceKey = `x-${nextXIndex}` as PieceKey;
      setClickPosition({
        ...clickPosition,
        [pieceKey]: { x: adjustedX, y: adjustedY }
      });
      setNextXIndex(nextXIndex + 1);
    }
    console.log(`Piece x-${nextXIndex} moved to (${adjustedX}, ${adjustedY})`);
  };

  const handlePieceClick = (piece: PieceKey, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // This function can be used to handle piece clicks if needed
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
    <div className="game" onClick={handleBoardClick}>
      <div className="side-pieces left">
        <motion.div
          className="animated-box"
          animate={{ x: clickPosition['o-1'].x - 50, y: clickPosition['o-1'].y - 50 }} // Set the fixed position
          transition={{ duration: 1, ease: 'easeInOut' }}
          onClick={(e) => handlePieceClick('o-1', e)}
        >
          <img src={oImage} alt="o-1" />
        </motion.div>

        <motion.div
          className="animated-box"
          animate={{ x: clickPosition['o-2'].x - 50, y: clickPosition['o-2'].y - 50 }} // Adjust to center the box
          transition={{ duration: 1, ease: 'easeInOut' }}
          onClick={(e) => handlePieceClick('o-2', e)}
        >
          <img src={oImage} alt="o-2" />
        </motion.div>
        <motion.div
          className="animated-box"
          animate={{ x: clickPosition['o-3'].x - 50, y: clickPosition['o-3'].y - 50 }} // Adjust to center the box
          transition={{ duration: 1, ease: 'easeInOut' }}
          onClick={(e) => handlePieceClick('o-3', e)}
        >
          <img src={oImage} alt="o-3" />
        </motion.div>
        <motion.div
          className="animated-box"
          animate={{ x: clickPosition['o-4'].x - 50, y: clickPosition['o-4'].y - 50 }} // Adjust to center the box
          transition={{ duration: 1, ease: 'easeInOut' }}
          onClick={(e) => handlePieceClick('o-4', e)}
        >
          <img src={oImage} alt="o-4" />
        </motion.div>
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
        <motion.div
          className="animated-box"
          animate={{ x: clickPosition['x-1'].x - 50, y: clickPosition['x-1'].y - 50 }} // Adjust to center the box
          transition={{ duration: 1, ease: 'easeInOut' }}
          onClick={(e) => handlePieceClick('x-1', e)}
        >
          <img src={xImage} alt="x-1" />
        </motion.div>
        <motion.div
          className="animated-box"
          animate={{ x: clickPosition['x-2'].x - 50, y: clickPosition['x-2'].y - 50 }} // Adjust to center the box
          transition={{ duration: 1, ease: 'easeInOut' }}
          onClick={(e) => handlePieceClick('x-2', e)}
        >
          <img src={xImage} alt="x-2" />
        </motion.div>
        <motion.div
          className="animated-box"
          animate={{ x: clickPosition['x-3'].x - 50, y: clickPosition['x-3'].y - 50 }} // Adjust to center the box
          transition={{ duration: 1, ease: 'easeInOut' }}
          onClick={(e) => handlePieceClick('x-3', e)}
        >
          <img src={xImage} alt="x-3" />
        </motion.div>
        <motion.div
          className="animated-box"
          animate={{ x: clickPosition['x-4'].x - 50, y: clickPosition['x-4'].y - 50 }} // Adjust to center the box
          transition={{ duration: 1, ease: 'easeInOut' }}
          onClick={(e) => handlePieceClick('x-4', e)}
        >
          <img src={xImage} alt="x-4" />
        </motion.div>
        <motion.div
          className="animated-box"
          animate={{ x: clickPosition['x-5'].x - 50, y: clickPosition['x-5'].y - 50 }} // Adjust to center the box
          transition={{ duration: 1, ease: 'easeInOut' }}
          onClick={(e) => handlePieceClick('x-5', e)}
        >
          <img src={xImage} alt="x-5" />
        </motion.div>
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
