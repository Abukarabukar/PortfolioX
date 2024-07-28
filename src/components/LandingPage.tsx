import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.scss';

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to Abukar's website</h1>
      <p>Are you bored?</p>
      <Link to="/tictactoe">
        <button className="start-game-btn">Start the Tic Tac Toe Game</button>
      </Link>
    </div>
  );
};

export default LandingPage;