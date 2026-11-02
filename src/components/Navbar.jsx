import React from 'react';
import { Download } from 'lucide-react';

export default function Navbar({ isDarkMode, onOpenDownload }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-colors duration-500 backdrop-blur-md bg-opacity-70">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-black text-xl transition-all duration-500 shadow-md bg-gradient-to-br from-[#FF7A59] to-[#A995DB] text-white">
            S
          </div>
          <span className={`font-display font-extrabold text-xl tracking-wider transition-colors duration-500 ${isDarkMode ? 'text-white' : 'text-[#191923]'}`}>
            STRADIO
          </span>
        </div>

        {/* Navigation links (Desktop & Tablet) */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#hero"
            className={`text-sm font-medium transition-colors duration-300 hover:text-[#FF7A59] ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
          >
            Experience
          </a>
          <a
            href="#beatpad"
            className={`text-sm font-medium transition-colors duration-300 hover:text-[#FF7A59] ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
          >
            Interactive Demo
          </a>
          <a
            href="#features"
            className={`text-sm font-medium transition-colors duration-300 hover:text-[#FF7A59] ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
          >
            Algorithm
          </a>
        </nav>

        {/* Header Action Button */}
        <button
          onClick={onOpenDownload}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 shadow-sm active:scale-95 ${
            isDarkMode
              ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
              : 'bg-[#191923] text-white hover:bg-black'
          }`}
        >
          <Download size={14} className="text-[#FF7A59]" />
          <span>Get APK</span>
        </button>
      </div>
    </header>
  );
}
