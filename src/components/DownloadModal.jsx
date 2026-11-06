import React from 'react';
import { X, Download, ShieldAlert } from 'lucide-react';

export default function DownloadModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const triggerDownload = () => {
    const link = document.createElement('a');
    link.href = '/stradio.apk';
    link.download = 'stradio-v0.1.0-alpha.apk';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#15151F]/40 backdrop-blur-md transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg p-6 sm:p-8 rounded-[28px] bg-[#F5F5F7]/95 backdrop-blur-2xl border border-[#BCBDB4]/50 text-[#15151F] shadow-[0_24px_64px_rgba(0,0,0,0.18)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-black/5 hover:bg-black/10 text-[#15151F]/60 hover:text-[#15151F] transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* 3D Sculpted S-Logo + Brand Header */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src="/assets/images/brand/s-logo-3d.png"
            alt="STRADIO 3D S-Logo"
            className="w-[44px] h-[54px] object-contain shrink-0 drop-shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
          />
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-wordmark font-black italic text-2xl tracking-tight text-[#15151F]">
                STRADIO
              </span>
              <span className="font-sans font-semibold text-[10px] tracking-[0.2em] uppercase text-[#BA617B]">
                RUN THE VIBE
              </span>
            </div>
            <p className="font-sans text-xs text-[#171918]/70 mt-0.5">
              Android APK · v0.1.0-alpha · Direct Build
            </p>
          </div>
        </div>

        {/* Official Brand Gradient Direct Download Button */}
        <button
          type="button"
          onClick={triggerDownload}
          className="stradio-gradient-pill w-full py-3.5 px-6 rounded-[100px] font-sans font-semibold text-sm tracking-[0.01em] text-[#F5F5F7] flex items-center justify-center gap-2.5 mb-6 cursor-pointer shadow-md hover:shadow-lg"
        >
          <Download size={18} strokeWidth={2.4} />
          <span>Download STRADIO APK (Free)</span>
        </button>

        {/* Android Sideloading Walkthrough */}
        <div className="bg-white/80 rounded-2xl p-4 sm:p-5 border border-[#BCBDB4]/40 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert size={16} className="text-[#BA617B]" />
            <h4 className="font-sans text-xs font-bold uppercase tracking-[0.12em] text-[#15151F]/85">
              Android Sideloading Guide
            </h4>
          </div>

          <div className="space-y-3 font-sans text-xs text-[#171918]/80">
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-[#BA617B]/15 text-[#BA617B] flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                1
              </span>
              <p>
                When Chrome shows <strong className="text-[#15151F]">"File might be harmful"</strong>, tap{' '}
                <strong className="text-[#BA617B]">"Download anyway"</strong>.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-[#BA617B]/15 text-[#BA617B] flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                2
              </span>
              <p>
                Open the downloaded APK → Tap <strong className="text-[#15151F]">"Settings"</strong> when the security prompt appears.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-[#BA617B]/15 text-[#BA617B] flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                3
              </span>
              <p>
                Toggle on <strong className="text-[#15151F]">"Allow from this source"</strong> → Tap <strong className="text-[#BA617B]">"Install"</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer Note */}
        <p className="font-sans text-[11px] text-center text-[#171918]/50">
          Requires Android 10+ with accelerometer and step sensor hardware.
        </p>
      </div>
    </div>
  );
}
