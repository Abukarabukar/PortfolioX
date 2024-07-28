import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.scss';
import myPhoto from '../assets/myPhoto.jpg';
import { FlipWords } from './FlipWords';

const LandingPage: React.FC = () => {
  const quoteWords = [
    "chase",
    "reach",
    "fly",
    
  ];

  return (
    <div className="landing-page">
      <div className="photo-container">
        <img src={myPhoto} alt="Abukar" className="profile-photo" />
      </div>
      <div className="quote">
      <span className="static-text">I will</span>&nbsp;
        <FlipWords words={quoteWords} duration={2000} className="text-2xl font-bold" />
      </div>
      <p className="question">Are you bored now?</p>
      <Link to="/game" className="start-game-btn">Click here to play!</Link>
    </div>
  );
};

export default LandingPage;