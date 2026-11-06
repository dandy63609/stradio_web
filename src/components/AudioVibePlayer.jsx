import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const AUDIO_UNLOCK_EVENTS = ['pointerdown', 'touchstart', 'keydown', 'click'];

export default function AudioVibePlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.55;

    const attemptPlay = () => {
      const promise = audio.play();
      if (promise !== undefined) {
        promise
          .then(() => setIsPlaying(true))
          .catch(() => {
            setIsPlaying(false);

            const unlockImmediately = () => {
              audio
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => {});

              AUDIO_UNLOCK_EVENTS.forEach((evt) => {
                window.removeEventListener(evt, unlockImmediately);
              });
            };

            AUDIO_UNLOCK_EVENTS.forEach((evt) => {
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

  const togglePlay = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.volume = 0.6;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/full-beat.wav" autoPlay loop preload="auto" />

      {/* Desktop Audio Pill (Screens >= 640px) */}
      <div className="hidden sm:block fixed bottom-6 right-8 z-40">
        <DesktopAudioButton isPlaying={isPlaying} onToggle={togglePlay} />
      </div>

      {/* Mobile Audio Button (Screens < 640px) */}
      <div className="sm:hidden fixed bottom-3 right-3 z-40">
        <MobileAudioButton isPlaying={isPlaying} onToggle={togglePlay} />
      </div>
    </>
  );
}

function DesktopAudioButton({ isPlaying, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="group flex items-center gap-2 h-[30px] sm:h-[36px] px-3 sm:px-4 rounded-full cursor-pointer transition-all duration-300 backdrop-blur-md shadow-md border border-[#BCBDB4]/50 select-none active:scale-95 bg-[#F5F5F7]/90 text-[#15151F] hover:bg-white"
    >
      <span
        className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-transform duration-300 ${
          isPlaying ? 'bg-[#BA617B] scale-110' : 'bg-[#BCBDB4]'
        }`}
      />
      <span className="font-sans font-semibold text-[10px] sm:text-[11px] tracking-[0.02em] leading-none text-[#15151F]">
        {isPlaying ? 'STRADIO Vibe · 165 BPM' : 'Tap for Vibe · 165 BPM'}
      </span>
      {isPlaying ? (
        <Volume2 size={12} className="text-[#BA617B]" />
      ) : (
        <VolumeX size={12} className="text-[#8652A4]" />
      )}
    </button>
  );
}

function MobileAudioButton({ isPlaying, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isPlaying ? 'Mute music' : 'Play music'}
      className="flex items-center gap-1.5 h-[30px] px-2.5 rounded-full cursor-pointer transition-all duration-300 backdrop-blur-md shadow-lg border border-[#BCBDB4]/60 active:scale-95 bg-[#F5F5F7]/95 text-[#15151F]"
    >
      <span
        className={`w-1.5 h-1.5 rounded-full transition-transform ${
          isPlaying ? 'bg-[#BA617B] animate-pulse scale-110' : 'bg-[#BCBDB4]'
        }`}
      />
      {isPlaying ? (
        <Volume2 size={13} className="text-[#BA617B]" />
      ) : (
        <VolumeX size={13} className="text-[#8652A4]" />
      )}
      <span className="font-sans font-semibold text-[9px] tracking-wide text-[#15151F]">
        {isPlaying ? '165 BPM' : 'VIBE'}
      </span>
    </button>
  );
}
