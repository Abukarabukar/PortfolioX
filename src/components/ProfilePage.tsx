import React from 'react';
import { Link } from 'react-router-dom';
import myPhoto from '../assets/myPhoto.jpg';
import '../styles/ProfilePage.scss';
import logo from '../assets/logo.png';

const ProfilePage: React.FC = () => {
  return (
    <div className="profile-page">
      <div className="sidebar">
        <div className="logo">A</div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/guestbook">Guestbook</Link>
        </nav>
      </div>
      <div className="main-content">
        <header>
          <h1>Abukar Abdulle</h1>
          <p className="tagline">
            Hey, I'm Abukar. I'm a Full Stack Developer passionate about building
            innovative web applications.
          </p>
        </header>
        <div className="profile-stats">
          <div className="profile-image">
            <img src={myPhoto} alt="Abukar Abdulle" />
          </div>
          <div className="stats">
            <div><span className="icon">🐦</span> 6,549 tweets all time</div>
            <div><span className="icon">⭐</span> 4,767 stars on this repo</div>
            <div><span className="icon">📈</span> 1,547,989 blog views all time</div>
          </div>
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