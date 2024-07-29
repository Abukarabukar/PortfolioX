import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.scss';
import myPhoto from '../assets/myPhoto.jpg';
import { FlipWords } from './FlipWords';
import backgroundVideo from '../assets/4k.mp4';
import backgroundMusic from '../assets/Dream.mp3';
import seeIcon from '../assets/see.png';
import hearIcon from '../assets/hear.png';
import speakIcon from '../assets/speak.png';
import WaterWave from 'react-water-wave';

const LandingPage: React.FC = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

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
      audioRef.current.volume = 0.5;
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

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const goToGame = () => {
    navigate('/game');
  };

  return (
    <WaterWave
      imageUrl={backgroundVideo}
      style={{ width: '100%', height: '100vh' }}
      dropRadius={10}
      perturbance={0.05}
      resolution={256}
      interactive={true}
    >
      {() => (
        <div className="landing-page">
          <video ref={videoRef} autoPlay loop muted className="background-video">
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
            <div className="icon-container">
              <div className="icon-wrapper">
                <img src={seeIcon} alt="See" className="icon" onClick={toggleVideo} />
                <span className="tooltip">Stop the video</span>
              </div>
              <div className="icon-wrapper">
                <img src={hearIcon} alt="Hear" className="icon" onClick={toggleMusic} />
                <span className="tooltip">Stop the music</span>
              </div>
              <div className="icon-wrapper">
                <img src={speakIcon} alt="Speak" className="icon" onClick={goToGame} />
                <span className="tooltip">Are you board?</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </WaterWave>
  );
};

export default LandingPage;