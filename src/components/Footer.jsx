import React from 'react';
import { Download } from 'lucide-react';

export default function Footer({ onOpenDownload }) {
  return (
    <footer className="py-16 px-6 bg-[#0E0E14] text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FF7A59] to-[#A995DB] flex items-center justify-center font-display font-black text-lg text-white">
              S
            </div>
            <span className="font-display font-extrabold text-xl tracking-wider">STRADIO</span>
          </div>
          <p className="text-xs text-gray-400 max-w-sm">
            Stride + Audio. A movement-powered music experience turning footstrikes into dynamic rhythm.
          </p>
          <div className="mt-3 flex items-center gap-3 text-[11px] text-gray-500">
            <span>Validation Target: Dec 1, 2026</span>
            <span>•</span>
            <span>Bekasi & Semarang</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={onOpenDownload}
            className="flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold tracking-wide bg-white/10 border border-white/20 hover:bg-[#FF7A59] hover:border-[#FF7A59] hover:text-white transition-all text-gray-200"
          >
            <Download size={14} />
            <span>Download APK (v0.1.0-alpha)</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500">
        <span>© 2026 STRADIO Team. All rights reserved.</span>
        <span>Lead & Algorithm: Dandy · Audio: DDHANNi · Dev: Ridwan · Growth: Zaydan</span>
      </div>
    </footer>
  );
}
