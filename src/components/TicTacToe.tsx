import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/TicTacToe.scss';
import xImage from '../assets/x.png';
import oImage from '../assets/o.png';
import { useFollowPointer } from '../hooks/use-follow-pointer'; // Import the hook
import Board from './Board';

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const { x: pointerX, y: pointerY } = useFollowPointer(); // Use the hook to get pointer position

  // Define the type for piece keys
  type PieceKey = 'x-1' | 'x-2' | 'x-3' | 'x-4' | 'x-5' | 'o-1' | 'o-2' | 'o-3' | 'o-4';

  const initialPositions = {
    'x-1': { x: 1000, y: 90 },
    'x-2': { x: 1000, y: 200 },
    'x-3': { x: 1000, y: 310 },
    'x-4': { x: 1000, y: 420 },
    'x-5': { x: 1000, y: 530 },
    'o-1': { x: 250, y: 90 },
    'o-2': { x: 250, y: 200 },
    'o-3': { x: 250, y: 310 },
    'o-4': { x: 250, y: 420 },
  };

  const [piecePositions, setPiecePositions] = useState<Record<PieceKey, { x: number, y: number }>>(initialPositions);
  const [clickPosition, setClickPosition] = useState<Record<PieceKey, { x: number; y: number }>>(initialPositions);

  const [nextXIndex, setNextXIndex] = useState(1); // Track the next 'x' piece to move

  const boxDimensions = [
    { startX: 460, startY: 124, endX: 560, endY: 224 }, // Box 1
    { startX: 460, startY: 224, endX: 560, endY: 324 }, // Box 2
    { startX: 460, startY: 324, endX: 560, endY: 424 }, // Box 3
    { startX: 560, startY: 124, endX: 660, endY: 224 }, // Box 4
    { startX: 560, startY: 224, endX: 660, endY: 324 }, // Box 5
    { startX: 560, startY: 324, endX: 660, endY: 424 }, // Box 6
    { startX: 660, startY: 124, endX: 760, endY: 224 }, // Box 7
    { startX: 660, startY: 224, endX: 760, endY: 324 }, // Box 8
    { startX: 660, startY: 324, endX: 760, endY: 424 }, // Box 9
  ];

  const checkBox = (x: number, y: number) => {
    for (let i = 0; i < boxDimensions.length; i++) {
      const { startX, startY, endX, endY } = boxDimensions[i];
      if (x >= startX && x <= endX && y >= startY && y <= endY) {
        return i;
      }
    }
    return -1;
  };

  const handleSquareClick = (index: number) => {
    const newBoard = board.slice();
    if (newBoard[index]) return;
    newBoard[index] = isXNext ? 'transparent-x' : 'o';
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

      const boxIndex = checkBox(adjustedX, adjustedY);
      if (boxIndex !== -1) {
        handleSquareClick(boxIndex);
      }

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
          src={board[index] === 'o' ? oImage : xImage}
          alt={board[index]}
          style={board[index] === 'transparent-x' ? { opacity: 0 } : {}}
        />
      )}
    </div>
  );
  

  const calculateWinner = (squares: (string | null)[]) => {
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

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setNextXIndex(1);
    setClickPosition(initialPositions);
  };

  useEffect(() => {
  const winner = calculateWinner(board);
  if (winner) {
    if (winner === 'transparent-x') {
      setXWins(xWins + 1);
    } else {
      setOWins(oWins + 1);
    }
    setTimeout(() => {
      resetGame(); // Reset the game without reloading the page
    }, 2000);
  }
}, [board]);

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
      <Board
        board={board}
        renderSquare={renderSquare}
      />
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
        <div>X Wins: {xWins}</div>
        <div>O Wins: {oWins}</div>
      </div>
      <div className="pointer-info">
        <p>Pointer X: {pointerX}</p>
        <p>Pointer Y: {pointerY}</p>
      </div>
    </div>
  );
};

export default TicTacToe;
