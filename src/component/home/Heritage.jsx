import React from 'react';

export default function Heritage() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24 text-center">
      <p className="text-[10px] uppercase font-semibold tracking-[0.3em] text-gray-400">Our Heritage</p>
      <h2 className="text-2xl md:text-4xl font-serif font-light tracking-[0.15em] uppercase my-4">
        Crafted For Everlasting Moments
      </h2>
      <p className="text-gray-600 text-xs md:text-sm tracking-wide leading-relaxed max-w-2xl mx-auto font-serif">
        Every gemstone in our studio is hand-selected for exceptional brilliance, set in sustainably sourced precious metals designed to be passed down through generations.
      </p>
      <button className="mt-8 bg-[#1A1A1A] text-white px-8 py-3.5 text-[11px] font-medium tracking-[0.25em] uppercase hover:bg-[#333] transition-colors">
        Discover Our Story
      </button>
    </section>
  );
}