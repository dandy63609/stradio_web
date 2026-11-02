import React from 'react';
import { Cpu, Gauge, Radio, ShieldCheck } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: <Gauge className="text-[#FF7A59]" size={22} />,
      title: "Adaptive Midpoint + Gravitation",
      description: "Unlike generic pedometers that miss steps when your phone shifts in your pocket, our algorithm calculates dynamic midpoint thresholds on raw 3-axis acceleration with gravitational compensation."
    },
    {
      icon: <Radio className="text-[#A995DB]" size={22} />,
      title: "Sub-50ms Audio Trigger",
      description: "Engineered in Flutter & C-level audio buffers to fire Dhani's rhythm stems the exact millisecond your heel compresses, creating a seamless sync between body and beat."
    },
    {
      icon: <Cpu className="text-[#FF7A59]" size={22} />,
      title: "Dynamic Stem Layering",
      description: "Layer 1 carries the continuous ambient running drone. Layer 2 dynamically adds kicks, claps, and bass drops as you lock into your target cadence."
    },
    {
      icon: <ShieldCheck className="text-[#A995DB]" size={22} />,
      title: "100% Offline & Private",
      description: "No cloud latency, no cell signal needed, zero background data drain. Your running cadence is calculated entirely on-device."
    }
  ];

  return (
    <section id="features" className="py-24 px-6 bg-[#191923] text-white relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold text-[#FF7A59] tracking-widest uppercase">
            Engineering & Sensor Science
          </span>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight text-white mt-2 mb-4">
            Built for Real-World Pockets.
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Phones bounce, rotate, and jostle inside running shorts. Here is why STRADIO never loses your rhythm:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#FF7A59]/40 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                {f.icon}
              </div>
              <h3 className="font-display font-bold text-xl text-white mb-2">
                {f.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
