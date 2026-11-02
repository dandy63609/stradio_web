import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

export default function AudioVibePlayer({ isDarkMode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.55;

    // 1. Attempt immediate playback as soon as the user opens the web page
    const attemptPlay = () => {
      const promise = audio.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            setIsPlaying(true);
            setAutoplayBlocked(false);
          })
          .catch((err) => {
            // Autoplay with sound was blocked by the browser's policy
            setAutoplayBlocked(true);
            setIsPlaying(false);

            // Unlock immediately on the very first micro-interaction
            const unlockImmediately = () => {
              audio.play().then(() => {
                setIsPlaying(true);
                setAutoplayBlocked(false);
              }).catch(() => {});

              ['pointerdown', 'touchstart', 'scroll', 'keydown', 'click'].forEach(evt => {
                window.removeEventListener(evt, unlockImmediately);
              });
            };

            ['pointerdown', 'touchstart', 'scroll', 'keydown', 'click'].forEach(evt => {
              window.addEventListener(evt, unlockImmediately, { once: true, passive: true });
            });
          });
      }
    };

    attemptPlay();

    return () => {
      if (audio) audio.pause();
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = 0.6;
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setAutoplayBlocked(false);
        })
        .catch(err => console.log("Audio play error:", err));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Background audio element with autoPlay attribute */}
      <audio
        ref={audioRef}
        src="/audio/vibe-track.m4a"
        autoPlay
        loop
        preload="auto"
      />

      <div
        onClick={togglePlay}
        className={`group flex items-center gap-3 px-4 py-2.5 rounded-full cursor-pointer transition-all duration-500 backdrop-blur-md shadow-2xl border select-none active:scale-95 ${
          autoplayBlocked
            ? 'bg-gradient-to-r from-[#FF7A59] to-[#A995DB] text-white border-transparent animate-bounce shadow-[#FF7A59]/40'
            : isDarkMode
              ? 'bg-[#191923]/95 border-white/15 text-white shadow-purple-950/40 hover:border-[#FF7A59]/50'
              : 'bg-white/95 border-gray-200 text-[#191923] shadow-gray-400/30 hover:border-[#191923]'
        }`}
      >
        {/* Animated Soundwave bars */}
        <div className="flex items-center gap-1 h-4 w-4 justify-center">
          <span
            className={`w-1 rounded-full transition-all duration-300 ${
              isPlaying
                ? autoplayBlocked ? 'bg-white animate-soundwave-1' : 'bg-[#FF7A59] animate-soundwave-1'
                : 'bg-gray-400 h-1.5'
            }`}
          />
          <span
            className={`w-1 rounded-full transition-all duration-300 ${
              isPlaying
                ? autoplayBlocked ? 'bg-white animate-soundwave-2' : 'bg-[#A995DB] animate-soundwave-2'
                : 'bg-gray-400 h-3'
            }`}
          />
          <span
            className={`w-1 rounded-full transition-all duration-300 ${
              isPlaying
                ? autoplayBlocked ? 'bg-white animate-soundwave-3' : 'bg-[#FF7A59] animate-soundwave-3'
                : 'bg-gray-400 h-1.5'
            }`}
          />
        </div>

        {/* Track Label */}
        <div className="flex flex-col">
          <span className="text-xs font-semibold tracking-wide">
            {autoplayBlocked ? '▶ Tap to Play Vibe' : isPlaying ? 'STRADIO Vibe On' : 'Stride Vibe Muted'}
          </span>
          <span className={`text-[10px] font-medium ${autoplayBlocked ? 'text-white/80' : 'text-gray-400'}`}>
            165 BPM Rhythm
          </span>
        </div>

        {/* Icon */}
        <div className={`p-1.5 rounded-full ${autoplayBlocked ? 'bg-white/20' : isDarkMode ? 'bg-white/10' : 'bg-gray-100'}`}>
          {isPlaying ? (
            <Volume2 size={13} className={autoplayBlocked ? 'text-white' : 'text-[#FF7A59]'} />
          ) : (
            <VolumeX size={13} className={autoplayBlocked ? 'text-white' : 'text-gray-400'} />
          )}
        </div>
      </div>
    </div>
  );
}
