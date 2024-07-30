import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.scss';
import myPhoto from '../assets/myPhoto.jpg';
import { FlipWords } from './FlipWords';
import backgroundGif from '../assets/4k.gif';
import backgroundMusic from '../assets/Dream.mp3';
import seeIcon from '../assets/see.png';
import hearIcon from '../assets/hear.png';
import speakIcon from '../assets/speak.png';
import { Lightning } from './Lightning';
import { Vector } from './Vector';

const LandingPage: React.FC = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [lightningStart, setLightningStart] = useState<Vector | null>(null);
  const [lightningEnd, setLightningEnd] = useState<Vector | null>(null);
  const [showLightning, setShowLightning] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [lastInteraction, setLastInteraction] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const photoRef = useRef<HTMLImageElement>(null);
  const navigate = useNavigate();

  const quoteWords = [
    "chase",
    "reach",
    "fly",
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const lt = new Lightning({
      Segments: 50,
      Threshold: 1,
      Width: 8,
      Color: '#00FFFF',
      Blur: 20,
      BlurColor: '#00FFFF',
      Alpha: 1,
      GlowColor: '#0000FF',
      GlowWidth: 200,
      GlowBlur: 300,
      GlowAlpha: 0.7,
    });

    const renderLightning = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (showLightning && photoRef.current && lightningStart && lightningEnd) {
        lt.Cast(ctx, lightningStart, lightningEnd);
      }
      requestAnimationFrame(renderLightning);
    };

    renderLightning();

    const updateLightning = (e: MouseEvent) => {
      if (!photoRef.current) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const photoRect = photoRef.current.getBoundingClientRect();
      const photoCenter = new Vector(
        0, 0,
        photoRect.left + photoRect.width / 2 - rect.left,
        photoRect.top + photoRect.height / 2 - rect.top
      );

      setLightningStart(photoCenter);
      setLightningEnd(new Vector(0, 0, x, y));
      setShowLightning(true);
      setLastInteraction(Date.now());
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsMouseDown(true);
      updateLightning(e);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isMouseDown) {
        updateLightning(e);
      }
    };

    const handleMouseUp = () => {
      setIsMouseDown(false);
      setLastInteraction(Date.now());
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMouseDown, showLightning, lightningStart, lightningEnd]);

  useEffect(() => {
    if (!isMouseDown && lastInteraction) {
      const timer = setTimeout(() => {
        setShowLightning(false);
        console.log('Lightning cleared'); // Debug log
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isMouseDown, lastInteraction]);

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
    <div className="landing-page">
    <div className="video-overlay"></div>
    <img src={backgroundGif} alt="Background" className="background-gif" />
    <audio ref={audioRef} loop muted>
      <source src={backgroundMusic} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
    <canvas 
      ref={canvasRef} 
      className="lightning-canvas"
    />
    <div className="content">
      <div className="photo-container">
        <img ref={photoRef} src={myPhoto} alt="Abukar" className="profile-photo" />
      </div>
        <div className="quote">
          <span className="static-text">I will</span>&nbsp;
          <FlipWords words={quoteWords} duration={2000} className="flip-words" />
        </div>
        <div className="icon-container">
          <div className="icon-wrapper">
            <img src={seeIcon} alt="See" className="icon" onClick={() => navigate('/profile')} />
            <span className="tooltip">View Profile</span>
          </div>
          <div className="icon-wrapper">
            <img src={hearIcon} alt="Hear" className="icon" onClick={toggleMusic} />
            <span className="tooltip">Toggle music</span>
          </div>
          <div className="icon-wrapper">
            <img src={speakIcon} alt="Speak" className="icon" onClick={() => navigate('/game')} />
            <span className="tooltip">Play game</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
