// src/App.tsx
import React from 'react';
import TicTacToe from './page/TicTacToe';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Tic-Tac-Toe Landing Page</h1>
      </header>
      <TicTacToe />
    </div>
  );
}

export default App;
