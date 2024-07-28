import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.scss';
import myPhoto from '../assets/myPhoto.jpg';
import { FlipWords } from './FlipWords';
import backgroundVideo from '../assets/4k.mp4';

const LandingPage: React.FC = () => {
  const quoteWords = [
    "chase",
    "reach",
    "fly",
  ];

  return (
    <div className="landing-page">
      <video autoPlay loop muted className="background-video">
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
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
    </div>
  );
};

export default LandingPage;