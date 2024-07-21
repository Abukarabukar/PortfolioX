import React from 'react';
import xImage from '../assets/x.png';
import oImage from '../assets/o.png';

interface SquareProps {
  value: string | null;
  onClick: () => void;
}

const Square: React.FC<SquareProps> = ({ value, onClick }) => {
  return (
    <div className="square" onClick={onClick}>
      {value && (
        <img
          src={value === 'o' ? oImage : xImage}
          alt={value}
          style={value === 'transparent-x' ? { opacity: 0 } : {}}
        />
      )}
    </div>
  );
};

export default Square;
