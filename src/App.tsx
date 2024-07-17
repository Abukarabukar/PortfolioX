// App.tsx
import React from 'react';
import TicTacToe from './components/TicTacToe'; // Corrected path
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <TicTacToe />
    </div>
  );
};

export default App;
