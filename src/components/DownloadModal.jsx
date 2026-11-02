import React from 'react';
import { X, Download, ShieldAlert, CheckCircle2, ArrowRight, MessageCircle } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-lg p-6 md:p-8 rounded-3xl bg-[#191923] border border-white/10 text-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient accent */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-48 h-48 rounded-full bg-gradient-to-br from-[#FF7A59]/30 to-[#A995DB]/30 blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF7A59] to-[#A995DB] flex items-center justify-center font-display font-black text-2xl text-white shadow-lg">
            S
          </div>
          <div>
            <h3 className="font-display font-bold text-xl text-white">Download STRADIO MVP</h3>
            <p className="text-xs text-gray-400">Android APK · v0.1.0-alpha · ~28 MB</p>
          </div>
        </div>

        {/* Direct Download Button */}
        <button
          onClick={triggerDownload}
          className="w-full py-3.5 px-6 rounded-2xl font-display font-bold text-sm tracking-wide bg-gradient-to-r from-[#FF7A59] to-[#A995DB] text-white flex items-center justify-center gap-2 shadow-lg hover:shadow-[#FF7A59]/30 hover:scale-[1.02] active:scale-98 transition-all mb-6"
        >
          <Download size={18} />
          <span>Start APK Download (Free)</span>
        </button>

        {/* Android Install Walkthrough */}
        <div className="bg-white/5 rounded-2xl p-4 border border-white/10 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <ShieldAlert size={16} className="text-[#FF7A59]" />
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-300">
              Android Sideloading Guide
            </h4>
          </div>

          <div className="space-y-3 text-xs text-gray-300">
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-white/10 text-[#FF7A59] flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                1
              </span>
              <p>
                When Chrome shows <strong className="text-white">"File might be harmful"</strong>, tap <strong className="text-[#FF7A59]">"Download anyway"</strong>.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-white/10 text-[#FF7A59] flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                2
              </span>
              <p>
                Open the downloaded APK $\rightarrow$ Tap <strong className="text-white">"Settings"</strong> when security prompt appears.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-white/10 text-[#FF7A59] flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                3
              </span>
              <p>
                Toggle <strong className="text-white">"Allow from this source"</strong> $\rightarrow$ Return and tap <strong className="text-[#A995DB]">"Install"</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* WhatsApp Support / Feedback */}
        <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-white/10">
          <span>Testing in Bekasi / Semarang?</span>
          <a
            href="https://wa.me/?text=Hi%20Dandy%2C%20testing%20STRADIO%20App"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#A995DB] hover:text-white transition-colors"
          >
            <MessageCircle size={14} />
            <span>Chat with Lead (Dandy)</span>
          </a>
        </div>
      </div>
    </div>
  );
}
