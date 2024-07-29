declare module 'react-water-wave' {
    import React from 'react';
  
    interface WaterWaveProps {
      imageUrl?: string;
      videoUrl?: string; // Add this line
      dropRadius?: number;
      perturbance?: number;
      resolution?: number;
      interactive?: boolean;
      crossOrigin?: string;
      children?: (methods: {
        pause: () => void;
        play: () => void;
      }) => React.ReactNode;
      style?: React.CSSProperties;
    }
  
    const WaterWave: React.FC<WaterWaveProps>;
  
    export default WaterWave;
  }