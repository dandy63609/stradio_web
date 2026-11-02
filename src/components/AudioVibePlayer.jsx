import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

export default function AudioVibePlayer({ isDarkMode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Attempt graceful auto-start on first user scroll or touch gesture
    const handleFirstGesture = () => {
      if (!hasInteracted && audioRef.current) {
        setHasInteracted(true);
        audioRef.current.volume = 0.5;
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay blocked without explicit click, keep muted/paused
            setIsPlaying(false);
          });
      }
    };

    window.addEventListener('scroll', handleFirstGesture, { once: true });
    window.addEventListener('touchstart', handleFirstGesture, { once: true });
    window.addEventListener('click', handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener('scroll', handleFirstGesture);
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('click', handleFirstGesture);
    };
  }, [hasInteracted]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = 0.6;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Audio play error:", err));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Hidden background audio element */}
      <audio
        ref={audioRef}
        src="/audio/bass-drop.mp3"
        loop
        preload="auto"
      />

      <div
        onClick={togglePlay}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-full cursor-pointer transition-all duration-500 backdrop-blur-md shadow-xl border select-none active:scale-95 ${
          isDarkMode
            ? 'bg-[#191923]/90 border-white/15 text-white shadow-purple-950/40 hover:border-[#FF7A59]/50'
            : 'bg-white/90 border-gray-200 text-[#191923] shadow-gray-400/30 hover:border-[#191923]'
        }`}
      >
        {/* Animated Soundwave bars */}
        <div className="flex items-center gap-1 h-4 w-4 justify-center">
          <span
            className={`w-1 rounded-full transition-all duration-300 ${isPlaying ? 'bg-[#FF7A59] animate-soundwave-1' : 'bg-gray-400 h-1.5'}`}
          />
          <span
            className={`w-1 rounded-full transition-all duration-300 ${isPlaying ? 'bg-[#A995DB] animate-soundwave-2' : 'bg-gray-400 h-3'}`}
          />
          <span
            className={`w-1 rounded-full transition-all duration-300 ${isPlaying ? 'bg-[#FF7A59] animate-soundwave-3' : 'bg-gray-400 h-1.5'}`}
          />
        </div>

        {/* Track Info */}
        <div className="flex flex-col">
          <span className="text-xs font-semibold tracking-wide">
            {isPlaying ? 'Stride Vibe On' : 'Stride Vibe Muted'}
          </span>
          <span className="text-[10px] text-gray-400 font-medium">165 BPM Ambient</span>
        </div>

        {/* Play/Pause Button */}
        <div className={`p-1.5 rounded-full ${isDarkMode ? 'bg-white/10' : 'bg-gray-100'}`}>
          {isPlaying ? <Volume2 size={13} className="text-[#FF7A59]" /> : <VolumeX size={13} className="text-gray-400" />}
        </div>
      </div>
    </div>
  );
}
