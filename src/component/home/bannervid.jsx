import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Volume2, VolumeX } from 'lucide-react';

const UNLOCK_EVENTS = ['pointerdown', 'keydown', 'touchstart'];

export default function VideoBanner() {
  const videoRef = useRef(null);
  // Sound is on from the start
  const [isMuted, setIsMuted] = useState(false);
  // The video's real width/height ratio, read once its metadata loads - sizing the
  // frame to this exact ratio is what lets the video show in full with no cropping
  // and no empty letterbox bars, instead of guessing a fixed box and cutting into it.
  const [aspectRatio, setAspectRatio] = useState(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const readAspectRatio = () => {
      if (video.videoWidth && video.videoHeight) {
        setAspectRatio(video.videoWidth / video.videoHeight);
      }
    };

    if (video.readyState >= 1) readAspectRatio(); // metadata may already be loaded
    video.addEventListener('loadedmetadata', readAspectRatio);
    return () => video.removeEventListener('loadedmetadata', readAspectRatio);
  }, []);

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
    <section className="w-full bg-[#FCFCFB] px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Framed video card: the box is sized to the video's real aspect ratio (falling
          back to a sane 21:9 guess until that's known) so the video shows in full -
          no cropping and no empty letterbox bars - rather than forcing a fixed shape. */}
      <div
        className="relative w-full max-w-[1600px] mx-auto overflow-hidden rounded-2xl bg-black"
        style={{ aspectRatio: aspectRatio ?? 21 / 9, maxHeight: '75vh' }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          {/* Local video served from /public/vid.mp4 */}
          <source src="/vid.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Cinematic Gradient / Dark Overlay for readability */}
        <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />

        {/* Content Container */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-2xl sm:text-4xl md:text-5xl font-serif font-light tracking-[0.15em] uppercase mb-5 drop-shadow-lg">
            WEAR IT EVERYWHERE
          </h1>

          <Link
            to="/new-arrivals"
            className="bg-white text-[#1A1A1A] text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase px-7 py-3.5 hover:bg-[#D4AF37] transition-colors"
          >
            Shop Now
          </Link>
        </div>

        {/* Sound Toggle */}
        <button
          type="button"
          onClick={toggleSound}
          aria-label={isMuted ? 'Turn video sound on' : 'Turn video sound off'}
          aria-pressed={!isMuted}
          className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-black/50 backdrop-blur-sm border border-white/30 text-white px-3 py-2 text-[10px] uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-black transition-colors"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          <span className="hidden sm:inline">{isMuted ? 'Sound Off' : 'Sound On'}</span>
        </button>
      </div>
    </section>
  );
}