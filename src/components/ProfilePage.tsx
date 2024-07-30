import React from 'react';
import { Link } from 'react-router-dom';
import myPhoto from '../assets/myPhoto.jpg';
import '../styles/ProfilePage.scss';
import logo from '../assets/logo.png'; // Import the logo

const ProfilePage: React.FC = () => {
  return (
    <div className="profile-page">
      <div className="profile-content">
        <div className="header">
          <div className="logo">A</div>
          <h1>Abukar Abdulle</h1>
        </div>
        <p className="tagline">
          Hey, I'm Abukar. I'm a Full Stack Developer passionate about building
          innovative web applications.
        </p>
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo-image" />
        </div>
        <nav>
          <Link to="/">home</Link>
          <Link to="/about">about</Link>
          <Link to="/blog">blog</Link>
          <Link to="/guestbook">guestbook</Link>
        </nav>
        <div className="profile-image">
          <img src={myPhoto} alt="Abukar Abdulle" />
        </div>
        <div className="stats">
          <div>🐦 X tweets all time</div>
          <div>⭐ Y stars on this repo</div>
          <div>📈 Z blog views all time</div>
        </div>
        <p className="bio">
          I'm a Full Stack Developer with expertise in React, Node.js, and Java. I'm
          passionate about creating efficient and scalable web applications. I'm also
          an open-source enthusiast and continual learner.
        </p>
        <div className="cta-buttons">
          <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
            follow me on twitter
          </a>
          <a href="#subscribe">get email updates</a>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;