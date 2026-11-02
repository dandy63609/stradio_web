import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import HeroRunway from './components/HeroRunway';
import InteractiveBeatpad from './components/InteractiveBeatpad';
import Features from './components/Features';
import Footer from './components/Footer';
import AudioVibePlayer from './components/AudioVibePlayer';
import DownloadModal from './components/DownloadModal';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth scroll optimized for 60fps on Android Chrome & Desktop
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.8,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark bg-[#191923]' : 'bg-[#F5F0EB]'}`}>
      {/* Dynamic Header */}
      <Navbar
        isDarkMode={isDarkMode}
        onOpenDownload={() => setIsDownloadModalOpen(true)}
      />

      {/* Main Experience: Sticky Light-to-Dark Transformation Runway */}
      <HeroRunway
        onOpenDownload={() => setIsDownloadModalOpen(true)}
        onThemeChange={setIsDarkMode}
      />

      {/* Interactive Web Audio Beatpad Demo */}
      <InteractiveBeatpad />

      {/* Sensor Algorithm Science */}
      <Features />

      {/* Footer */}
      <Footer
        onOpenDownload={() => setIsDownloadModalOpen(true)}
      />

      {/* Floating Background Audio Player with Waveform */}
      <AudioVibePlayer isDarkMode={isDarkMode} />

      {/* Direct APK Download Modal & Android Guide */}
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />
    </div>
  );
}
