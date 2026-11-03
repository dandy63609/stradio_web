import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import HeroRunway from './components/HeroRunway';
import AudioVibePlayer from './components/AudioVibePlayer';
import DownloadModal from './components/DownloadModal';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  useEffect(() => {
    // Lenis smooth inertia scroll for the whole page (Android Chrome + desktop)
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen theme-bg">
      {/* Nav: logo + Get the App, colours follow the scroll theme (--t) */}
      <Navbar onOpenDownload={() => setIsDownloadModalOpen(true)} />

      {/* One-page experience: runner transformation, ends on the dark CTA screen */}
      <HeroRunway
        onOpenDownload={() => setIsDownloadModalOpen(true)}
        onThemeChange={setIsDarkMode}
      />

      {/* Floating background music pill with waveform */}
      <AudioVibePlayer isDarkMode={isDarkMode} />

      {/* Direct APK download + Android install guide */}
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />
    </div>
  );
}
