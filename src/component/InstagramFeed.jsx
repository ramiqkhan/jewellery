import React, { useEffect, useState } from 'react';
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
          src={post.media.url}
          poster={post.posterUrl}
          muted
          loop
          autoPlay
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
  // The strip is drawn twice so the scroll loops without a gap
  const loop = [...posts, ...posts];

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
        <div className="overflow-hidden">
          <style>{`
            @keyframes insta-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
            .insta-track { animation: insta-scroll var(--insta-duration) linear infinite; }
            .insta-track:hover { animation-play-state: paused; }
            @media (prefers-reduced-motion: reduce) { .insta-track { animation: none; } }
          `}</style>
          <div
            className="insta-track flex w-max gap-2.5"
            style={{ '--insta-duration': `${Math.max(posts.length * 6, 20)}s` }}
          >
            {loop.map((post, index) => (
              <PostTile key={`${post._id}-${index}`} post={post} />
            ))}
          </div>
        </div>
      ) : (
        <BeholdWidget />
      )}
    </section>
  );
}
