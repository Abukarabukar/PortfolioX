// // useClickPosition.ts
// import { useState, useEffect } from 'react';

// export const useClickPosition = () => {
//   const [clickPosition, setClickPosition] = useState({ x: 0, y: 0, clicked: false });

//   useEffect(() => {
//     const handleClick = (event: MouseEvent) => {
//       setClickPosition({ x: event.clientX, y: event.clientY, clicked: true });
//     };

//     window.addEventListener('click', handleClick);

//     return () => {
//       window.removeEventListener('click', handleClick);
//     };
//   }, []);

//   return clickPosition;
// };



import { useState, useEffect } from 'react';

// Your hook code here...

const useClickPosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener('mousemove', updatePosition);
    return () => {
      window.removeEventListener('mousemove', updatePosition);
    };
  }, []);

  return position;
};

export default useClickPosition;

// Ensure this is at the end of the file
export {};
