import React, { useEffect } from 'react';

export default function InstagramFeed() {
  const profileUrl = "https://www.instagram.com/zelora.officials";

  useEffect(() => {
    // Check if Behold script is already injected
    if (!window.__bhldScript) {
      window.__bhldScript = true;
      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://w.behold.so/widget.js";
      document.head.appendChild(script);
    }
  }, []);

  return (
    <section className="bg-white py-12 md:py-16 text-[#111111] border-t border-[#EAE6DF]">
      {/* Centered Minimal Header */}
      <div className="text-center mb-8 md:mb-10 px-4">
        <p className="text-[10px] md:text-xs uppercase font-medium tracking-[0.25em] text-gray-500 mb-1.5">
          FOLLOW US
        </p>
        <a 
          href={profileUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xl md:text-3xl font-extrabold uppercase tracking-[0.12em] text-[#111111] hover:text-[#D4AF37] transition-colors inline-block"
        >
          @ZELORA.OFFICIALS
        </a>
      </div>

      {/* Controlled Desktop Container */}
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <behold-widget feed-id="p14pe885DVkmWkHbApGS"></behold-widget>
      </div>
    </section>
  );
}