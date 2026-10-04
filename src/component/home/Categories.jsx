import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export default function FeaturedCollections() {
  const navigate = useNavigate();

  const handleCardClick = (path) => {
    navigate(path);
  };

  return (
    <section className="w-full bg-white py-16 md:py-24 text-[#111111] px-4 md:px-8 antialiased">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Side Container (Banner + 2 Column Cards) */}
        <div className="lg:col-span-7 flex flex-col gap-6">

          {/* Top Banner Box - Fully Clickable */}
          <div 
            onClick={() => handleCardClick('/shop')}
            className="bg-[#FAF9F6] border border-[#EAE6DF] p-8 md:p-10 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden group cursor-pointer hover:border-[#D4AF37] transition-all duration-300"
          >
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#D4AF37] font-semibold flex items-center gap-2 mb-2.5">
                <Sparkles size={12} className="text-[#D4AF37]" /> Bespoke Craftsmanship
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#111111] tracking-[0.15em] uppercase font-light leading-snug">
                Where Vision <span className="font-normal italic text-[#D4AF37]">Meets Perfection</span>
              </h2>
              <p className="text-xs text-gray-600 font-sans mt-3 max-w-md leading-relaxed tracking-wide">
                From concept to creation, we design timeless pieces that elevate confidence, style, and individuality.
              </p>
            </div>

            <div className="shrink-0 w-20 h-20 rounded-full border border-[#111111] group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black text-[#111111] flex flex-col items-center justify-center text-[9px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 text-center leading-tight shadow-xs">
              <span>SHOP</span>
              <span>NOW</span>
            </div>
          </div>

          {/* Bottom 2 Grid Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Card 1: Shop Pendants */}
            <Link
              to="/pendants"
              className="group relative bg-[#F5F5F3] border border-[#EAE6DF] rounded-2xl h-[360px] p-6 flex flex-col justify-end overflow-hidden hover:border-[#D4AF37] transition-all duration-500 cursor-pointer block"
            >
              <img
                src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800"
                alt="Shop Pendants"
                className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-95 group-hover:scale-[1.03] transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="relative z-10 flex items-end justify-between gap-4">
                <div>
                  <h3 className="text-xl font-serif uppercase tracking-wider text-white group-hover:text-[#D4AF37] transition-colors">
                    Shop Pendants
                  </h3>
                  <p className="text-[11px] text-gray-300 font-sans mt-1">
                    Elevate your look with bold statement pendants.
                  </p>
                </div>
                <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-full text-white group-hover:bg-[#D4AF37] group-hover:text-black transition-colors shrink-0">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </Link>

            {/* Card 2: Shop Bracelets */}
            <Link
              to="/bracelets"
              className="group relative bg-[#F5F5F3] border border-[#EAE6DF] rounded-2xl h-[360px] p-6 flex flex-col justify-end overflow-hidden hover:border-[#D4AF37] transition-all duration-500 cursor-pointer block"
            >
              <img
                src="https://images.unsplash.com/photo-1611591471171-a1314efea44d?auto=format&fit=crop&q=80&w=800"
                alt="Shop Bracelets"
                className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-95 group-hover:scale-[1.03] transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="relative z-10 flex items-end justify-between gap-4">
                <div>
                  <h3 className="text-xl font-serif uppercase tracking-wider text-white group-hover:text-[#D4AF37] transition-colors">
                    Shop Bracelets
                  </h3>
                  <p className="text-[11px] text-gray-300 font-sans mt-1">
                    Make every gesture shine with stylish pieces.
                  </p>
                </div>
                <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-full text-white group-hover:bg-[#D4AF37] group-hover:text-black transition-colors shrink-0">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </Link>

          </div>
        </div>

        {/* Right Side Tall Card: New Release */}
        <div className="lg:col-span-5">
          <Link
            to="/new-arrivals"
            className="group relative bg-[#F5F5F3] border border-[#EAE6DF] rounded-2xl h-[480px] lg:h-full min-h-[500px] p-8 flex flex-col justify-end overflow-hidden hover:border-[#D4AF37] transition-all duration-500 cursor-pointer block"
          >
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=1200"
              alt="New Release"
              className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-95 group-hover:scale-[1.03] transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

            <div className="relative z-10 flex items-end justify-between gap-4">
              <div>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold block mb-1">
                  Exclusive Drop
                </span>
                <h3 className="text-2xl md:text-3xl font-serif uppercase tracking-widest text-white group-hover:text-[#D4AF37] transition-colors">
                  New Release
                </h3>
                <p className="text-xs text-gray-300 font-sans mt-1.5 max-w-xs leading-relaxed">
                  Shop our latest arrivals to discover bold, unique, and meticulously crafted designs.
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