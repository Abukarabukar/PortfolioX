import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.scss';
import myPhoto from '../assets/myPhoto.jpg';
import { FlipWords } from './FlipWords';
import backgroundGif from '../assets/4k.gif';
import backgroundMusic from '../assets/Dream.mp3';
import lightningSound from '../assets/lightning.mp3';
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
  const lightningAudioRef = useRef<HTMLAudioElement | null>(null);
  const lightningAudioContextRef = useRef<AudioContext | null>(null);
  const lightningGainNodeRef = useRef<GainNode | null>(null);
  const navigate = useNavigate();

  const quoteWords = [
    "chase",
    "reach",
    "fly",
  ];

  useEffect(() => {
    // Setup lightning sound
    lightningAudioRef.current = new Audio(lightningSound);
    lightningAudioRef.current.loop = true; // Enable looping
    lightningAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    const source = lightningAudioContextRef.current.createMediaElementSource(lightningAudioRef.current);
    lightningGainNodeRef.current = lightningAudioContextRef.current.createGain();
    source.connect(lightningGainNodeRef.current);
    lightningGainNodeRef.current.connect(lightningAudioContextRef.current.destination);
    lightningGainNodeRef.current.gain.value = 0.5; // Initial volume

    // Setup background music
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Set background music volume
    }

    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        if (audioRef.current) {
          audioRef.current.play().catch(error => console.error("Background music playback failed:", error));
          setIsMusicPlaying(true);
        }
      }
    };

    window.addEventListener('click', handleInteraction);
    return () => {
      window.removeEventListener('click', handleInteraction);
    };
  }, [hasInteracted]);

  const playLightningSound = () => {
    if (lightningAudioRef.current && lightningGainNodeRef.current && lightningAudioContextRef.current) {
      if (lightningAudioRef.current.paused) {
        lightningAudioRef.current.play().catch(error => console.error("Lightning sound playback failed:", error));
      }
      lightningGainNodeRef.current.gain.setValueAtTime(0.5, lightningAudioContextRef.current.currentTime);
    }
  };

  const stopLightningSound = () => {
    if (lightningAudioRef.current && lightningGainNodeRef.current && lightningAudioContextRef.current) {
      lightningGainNodeRef.current.gain.setValueAtTime(lightningGainNodeRef.current.gain.value, lightningAudioContextRef.current.currentTime);
      lightningGainNodeRef.current.gain.linearRampToValueAtTime(0, lightningAudioContextRef.current.currentTime + 0.5);
      setTimeout(() => {
        if (lightningAudioRef.current) {
          lightningAudioRef.current.pause();
          lightningAudioRef.current.currentTime = 0;
        }
      }, 500);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => console.error("Background music playback failed:", error));
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

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

      playLightningSound();
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
      stopLightningSound();
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
        console.log('Lightning cleared');
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isMouseDown, lastInteraction]);

  return (
    <div className="landing-page">
      <div className="video-overlay"></div>
      <img src={backgroundGif} alt="Background" className="background-gif" />
      <audio ref={audioRef} loop>
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