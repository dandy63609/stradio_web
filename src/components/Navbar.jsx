import React from 'react';
import { Download } from 'lucide-react';

/*
 * Nav colours are driven by the --t CSS variable (0 = ivory, 1 = midnight)
 * that HeroRunway writes every frame, so logo, text and button invert in
 * perfect sync with the video scrub. See .theme-* classes in index.css.
 */
export default function Navbar({ onOpenDownload }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 md:px-12">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand logo */}
        <button
          type="button"
          className="flex items-center gap-3"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="STRADIO home"
        >
          <span className="theme-logo w-9 h-9 rounded-xl flex items-center justify-center font-display font-black text-xl">
            S
          </span>
          <span className="theme-fg font-display font-extrabold text-xl tracking-wider">STRADIO</span>
        </button>

        {/* Header CTA */}
        <button
          onClick={onOpenDownload}
          className="theme-btn flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide border active:scale-95 transition-transform"
        >
          <Download size={14} className="text-[#FF7A59]" />
          <span>Get the App</span>
        </button>
      </div>
    </header>
  );
}
