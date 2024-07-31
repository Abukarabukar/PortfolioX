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
          <div><span className="icon">🏅</span> Alpha Sigma Lambda Honor Society Member</div>
          <div><span className="icon">🎓</span> Dean's Honor Roll</div>
          <div><span className="icon">📈</span> 3.80 GPA at Creighton University</div>
          <div><span className="icon">📚</span> 3.98 GPA at Regis University</div>
          </div>
        </div>
        <p className="bio">
          I'm a Full Stack Developer with expertise in React, Node.js, and Java. I'm
          passionate about creating efficient and scalable web applications. I'm also
          an open-source enthusiast and continual learner.
        </p>
        <div className="cta-buttons">
          <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
            Follow Me on Linkedin
          </a>
          <a href="#subscribe">Check My Latest Projects</a>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;