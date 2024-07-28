import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TicTacToe from './components/TicTacToe';
import LandingPage from './components/LandingPage';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/tictactoe" element={<TicTacToe />} />
      </Routes>
    </div>
  );
};

export default App;