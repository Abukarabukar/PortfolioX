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
          <Link to="/about">Posts</Link>
          <Link to="/blog">Projects</Link>
          <Link to="/guestbook">Feedback</Link>
          <Link to="/Feedback">Certifications</Link>
        </nav>
      </div>
      <div className="main-content">
        <header>
          <h1 className="myName">Abukar Abdullahi Abukar</h1>
          <p className="tagline">
            Hey, I'm Abukar. I'm a Full Stack Developer passionate about building innovative web and mobile applications.
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
  With expertise in React, Node.js, and Java, I'm passionate about creating efficient and scalable web and mobile applications. Additionally, I have a strong interest in cybersecurity and am committed to learning and applying best practices to build secure and resilient applications.
</p>

        <div className="cta-buttons">
          <a href="https://www.linkedin.com/in/abukarshegow/" target="_blank" rel="noopener noreferrer">
            Follow Me on Linkedin
          </a>
          <a href="https://github.com/Abukarabukar" target="_blank" rel="noopener noreferrer">Check My Latest Projects</a>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;