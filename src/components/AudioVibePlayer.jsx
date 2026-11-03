import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function AudioVibePlayer({ isDarkMode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.55;

    const attemptPlay = () => {
      const promise = audio.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            setIsPlaying(true);
            setAutoplayBlocked(false);
          })
          .catch(() => {
            setAutoplayBlocked(true);
            setIsPlaying(false);

            const unlockImmediately = () => {
              audio
                .play()
                .then(() => {
                  setIsPlaying(true);
                  setAutoplayBlocked(false);
                })
                .catch(() => {});

              ['pointerdown', 'touchstart', 'scroll', 'keydown', 'click'].forEach((evt) => {
                window.removeEventListener(evt, unlockImmediately);
              });
            };

            ['pointerdown', 'touchstart', 'scroll', 'keydown', 'click'].forEach((evt) => {
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
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setAutoplayBlocked(false);
        })
        .catch(() => {});
    }
  };

  return (
    <div className="fixed bottom-24 right-4 sm:bottom-24 sm:right-6 lg:bottom-6 lg:right-8 z-40">
      <audio ref={audioRef} src="/audio/vibe-track.m4a" autoPlay loop preload="auto" />

      <button
        type="button"
        onClick={togglePlay}
        className={`group flex items-center gap-2.5 px-3.5 py-2 rounded-full cursor-pointer transition-all duration-500 backdrop-blur-md shadow-2xl border select-none active:scale-95 ${
          autoplayBlocked
            ? 'bg-gradient-to-r from-[#FF7A59] to-[#A995DB] text-white border-transparent animate-bounce shadow-[#FF7A59]/40'
            : isDarkMode
              ? 'bg-[#191923]/90 border-white/15 text-white shadow-purple-950/40 hover:border-[#FF7A59]/50'
              : 'bg-white/90 border-black/10 text-[#191923] shadow-gray-400/25 hover:border-[#191923]/40'
        }`}
      >
        {/* Animated Soundwave bars */}
        <div className="flex items-center gap-0.5 h-3.5 w-3.5 justify-center">
          <span
            className={`w-0.5 rounded-full transition-all duration-300 ${
              isPlaying
                ? autoplayBlocked
                  ? 'bg-white animate-soundwave-1'
                  : 'bg-[#FF7A59] animate-soundwave-1'
                : 'bg-gray-400 h-1.5'
            }`}
          />
          <span
            className={`w-0.5 rounded-full transition-all duration-300 ${
              isPlaying
                ? autoplayBlocked
                  ? 'bg-white animate-soundwave-2'
                  : 'bg-[#A995DB] animate-soundwave-2'
                : 'bg-gray-400 h-2.5'
            }`}
          />
          <span
            className={`w-0.5 rounded-full transition-all duration-300 ${
              isPlaying
                ? autoplayBlocked
                  ? 'bg-white animate-soundwave-3'
                  : 'bg-[#FF7A59] animate-soundwave-3'
                : 'bg-gray-400 h-1.5'
            }`}
          />
        </div>

        {/* Track Label */}
        <div className="flex flex-col text-left">
          <span className="text-[11px] font-semibold tracking-wide leading-tight">
            {autoplayBlocked ? '▶ Tap for Vibe' : isPlaying ? 'STRADIO Vibe' : 'Vibe Muted'}
          </span>
          <span
            className={`text-[9px] font-medium leading-tight ${
              autoplayBlocked ? 'text-white/80' : 'text-gray-400'
            }`}
          >
            165 BPM
          </span>
        </div>

        {/* Icon */}
        <div
          className={`p-1 rounded-full ${
            autoplayBlocked ? 'bg-white/20' : isDarkMode ? 'bg-white/10' : 'bg-black/5'
          }`}
        >
          {isPlaying ? (
            <Volume2 size={12} className={autoplayBlocked ? 'text-white' : 'text-[#FF7A59]'} />
          ) : (
            <VolumeX size={12} className={autoplayBlocked ? 'text-white' : 'text-gray-400'} />
          )}
        </div>
      </button>
    </div>
  );
}
