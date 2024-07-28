import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/TicTacToe.scss';
import abukarImage from '../assets/x.png';
import oImage from '../assets/o.png';
import Board from './Board';

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [xWins, setXWins] = useState(0);
  const [oWins, setOWins] = useState(0);
  const [bWins, setbWins] = useState(true);
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });
  const [clickInfo, setClickInfo] = useState({ x: 0, y: 0 });
  const [popupMessage, setPopupMessage] = useState<string | null>(null)

  type PieceKey = 'abukar-1' | 'abukar-2' | 'abukar-3' | 'abukar-4' | 'abukar-5' | 'o-1' | 'o-2' | 'o-3' | 'o-4';

  const initialPositions = {
    'abukar-1': { x: 1000, y: 90 },
    'abukar-2': { x: 1000, y: 200 },
    'abukar-3': { x: 1000, y: 310 },
    'abukar-4': { x: 1000, y: 420 },
    'abukar-5': { x: 1000, y: 530 },
    'o-1': { x: 250, y: 90 },
    'o-2': { x: 250, y: 200 },
    'o-3': { x: 250, y: 310 },
    'o-4': { x: 250, y: 420 },
  };

  const [clickPosition, setClickPosition] = useState<Record<PieceKey, { x: number; y: number }>>(initialPositions);
  const [nextAbukarIndex, setNextAbukarIndex] = useState(1);

  const boxDimensions = [
    { startX: 460, startY: 124, endX: 560, endY: 224 },
    { startX: 460, startY: 224, endX: 560, endY: 324 },
    { startX: 460, startY: 324, endX: 560, endY: 424 },
    { startX: 560, startY: 124, endX: 660, endY: 224 },
    { startX: 560, startY: 224, endX: 660, endY: 324 },
    { startX: 560, startY: 324, endX: 660, endY: 424 },
    { startX: 660, startY: 124, endX: 760, endY: 224 },
    { startX: 660, startY: 224, endX: 760, endY: 324 },
    { startX: 660, startY: 324, endX: 760, endY: 424 },
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

  const centerInBox = (index: number) => {
    const { startX, startY, endX, endY } = boxDimensions[index];
    const centerX = (startX + endX) / 2;
    const centerY = (startY + endY) / 2;
    return { x: centerX - 25, y: centerY - 25 }; // Adjust based on your element size
  };

  const handleSquareClick = (index: number) => {
    const newBoard = board.slice();
    if (newBoard[index]) return; // Prevent move if the square is occupied
    newBoard[index] = 'transparent-x';
    setBoard(newBoard);
    setIsXNext(false);
  };

  const handleAbukarPiecePlacement = (x: number, y: number) => {
    const boxIndex = checkBox(x, y);
    const winningMove = findWinningMove('transparent-x');
    if (boxIndex !== -1 && board[boxIndex] === null) {
      if (winningMove !== -1 && winningMove === boxIndex) {
        // Place "abukar" in a non-winning square
        placeAbukarInNonWinningSquare(winningMove);
        showPopupMessage("Abukar never loses!");
      } else {
        // Place "abukar" in the intended square
        placeAbukarInSquare(boxIndex);
      }
    } else if (winningMove !== -1) {
      // If the intended box is occupied or invalid, and there's a winning move, place in a non-winning square
      placeAbukarInNonWinningSquare(winningMove);
      showPopupMessage("Abukar never loses!");
    }
  };

  const showPopupMessage = (message: string) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(null), 3000); // Hide message after 3 seconds
  };

  const handleBoardClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const containerRect = event.currentTarget.getBoundingClientRect();
    const adjustedX = event.clientX - containerRect.left + 25;
    const adjustedY = event.clientY - containerRect.top + 25;

    if (nextAbukarIndex <= 5 && isXNext) {
      handleAbukarPiecePlacement(adjustedX, adjustedY);
    }

    setClickInfo({ x: adjustedX, y: adjustedY });
    console.log(`Piece abukar-${nextAbukarIndex} moved to (${adjustedX}, ${adjustedY})`);
  };

  const findWinningMove = (player: string) => {
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
      if (
        (board[a] === player && board[b] === player && board[c] === null) ||
        (board[a] === player && board[b] === null && board[c] === player) ||
        (board[a] === null && board[b] === player && board[c] === player)
      ) {
        return board[a] === null ? a : (board[b] === null ? b : c);
      }
    }
    return -1;
  };

  const placeAbukarInNonWinningSquare = (avoidIndex: number) => {
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null && i !== avoidIndex) {
        placeAbukarInSquare(i);
        break;
      }
    }
  };

  const placeAbukarInSquare = (index: number) => {
    if (board[index] !== null) return; // Prevent move if the square is occupied
    const { x, y } = centerInBox(index);
    const pieceKey: PieceKey = `abukar-${nextAbukarIndex}` as PieceKey;
    setClickPosition({
      ...clickPosition,
      [pieceKey]: { x, y }
    });

    const newBoard = board.slice();
    newBoard[index] = 'transparent-x'; // Mark the box as occupied by abukar
    setBoard(newBoard);
    setNextAbukarIndex(nextAbukarIndex + 1);
  };

  const findBestMove = (board: (string | null)[]) => {
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

    // Check for a winning move
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] === 'o' && board[b] === 'o' && board[c] === null) return c;
      if (board[a] === 'o' && board[b] === null && board[c] === 'o') return b;
      if (board[a] === null && board[b] === 'o' && board[c] === 'o') return a;
    }

    // Check for a blocking move
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] === 'transparent-x' && board[b] === 'transparent-x' && board[c] === null) return c;
      if (board[a] === 'transparent-x' && board[b] === null && board[c] === 'transparent-x') return b;
      if (board[a] === null && board[b] === 'transparent-x' && board[c] === 'transparent-x') return a;
    }

    // Take the first available spot
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        return i;
      }
    }

    return -1;
  };

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

  const isBoardFull = (board: (string | null)[]) => {
    return board.every((square) => square !== null);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setNextAbukarIndex(1);
    setClickPosition(initialPositions);
  };

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner || isBoardFull(board)) {
      if (winner) {
        if (winner === 'transparent-x') {
          setXWins(xWins + 1);
        } else {
          setOWins(oWins + 1);
        }
      }
      setTimeout(() => {
        resetGame();
      }, 2000);
    } else if (!isXNext) {
      const newBoard = [...board];
      setTimeout(() => {
        const bestMove = findBestMove(newBoard);
        if (bestMove !== -1 && newBoard[bestMove] === null) {
          setTimeout(() => {
            if (newBoard[bestMove] === null) {
              newBoard[bestMove] = 'o';
              setBoard(newBoard);
              setIsXNext(true);
            }
          }, 1000); // Additional delay before placing "o"
        }
      }, 2000); // Delay before computer starts its move
    }
  }, [board, isXNext]);

  const renderSquare = (index: number) => (
    <div className="square" onClick={() => handleSquareClick(index)}>
      {board[index] && (
        <img
          src={board[index] === 'o' ? oImage : abukarImage}
          alt={board[index]}
          style={board[index] === 'transparent-x' ? { opacity: 0 } : {}}
        />
      )}
    </div>
  );

  return (
    
      
        <div className="game" onClick={handleBoardClick} onMouseMove={(e) => setPointerPosition({ x: e.clientX, y: e.clientY })}>
          <Board board={board} renderSquare={renderSquare} />
          <div className="side-pieces right">
            <motion.div
              className="animated-box"
              animate={{ x: clickPosition['abukar-1'].x, y: clickPosition['abukar-1'].y }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            >
              <img src={abukarImage} alt="abukar-1" />
            </motion.div>
            <motion.div
              className="animated-box"
              animate={{ x: clickPosition['abukar-2'].x, y: clickPosition['abukar-2'].y }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            >
              <img src={abukarImage} alt="abukar-2" />
            </motion.div>
            <motion.div
              className="animated-box"
              animate={{ x: clickPosition['abukar-3'].x, y: clickPosition['abukar-3'].y }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            >
              <img src={abukarImage} alt="abukar-3" />
            </motion.div>
            <motion.div
              className="animated-box"
              animate={{ x: clickPosition['abukar-4'].x, y: clickPosition['abukar-4'].y }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            >
              <img src={abukarImage} alt="abukar-4" />
            </motion.div>
            <motion.div
              className="animated-box"
              animate={{ x: clickPosition['abukar-5'].x, y: clickPosition['abukar-5'].y }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            >
              <img src={abukarImage} alt="abukar-5" />
            </motion.div>
          </div>
          <div className="game-info">
            <div>Next player: {isXNext ? 'X' : 'O'}</div>
            <div>X Wins: {xWins}</div>
            <div>O Wins: {oWins}</div>
          </div>
          <div className="pointer-info">
            Pointer Position: ({pointerPosition.x}, {pointerPosition.y})
          </div>
          <div className="click-info">
            Last Click Position: ({clickInfo.x}, {clickInfo.y})

         
          </div>
          {popupMessage && (
            <div className="popup-message">
              {popupMessage}
              </div>
          )}
        </div>
   
  );
};

export default TicTacToe;
