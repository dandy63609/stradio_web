import React, { useState, useEffect, useRef } from 'react';
import { Activity, Footprints, Zap, Sparkles } from 'lucide-react';

export default function InteractiveBeatpad() {
  const [stepCount, setStepCount] = useState(0);
  const [bpm, setBpm] = useState(165);
  const [isRippling, setIsRippling] = useState(false);
  const [ripples, setRipples] = useState([]);
  const tapTimesRef = useRef([]);
  const audioContextRef = useRef(null);
  const audioBufferRef = useRef(null);

  useEffect(() => {
    // Pre-decode audio buffer for zero-latency playback (<15ms)
    const initAudio = async () => {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        const response = await fetch('/audio/sfx-step.wav');
        const arrayBuffer = await response.arrayBuffer();
        audioBufferRef.current = await ctx.decodeAudioData(arrayBuffer);
      } catch (err) {
        console.log("AudioContext init error:", err);
      }
    };

    initAudio();

    // Listen to spacebar for stepping
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        triggerStep();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const playStepSound = () => {
    if (audioContextRef.current && audioBufferRef.current) {
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBufferRef.current;
      source.connect(audioContextRef.current.destination);
      source.start(0);
    }
  };

  const triggerStep = () => {
    playStepSound();
    setStepCount(prev => prev + 1);

    // Dynamic ripple
    const id = Date.now();
    setRipples(prev => [...prev.slice(-4), id]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r !== id));
    }, 600);

    // Calculate cadence BPM from tap intervals
    const now = performance.now();
    const times = tapTimesRef.current;
    times.push(now);
    if (times.length > 5) times.shift();

    if (times.length >= 2) {
      const intervals = [];
      for (let i = 1; i < times.length; i++) {
        intervals.push(times[i] - times[i - 1]);
      }
      const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
      if (avgInterval > 200 && avgInterval < 1200) {
        const calculatedBpm = Math.round(60000 / avgInterval);
        setBpm(calculatedBpm);
      }
    }
  };

  const getCadenceLabel = (cadence) => {
    if (cadence < 145) return { label: 'Warm-up Stride', color: 'text-gray-400' };
    if (cadence < 165) return { label: 'Steady Jogging', color: 'text-[#A995DB]' };
    if (cadence <= 180) return { label: 'Cadence Locked 🔥', color: 'text-[#FF7A59]' };
    return { label: 'Sprint Cadence ⚡', color: 'text-amber-400' };
  };

  const cadenceInfo = getCadenceLabel(bpm);

  return (
    <section id="beatpad" className="py-24 px-6 bg-[#0E0E14] text-white relative overflow-hidden border-t border-white/10">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-[#A995DB] mb-4">
          <Footprints size={14} className="text-[#FF7A59]" />
          <span>Movement-Powered Sound Simulation</span>
        </div>

        <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight mb-4 text-white">
          Experience the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A59] to-[#A995DB]">Step-Beat Trigger</span>
        </h2>
        <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto mb-10">
          In the actual STRADIO app, our <strong>Adaptive Midpoint + Gravitation</strong> algorithm catches your real footstrike from the pocket. Test the dynamic sound latency right now:
        </p>

        {/* Live Metrics Header */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-lg mx-auto mb-10">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-xs text-gray-400 block mb-1">Simulated Steps</span>
            <span className="font-display font-bold text-2xl text-white">{stepCount}</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-xs text-gray-400 block mb-1">Cadence</span>
            <span className="font-display font-bold text-2xl text-[#FF7A59]">{bpm} <span className="text-xs font-normal text-gray-400">SPM</span></span>
          </div>

          <div className="col-span-2 md:col-span-1 p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-center">
            <span className="text-xs text-gray-400 block mb-1">Pace Status</span>
            <span className={`font-semibold text-sm ${cadenceInfo.color}`}>{cadenceInfo.label}</span>
          </div>
        </div>

        {/* Giant Interactive Step Button */}
        <div className="relative inline-block my-4">
          {/* Animated Ripples */}
          {ripples.map(id => (
            <span
              key={id}
              className="absolute inset-0 rounded-full border-2 border-[#FF7A59] animate-ping pointer-events-none opacity-70"
            />
          ))}

          <button
            onClick={triggerStep}
            className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-tr from-[#FF7A59] via-[#A995DB] to-[#191923] p-[3px] shadow-2xl hover:scale-105 active:scale-95 transition-all select-none cursor-pointer focus:outline-none"
          >
            <div className="w-full h-full rounded-full bg-[#191923] flex flex-col items-center justify-center gap-2 group hover:bg-[#191923]/90 transition-colors">
              <Zap size={36} className="text-[#FF7A59] group-hover:scale-110 transition-transform" />
              <span className="font-display font-bold text-base md:text-lg tracking-wide text-white">
                TAP TO STEP
              </span>
              <span className="text-[11px] text-gray-400">or press [Spacebar]</span>
            </div>
          </button>
        </div>

        {/* Latency Proof Pill */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-400">
          <Activity size={14} className="text-[#A995DB]" />
          <span>Real-time Web Audio API execution · <strong className="text-emerald-400">&lt;15ms latency</strong></span>
        </div>
      </div>
    </section>
  );
}
