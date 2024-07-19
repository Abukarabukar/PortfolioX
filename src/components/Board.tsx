import React from 'react';
import xImage from '../assets/x.png';
import oImage from '../assets/o.png';

type PieceKey = 'x-1' | 'x-2' | 'x-3' | 'x-4' | 'x-5' | 'o-1' | 'o-2' | 'o-3' | 'o-4';

interface BoardProps {
  board: (string | null)[];
  renderSquare: (index: number) => JSX.Element;
}

const Board: React.FC<BoardProps> = ({ board, renderSquare }) => {
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
