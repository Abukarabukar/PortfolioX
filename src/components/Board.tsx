import React from 'react';
import Square from './Square';

interface BoardProps {
  board: (string | null)[];
  onClick: (index: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, onClick }) => {
  const renderSquare = (index: number) => (
    <Square
      value={board[index]}
      onClick={() => onClick(index)}
    />
  );

  return (
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
  );
};

export default Board;
