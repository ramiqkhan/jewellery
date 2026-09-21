import React from 'react';
import { Link } from 'react-router-dom';

const FEATURED_COLLECTIONS = [
  {
    title: 'SHOP COLLECTION',
    to: '/shop',
    // subtitle: 'Timeless Masterpieces',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'SHOP NEW RELEASES',
    to: '/new-arrivals',
    // subtitle: 'Latest Arrivals',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'SHOP 80S COLLECTION',
    to: '/80s-collection',
    // subtitle: 'Vintage Inspired',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=900',
  },
  {
    title: 'SHOP BRIDAL SETS',
    to: '/bridal',
    // subtitle: 'For Everlasting Moments',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=900',
  },
];

export default function Categories() {
  return (
    <section className="w-full bg-[#111111] py-16 md:py-24 text-white overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <p className="text-[10px] uppercase font-semibold tracking-[0.35em] text-[#D4AF37] mb-2">
          Curated Selection
        </p>
        <h2 className="text-2xl md:text-3xl font-serif font-light tracking-[0.2em] uppercase text-white">
          Explore Our Lineups
        </h2>
        <div className="w-10 h-[1px] bg-[#D4AF37] mx-auto mt-4" />
      </div>

      {/* Full-Width 4 Column Edge-to-Edge Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[#222222]">
        {FEATURED_COLLECTIONS.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="group relative block w-full h-[60vh] md:h-[65vh] overflow-hidden bg-[#0A0A0A]"
          >
            {/* Background Image with Cinematic Zoom */}
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover opacity-70 transition-transform duration-1000 ease-out group-hover:scale-105 group-hover:opacity-90"
            />

            {/* Luxurious Multi-layered Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/90 transition-all duration-500" />

            {/* Subtle Inner Gold Accent Border on Hover */}
            <div className="absolute inset-4 border border-white/0 group-hover:border-[#D4AF37]/50 transition-all duration-500 pointer-events-none" />

            {/* Center-Aligned Typography Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] mb-2 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 font-medium">
                {item.subtitle}
              </span>
              
              <h3 className="text-white text-xs md:text-sm font-semibold tracking-[0.25em] uppercase drop-shadow-md border-b border-white/40 group-hover:border-[#D4AF37] pb-1.5 transition-all">
                {item.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}