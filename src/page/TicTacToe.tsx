// src/page/TicTacToe.tsx
import React, { useState, useEffect } from 'react';
import './TicTacToe.scss';

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  useEffect(() => {
    if (!isXNext) {
      const timer = setTimeout(() => {
        makeComputerMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isXNext]);

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner || board.every(cell => cell !== null)) {
      const timer = setTimeout(() => {
        resetGame();
      }, 2000); // Delay to show the result before resetting
      return () => clearTimeout(timer);
    }
  }, [board]);

  const handleClick = (index: number) => {
    if (board[index] || calculateWinner(board) || !isXNext) return;

    const newBoard = board.slice();
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsXNext(false);
  };

  const makeComputerMove = () => {
    const emptyIndices = board.map((value, index) => (value === null ? index : null)).filter(val => val !== null);
    if (emptyIndices.length === 0 || calculateWinner(board)) return;

    const index = getBestMove(board, 'O');
    const newBoard = board.slice();
    newBoard[index] = 'O';
    setBoard(newBoard);
    setIsXNext(true);
  };

  const getBestMove = (board: Array<string | null>, player: string): number => {
    const emptyIndices = board.map((value, index) => (value === null ? index : null)).filter(val => val !== null) as number[];
    let bestMove = -1;
    let bestScore = player === 'O' ? -Infinity : Infinity;

    for (let index of emptyIndices) {
      board[index] = player;
      const score = minimax(board, 0, player === 'O' ? false : true);
      board[index] = null;

      if (player === 'O') {
        if (score > bestScore) {
          bestScore = score;
          bestMove = index;
        }
      } else {
        if (score < bestScore) {
          bestScore = score;
          bestMove = index;
        }
      }
    }

    return bestMove;
  };

  const minimax = (board: Array<string | null>, depth: number, isMaximizing: boolean): number => {
    const winner = calculateWinner(board);
    if (winner === 'O') return 10 - depth;
    if (winner === 'X') return depth - 10;
    if (board.every(cell => cell !== null)) return 0;

    if (isMaximizing) {
      let maxEval = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = 'O';
          const evaluation = minimax(board, depth + 1, false);
          board[i] = null;
          maxEval = Math.max(maxEval, evaluation);
        }
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = 'X';
          const evaluation = minimax(board, depth + 1, true);
          board[i] = null;
          minEval = Math.min(minEval, evaluation);
        }
      }
      return minEval;
    }
  };

  const renderSquare = (index: number) => (
    <button className="square" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const winner = calculateWinner(board);
  const status = winner ? `Winner: ${winner}` : board.every(cell => cell !== null) ? "It's a draw!" : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="game">
      <div className="status">{status}</div>
      <div className="board">
        {board.map((_, index) => renderSquare(index))}
      </div>
    </div>
  );
};

const calculateWinner = (board: Array<string | null>) => {
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

  for (const line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
};

export default TicTacToe;
