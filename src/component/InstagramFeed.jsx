import React, { useEffect, useRef, useState } from 'react';
import { getJson } from '../api';

function InstagramIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const FALLBACK_PROFILE = { handle: '@zelora.officials', url: 'https://www.instagram.com/zelora.officials' };

// Behold widget: only used until posts are added from the dashboard
function BeholdWidget() {
  useEffect(() => {
    // Check if Behold script is already injected
    if (!window.__bhldScript) {
      window.__bhldScript = true;
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://w.behold.so/widget.js';
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8">
      <behold-widget feed-id="p14pe885DVkmWkHbApGS"></behold-widget>
    </div>
  );
}

// One tile: the whole picture is a link to the Instagram post (the link itself is never shown)
function PostTile({ post }) {
  const isVideo = post.media.type === 'video';
  const videoRef = useRef(null);

  // Only decode/play a video while it's actually on screen - with many tiles in the
  // strip, having every video playing at once (even offscreen ones) is what makes
  // the scroll stutter. Pausing offscreen video frees that up for the one scroll animation.
  useEffect(() => {
    if (!isVideo) return undefined;
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.15 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [isVideo]);

  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={post.caption ? `Open Instagram post: ${post.caption}` : 'Open Instagram post'}
      className="group relative block shrink-0 w-[60vw] sm:w-[240px] md:w-[290px] aspect-[3/4] overflow-hidden bg-[#F3F1EC]"
    >
      {isVideo ? (
        <video
          ref={videoRef}
          src={post.media.url}
          poster={post.posterUrl}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
      ) : (
        <img src={post.media.url} alt={post.caption || 'Instagram post'} loading="lazy" className="h-full w-full object-cover" />
      )}

      {/* Hover: fade to white with the Instagram icon and caption */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/0 opacity-0 transition duration-300 group-hover:bg-white/85 group-hover:opacity-100">
        <span className="text-[#111111]">
          <InstagramIcon />
        </span>
        {post.caption && (
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-[90%] truncate bg-white px-3 py-1 text-xs text-[#111111] shadow-sm">
            {post.caption}
          </span>
        )}
      </div>
    </a>
  );
}

export default function InstagramFeed() {
  const [data, setData] = useState(null); // { profile, posts } once loaded
  const containerRef = useRef(null);
  const setRef = useRef(null); // spans just one copy of the posts, used to measure its real width
  const [repeatCount, setRepeatCount] = useState(2);

  useEffect(() => {
    let cancelled = false;
    getJson('/instagram?limit=20')
      .then((result) => !cancelled && setData(result))
      .catch(() => !cancelled && setData({ profile: null, posts: [] }));
    return () => {
      cancelled = true;
    };
  }, []);

  const profile = data?.profile?.handle ? data.profile : FALLBACK_PROFILE;
  const posts = data?.posts ?? [];

  // The strip is duplicated so the scroll can loop without a visible seam, but a
  // fixed 2 copies only covers the screen when there are enough posts to fill it
  // twice over. With few posts (or a very wide screen), the duplicated content
  // runs out partway through the loop and the rest of the row goes blank - which
  // is the empty space on the right. Keep enough copies on hand to always cover it.
  useEffect(() => {
    if (!posts.length) return undefined;
    const container = containerRef.current;
    const setEl = setRef.current;
    if (!container || !setEl) return undefined;

    const recalc = () => {
      const setWidth = setEl.scrollWidth;
      const containerWidth = container.clientWidth;
      if (!setWidth || !containerWidth) return;
      // Keep at least 2 full container-widths of content ahead of the viewport at all times
      const needed = Math.ceil((containerWidth * 2) / setWidth) + 1;
      setRepeatCount(Math.min(Math.max(needed, 2), 12));
    };

    recalc();

    if (typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(recalc);
    observer.observe(container);
    observer.observe(setEl);
    return () => observer.disconnect();
  }, [posts.length]);

  const shiftPercent = 100 / repeatCount;

  return (
    <section className="bg-white py-12 md:py-16 text-[#111111] border-t border-[#EAE6DF]">
      {/* Centered Minimal Header */}
      <div className="text-center mb-8 md:mb-10 px-4">
        <p className="text-[10px] md:text-xs uppercase font-medium tracking-[0.25em] text-gray-500 mb-1.5">
          FOLLOW US
        </p>
        <a
          href={profile.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl md:text-3xl font-extrabold uppercase tracking-[0.12em] text-[#111111] hover:text-[#D4AF37] transition-colors inline-block"
        >
          {profile.handle}
        </a>
      </div>

      {data === null ? (
        <div className="h-[300px]" />
      ) : posts.length ? (
        <div ref={containerRef} className="overflow-hidden">
          <style>{`
            @keyframes insta-scroll {
              from { transform: translate3d(0, 0, 0); }
              to { transform: translate3d(var(--insta-shift), 0, 0); }
            }
            .insta-track {
              animation: insta-scroll var(--insta-duration) linear infinite;
              /* Promotes the track to its own GPU compositor layer so the browser can
                 slide it without re-painting on every frame - this is what actually
                 keeps the scroll buttery instead of stuttering under load. */
              will-change: transform;
              backface-visibility: hidden;
              -webkit-backface-visibility: hidden;
            }
            .insta-track:hover { animation-play-state: paused; }
            @media (prefers-reduced-motion: reduce) { .insta-track { animation: none; } }
          `}</style>
          <div
            className="insta-track flex w-max gap-2.5"
            style={{
              // One cycle always slides by exactly one set's width (-insta-shift),
              // regardless of how many extra copies are rendered for coverage -
              // so duration only needs to scale with the post count, not repeatCount.
              '--insta-duration': `${Math.max(posts.length * 6, 20)}s`,
              '--insta-shift': `-${shiftPercent}%`,
            }}
          >
            {Array.from({ length: repeatCount }).map((_, setIndex) => (
              <div
                key={setIndex}
                ref={setIndex === 0 ? setRef : undefined}
                className="flex gap-2.5 shrink-0"
              >
                {posts.map((post) => (
                  <PostTile key={`${setIndex}-${post._id}`} post={post} />
                ))}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <BeholdWidget />
      )}
    </section>
  );
}
