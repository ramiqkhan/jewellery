import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function FeaturedCollections() {
  return (
    <section className="w-full bg-[#0B0B0B] py-12 md:py-20 text-white px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Side Container (Banner + 2 Column Cards) */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          
          {/* Top Banner Box */}
          <div className="bg-[#111111] border border-white/10 p-8 md:p-10 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden group">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif text-white tracking-wide uppercase font-light">
                We Build What Others Dream
              </h2>
              <p className="text-xs text-gray-400 font-serif mt-2 max-w-md leading-relaxed">
                From concept to creation, we design pieces that elevate confidence, style, and individuality.
              </p>
            </div>

            <Link
              to="/shop"
              className="shrink-0 w-20 h-20 rounded-full border border-white/30 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black flex flex-col items-center justify-center text-[9px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 text-center leading-tight group/btn"
            >
              <span>SHOP</span>
              <span>NOW</span>
            </Link>
          </div>

          {/* Bottom 2 Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Card 1: Shop Pendants */}
            <Link
              to="/pendants"
              className="group relative bg-[#111111] border border-white/10 rounded-2xl h-[340px] p-6 flex flex-col justify-end overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-500"
            >
              <img
                src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800"
                alt="Shop Pendants"
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <div className="relative z-10 flex items-end justify-between gap-4">
                <div>
                  <h3 className="text-xl font-serif uppercase tracking-wider text-white group-hover:text-[#D4AF37] transition-colors">
                    Shop Pendants
                  </h3>
                  <p className="text-[11px] text-gray-400 font-serif mt-1">
                    Elevate your look with bold statement pendants.
                  </p>
                </div>
                <div className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white group-hover:bg-[#D4AF37] group-hover:text-black transition-colors shrink-0">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </Link>

            {/* Card 2: Shop Bracelets / Rings */}
            <Link
              to="/bracelets"
              className="group relative bg-[#111111] border border-white/10 rounded-2xl h-[340px] p-6 flex flex-col justify-end overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-500"
            >
              <img
                src="https://images.unsplash.com/photo-1611591471171-a1314efea44d?auto=format&fit=crop&q=80&w=800"
                alt="Shop Bracelets"
                className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-75 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

              <div className="relative z-10 flex items-end justify-between gap-4">
                <div>
                  <h3 className="text-xl font-serif uppercase tracking-wider text-white group-hover:text-[#D4AF37] transition-colors">
                    Shop Bracelets
                  </h3>
                  <p className="text-[11px] text-gray-400 font-serif mt-1">
                    Make every gesture shine with stylish pieces effortlessly.
                  </p>
                </div>
                <div className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white group-hover:bg-[#D4AF37] group-hover:text-black transition-colors shrink-0">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </Link>

          </div>
        </div>

        {/* Right Side Tall Card: New Release Lifestyle Shot */}
        <div className="lg:col-span-5">
          <Link
            to="/new-arrivals"
            className="group relative bg-[#111111] border border-white/10 rounded-2xl h-[480px] lg:h-full min-h-[480px] p-8 flex flex-col justify-end overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-500 block"
          >
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200"
              alt="New Release"
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            <div className="relative z-10 flex items-end justify-between gap-4">
              <div>
                <h3 className="text-2xl font-serif uppercase tracking-widest text-white group-hover:text-[#D4AF37] transition-colors">
                  New Release
                </h3>
                <p className="text-xs text-gray-300 font-serif mt-1 max-w-xs leading-relaxed">
                  Shop our latest arrivals to discover bold, unique, and stylish pieces.
                </p>
              </div>
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white group-hover:bg-[#D4AF37] group-hover:text-black transition-colors shrink-0">
                <ArrowUpRight size={22} />
              </div>
            </div>
          </Link>
        </div>

      </div>
    </section>
  );
}