import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.scss';
import myPhoto from '../assets/myPhoto.jpg';
import { FlipWords } from './FlipWords';
import backgroundVideo from '../assets/4k.mp4';
import backgroundMusic from '../assets/Dream.mp3';
import playIcon from '../assets/play.png';
import pauseIcon from '../assets/pause.png';
import WaterWave from 'react-water-wave';

const LandingPage: React.FC = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const quoteWords = [
    "chase",
    "reach",
    "fly",
  ];

  useEffect(() => {
    const handleInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.play().catch(error => console.error("Autoplay failed:", error));
        setIsMusicPlaying(true);
        setHasInteracted(true);
      }
    };

    document.addEventListener('click', handleInteraction);
    return () => {
      document.removeEventListener('click', handleInteraction);
    };
  }, [hasInteracted]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5; // Set volume to 50%
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => console.error("Playback failed:", error));
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  return (
    <WaterWave
     imageUrl={backgroundVideo}
      style={{ width: '100%', height: '100vh' }}
      dropRadius={10}     // Changed from 20 to 50: Increases the size of each water drop, creating larger waves
      perturbance={0.05}  // Changed from 0.01 to 0.05: Increases the intensity of the waves, making them more visible
      resolution={256}    // Added: Increases the detail of the water effect (higher values = more detail but may impact performance)
      interactive={true}
    >
      {() => (
        <div className="landing-page">
          <video autoPlay loop muted className="background-video">
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <audio ref={audioRef} loop muted>
            <source src={backgroundMusic} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <div className="content">
            <div className="photo-container">
              <img src={myPhoto} alt="Abukar" className="profile-photo" />
            </div>
            <div className="quote">
              <span className="static-text">I will</span>&nbsp;
              <FlipWords words={quoteWords} duration={2000} className="text-2xl font-bold" />
            </div>
            <p className="question">Are you bored now?</p>
            <Link to="/game" className="start-game-btn">I am board</Link>
            <button onClick={toggleMusic} className="music-toggle-btn">
              <img 
                src={isMusicPlaying ? pauseIcon : playIcon} 
                alt={isMusicPlaying ? "Pause" : "Play"} 
                className="music-icon"
              />
            </button>
          </div>
        </div>
      )}
    </WaterWave>
  );
};

export default LandingPage;