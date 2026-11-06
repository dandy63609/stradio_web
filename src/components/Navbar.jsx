import React, { useEffect, useState } from "react";

// ===================================================================
// GLASS EFFECT SCROLL TRIGGER:
// 1.0 = Appears right after the last frame (as you scroll into next section)
// 0.8 = Appears earlier
// 1.2 = Appears later
// ===================================================================
const GLASS_SCROLL_POINT = 1.0;

const NAV_ITEMS = [
  { id: "about", label: "ABOUT", type: "scroll", target: "top" },
  { id: "features", label: "FEATURES", type: "scroll", target: "features" },
  { id: "community", label: "COMMUNITY", type: "action", actionKey: "navbar_community" },
  { id: "faq", label: "FAQ", type: "scroll", target: "features" },
];

/**
 * Custom hook to calculate navbar fade-in and glassmorphism state from scroll position
 */
function useNavbarScroll(glassScrollPoint = GLASS_SCROLL_POINT) {
  const [navOpacity, setNavOpacity] = useState(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("scroll") === "1" || params.get("scene") === "1") {
        return 1;
      }
    }
    return 0;
  });

  const [hasGlass, setHasGlass] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop;
      const vh = window.innerHeight || 800;

      // 1. Navbar text & buttons visibility
      const op = Math.min(1, Math.max(0, (y - 100) / 200));
      setNavOpacity(op);

      // 2. Glassmorphism: only activate AFTER the last frame (scrolling past hero)
      const isAfterLastFrame = y >= vh * glassScrollPoint;
      setHasGlass(isAfterLastFrame);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [glassScrollPoint]);

  return { navOpacity, hasGlass };
}

export default function Navbar({ onDownloadClick }) {
  const { navOpacity, hasGlass } = useNavbarScroll(GLASS_SCROLL_POINT);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (item) => {
    if (item.type === "scroll") {
      scrollToSection(item.target);
    } else if (item.type === "action") {
      onDownloadClick(item.actionKey);
    }
  };

  const isInteractive = navOpacity > 0.5;

  return (
    <header
      /* CHANGE top-3 for top spacing, px-3 for side spacing from screen edge */
      className="fixed top-3 sm:top-4 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 transition-all duration-300 ease-out flex justify-center pointer-events-none"
      style={{
        opacity: navOpacity,
        transform: `translate3d(0, ${(1 - navOpacity) * -20}px, 0)`,
        pointerEvents: isInteractive ? "auto" : "none",
      }}
    >
      {/* FLOATING GLASS ISLAND: */}
      {/* 1. Change max-w-[1100px] for navbar total width */}
      {/* 2. Change rounded-[18px] for corner roundness */}
      <div
        className={`w-full max-w-[1100px] rounded-[18px] sm:rounded-[22px] overflow-hidden transition-all duration-300 pointer-events-auto ${
          hasGlass
            ? "bg-[#F5F5F7]/80 backdrop-blur-md border border-[#BCBDB4]/40 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
            : "bg-transparent backdrop-blur-none border border-transparent shadow-none"
        }`}
        style={{
          WebkitBackdropFilter: hasGlass ? "blur(14px)" : "none",
        }}
      >
        {/* Top Gradient Hairline Accent (Appears together with the glass effect) */}
        <div
          className={`w-full h-[2px] bg-gradient-to-r from-[#de857a] via-[#ba617b] to-[#a273af] transition-opacity duration-300 ${
            hasGlass ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* NAVBAR INNER CONTENT: */}
        {/* Change py-2 lg:py-2.5 for navbar height/thickness */}
        {/* Change px-4 lg:px-6 for left/right inner edge padding */}
        <div className="w-full px-4 sm:px-6 lg:px-7 py-2 lg:py-2.5 flex items-center justify-between">
          {/* Left Brand Lockup: Corner Bracket + 3D Sculpted S-Emblem */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Top-Left Corner Bracket (Figma 24:209) */}
            <svg
              className="hidden lg:block w-[14px] h-[14px] text-[#BCBDB4]"
              viewBox="0 0 18 18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M 0 18 L 0 0 L 18 0" />
            </svg>

            <a
              href="#top"
              className="flex items-center gap-2 group focus:outline-none"
              aria-label="STRADIO Home"
            >
              {/* LOGO SIZE: change lg:w-[28px] lg:h-[36px] for desktop */}
              <img
                src="/assets/images/brand/s-logo-3d.png"
                alt="STRADIO emblem"
                className="w-[28px] h-[36px] sm:w-[32px] sm:h-[40px] lg:w-[28px] lg:h-[36px] object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.12)] transition-transform duration-300 group-hover:scale-105"
              />
            </a>
          </div>

          {/* Center Desktop Navigation Links (Figma 24:310-313) */}
          {/* Change gap-6 xl:gap-8 for space between links */}
          {/* Change text-[12px] xl:text-[13px] for link font size */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item)}
                className="font-sans font-medium text-[12px] xl:text-[13px] text-[#171918] tracking-[0.04em] hover:text-[#BA617B] transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Action: Download App Pill */}
          <div className="flex items-center gap-3">
            {/* BUTTON SIZE: change lg:h-[34px] lg:px-5 lg:text-[12px] for desktop */}
            <button
              type="button"
              onClick={() => onDownloadClick("navbar_cta")}
              className="h-[30px] sm:h-[35px] lg:h-[34px] px-3.5 sm:px-3 lg:px-5 rounded-[100px] bg-[#15151F] text-[#F5F5F7] border-[1.5px] border-[#c2959d]/80 text-[10px] sm:text-[14px] lg:text-[12px] font-sans font-semibold tracking-[0.01em] transition-all duration-200 hover:scale-[1.03] active:scale-[0.98] cursor-pointer shadow-sm hover:shadow-md"
            >
              Download App
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
