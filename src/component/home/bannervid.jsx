import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, Volume2, VolumeX } from 'lucide-react';

const UNLOCK_EVENTS = ['pointerdown', 'keydown', 'touchstart'];

export default function VideoBanner() {
  const videoRef = useRef(null);
  // Sound is on from the start
  const [isMuted, setIsMuted] = useState(false);

  // Browsers may block autoplay with sound until the visitor interacts with the page.
  // If that happens, fall back to muted playback and turn the sound on at the first
  // click / key press / tap.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    let cancelled = false;
    let unlock = null;

    const removeUnlock = () => {
      if (!unlock) return;
      UNLOCK_EVENTS.forEach((event) => window.removeEventListener(event, unlock));
      unlock = null;
    };

    video.muted = false;
    video.play().catch(() => {
      if (cancelled) return;

      // Blocked: play silently for now
      video.muted = true;
      setIsMuted(true);
      video.play().catch(() => {});

      unlock = () => {
        removeUnlock();
        video.muted = false;
        setIsMuted(false);
        video.play().catch(() => {});
      };
      UNLOCK_EVENTS.forEach((event) => window.addEventListener(event, unlock, { once: true }));
    });

    return () => {
      cancelled = true;
      removeUnlock();
    };
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);

    // Make sure playback continues after unmuting
    if (!nextMuted && video.paused) {
      video.play().catch(() => {});
    }
  };

  return (
    <section className="relative w-full h-[85vh] min-h-[550px] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-75 scale-105"
      >
        {/* Local video served from /public/vid.mp4 */}
        <source src="/vid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Cinematic Gradient / Dark Overlay for readability */}
      <div className="absolute inset-0 bg-black/40 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

      {/* Content Container */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-end h-full pb-16">
        
        {/* Subtitle with high-end tracking */}
        <p className="text-[#EAE6DF] text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase mb-3 drop-shadow-md">
          WATERPROOF ESSENTIALS
        </p>

        {/* Main Headline matching reference */}
        <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-serif font-light tracking-[0.2em] uppercase mb-6 drop-shadow-lg">
          WEAR IT EVERYWHERE
        </h1>

        {/* Dual Action Links */}
        <div className="flex items-center space-x-8 text-xs md:text-sm tracking-[0.2em] font-medium uppercase text-white">
          <a 
            href="#shop-earrings" 
            className="relative pb-1 group hover:text-[#D4AF37] transition-colors"
          >
            Shop Earrings
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
          </a>
          
          <span className="text-white/40">•</span>

          <a 
            href="#latest-drops" 
            className="relative pb-1 group hover:text-[#D4AF37] transition-colors"
          >
            Latest Drops
            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
          </a>
        </div>
      </div>

      {/* Sound Toggle */}
      <button
        type="button"
        onClick={toggleSound}
        aria-label={isMuted ? 'Turn video sound on' : 'Turn video sound off'}
        aria-pressed={!isMuted}
        className="absolute bottom-6 right-6 z-20 flex items-center gap-2 bg-black/50 backdrop-blur-sm border border-white/30 text-white px-3 py-2 text-[10px] uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black transition-colors"
      >
        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        <span className="hidden sm:inline">{isMuted ? 'Sound Off' : 'Sound On'}</span>
      </button>

      {/* Subtle Scroll Down Indicator at the absolute bottom */}
      <div className="absolute bottom-6 z-10 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer">
        <ChevronDown size={20} className="text-white/80" />
      </div>
    </section>
  );
}