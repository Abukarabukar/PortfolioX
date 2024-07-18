import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';

import './temp.scss';
import xImage from '../assets/x.png'; // Importing the image
import { useFollowPointer } from '../hooks/use-follow-pointer'; // Import the hook

const Apps = () => {
  const { x: pointerX, y: pointerY } = useFollowPointer(); // Use the hook to get pointer position
  const [clickPosition, setClickPosition] = React.useState({ x: 500, y: 100 });

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const containerRect = event.currentTarget.getBoundingClientRect();
    const adjustedX = event.clientX - containerRect.left; // Adjusting for the left offset
    const adjustedY = event.clientY - containerRect.top; // Adjusting for the top offset

    // Log the click event coordinates for debugging
    console.log('Click event client coordinates:', event.clientX, event.clientY);
    console.log('Container bounding rect:', containerRect);
    console.log('Adjusted click coordinates:', adjustedX, adjustedY);

    setClickPosition({ x: adjustedX, y: adjustedY });
  };

  // Log the pointer position for debugging
  console.log('Pointer position:', pointerX, pointerY);

  return (
    <div className="example-container" onClick={handleClick}>
      <motion.div
        className="animated-box"
        animate={{ x: clickPosition.x -50 , y: clickPosition.y -50 }} // Adjust to center the box
        transition={{ duration: 10, ease: 'easeInOut' }}
      >
        <img src={xImage} alt="Animated" />
      </motion.div>
      <div className="pointer-info">
        <p>Pointer X: {pointerX}</p>
        <p>Pointer Y: {pointerY}</p>
      </div>
      <div className="click-info">
        <p>Click X: {clickPosition.x}</p>
        <p>Click Y: {clickPosition.y}</p>
      </div>
    </div>
  );
};

export default Apps;

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<Apps />);
} else {
  console.error('Root container missing in index.html');
}
