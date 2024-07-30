import React from 'react';
import { Route, Routes } from 'react-router-dom';
import TicTacToe from './components/TicTacToe';
import LandingPage from './components/LandingPage';
import ProfilePage from './components/ProfilePage';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/game" element={<TicTacToe />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
};

export default App;