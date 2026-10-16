import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import zeloraBanner from '../../assets/Zelora Web Banner.jpg.jpeg';
import banner2 from '../../assets/banner2.jpeg';
import banner3 from '../../assets/banner3.jpeg';
import banner6 from '../../assets/banner6.jpeg';

// All the hero banner images. `banner.jpeg` is skipped - it's an empty 0-byte file
// on disk. `banner5.jpeg` is skipped too - it's byte-for-byte identical to
// banner3.jpeg, so showing both would just repeat the same slide.
//
// `ratio` is each image's real width/height (known exactly - these are fixed,
// bundled files, not something that varies at runtime like a video). The carousel
// box is sized in JS to match whichever slide is active, so object-cover never has
// anything to crop: a box shaped exactly like its image shows that image in full.
const SLIDES = [
  {
    image: zeloraBanner,
    alt: 'Zelora - Timeless Elegance, Always. Premium quality, trusted authenticity, luxury packaging, timeless designs.',
    to: '/new-arrivals',
    overlay: false, // this graphic already has the logo, tagline and CTA baked in
    ratio: 1500 / 500,
  },
  {
    image: banner2,
    alt: 'Zelora jewellery, styled',
    to: '/new-arrivals',
    overlay: true,
    ratio: 1080 / 1440,
  },
  {
    image: banner3,
    alt: 'Zelora jewellery, styled',
    to: '/new-arrivals',
    overlay: true,
    ratio: 1080 / 1440,
  },
  {
    image: banner6,
    alt: 'Zelora jewellery, styled',
    to: '/new-arrivals',
    overlay: true,
    ratio: 1080 / 1440,
  },
];

const AUTO_ADVANCE_MS = 5000;
const MAX_HEIGHT_RATIO = 0.75; // cap, as a fraction of window height

// Hero image carousel: cycles through every banner image, auto-advancing, with
// arrows and dots for manual control. Pauses on hover so the current slide can be read.
export default function BannerImg() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const wrapperRef = useRef(null);
  // The box's actual rendered size in px, recomputed per slide so its shape always
  // matches that slide's image - the same no-crop technique used on the video hero.
  const [boxSize, setBoxSize] = useState(null);

  const goTo = useCallback((i) => {
    setIndex((i + SLIDES.length) % SLIDES.length);
  }, []);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (isPaused || SLIDES.length <= 1) return undefined;
    const timer = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return undefined;

    const recalc = () => {
      const ratio = SLIDES[index].ratio;
      const availableWidth = wrapper.clientWidth;
      const maxHeight = window.innerHeight * MAX_HEIGHT_RATIO;
      // Fit to whichever dimension runs out first, deriving the other from the
      // ratio - width and height are never set independently of each other.
      const width = Math.min(availableWidth, maxHeight * ratio);
      setBoxSize({ width, height: width / ratio });
    };

    recalc();
    const observer = new ResizeObserver(recalc);
    observer.observe(wrapper);
    window.addEventListener('resize', recalc);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', recalc);
    };
  }, [index]);

  return (
    <section className="w-full bg-[#FCFCFB] px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div ref={wrapperRef} className="w-full max-w-[1600px] mx-auto">
        <div
          className="relative mx-auto overflow-hidden rounded-2xl bg-black transition-[width,height] duration-500 ease-out"
          style={boxSize ? { width: boxSize.width, height: boxSize.height } : { width: '100%', aspectRatio: SLIDES[0].ratio }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {SLIDES.map((slide, i) => (
            <Link
              key={slide.image}
              to={slide.to}
              aria-label={slide.alt}
              aria-hidden={i !== index}
              tabIndex={i === index ? 0 : -1}
              className={`absolute inset-0 transition-opacity duration-500 ${
                i === index ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                loading={i === 0 ? 'eager' : 'lazy'}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {slide.overlay && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-4 pb-12 sm:pb-16">
                    <h2 className="text-white text-2xl sm:text-4xl font-serif font-light tracking-[0.2em] uppercase mb-5 drop-shadow-lg">
                      ZELORA
                    </h2>
                    <span className="bg-white text-[#1A1A1A] text-[11px] md:text-xs font-semibold tracking-[0.2em] uppercase px-7 py-3.5 hover:bg-[#D4AF37] transition-colors">
                      Shop Now
                    </span>
                  </div>
                </>
              )}
            </Link>
          ))}

          {/* Prev / Next */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/60 transition-colors"
          >
            <ChevronRight size={18} />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.image}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === index}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-6 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
