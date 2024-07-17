import { useState, useEffect } from 'react';

export const useClickPosition = () => {
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0, clicked: false });

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      setClickPosition({ x: event.clientX, y: event.clientY, clicked: true });
    };

    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return clickPosition;
};
