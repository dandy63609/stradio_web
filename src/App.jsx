import React, { useState, useEffect } from "react";
import posthog from "posthog-js";

// Custom Hooks
import { useLenisScroll } from "./hooks/useLenisScroll";

// Components & Sections
import Navbar from "./components/Navbar";
import HeroTransformationSection from "./sections/HeroTransformationSection";
import MusicSensorSection from "./sections/MusicSensorSection";
import AudioVibePlayer from "./components/AudioVibePlayer";
import DownloadModal from "./components/DownloadModal";

export default function App() {
  useLenisScroll();
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  useEffect(() => {
    try {
      const phKey = import.meta.env.VITE_POSTHOG_KEY;
      if (phKey && phKey !== "phc_placeholder") {
        posthog.init(phKey, {
          api_host: "https://us.i.posthog.com",
          person_profiles: "identified_only",
          capture_pageview: true,
        });
      }
    } catch {
      // Ignore analytics init errors in local dev
    }
  }, []);

  const handleDownloadClick = (source = "hero_cta") => {
    try {
      if (posthog.__loaded) {
        posthog.capture("apk_download_clicked", {
          source,
          version: "v0.1.0-alpha",
        });
      }
    } catch {
      // Ignore analytics errors
    }
    setIsDownloadModalOpen(true);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("section") === "features") {
      setTimeout(() => {
        const el = document.getElementById("features");
        if (el) el.scrollIntoView({ behavior: "auto" });
      }, 100);
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full selection:bg-[#DE857A] selection:text-white bg-[#F5F5F7] text-[#15151F]">
      {/* Top Navigation */}
      <Navbar onDownloadClick={handleDownloadClick} />

      {/* Main Experience-First Scroll Storyboard */}
      <main>
        {/* Scenes 01 -> 02: Scroll-Scrubbed Runner Transformation + Hero Pitch */}
        <HeroTransformationSection onDownloadClick={handleDownloadClick} />

        {/* Scene 03: Section 2 (Movement-to-Audio Architecture & Sensor Science) */}
        <MusicSensorSection />
      </main>

      {/* Ambient 165 BPM Vibe Audio Pill */}
      <AudioVibePlayer />

      {/* APK Download & Sideloading Modal */}
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
      />
    </div>
  );
}
