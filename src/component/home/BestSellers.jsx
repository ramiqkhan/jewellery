import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';

const BEST_SELLERS = [
  {
    id: 1,
    name: '18K Yellow Gold Diamond Solitaire Ring',
    price: 'PKR 185,000',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=600',
    tag: 'Bestseller'
  },
  {
    id: 2,
    name: 'Classic Diamond Tennis Bracelet in White Gold',
    price: 'PKR 340,000',
    image: 'https://images.unsplash.com/photo-1611591471171-a1314efea44d?auto=format&fit=crop&q=80&w=600',
    tag: 'New'
  },
  {
    id: 3,
    name: 'Akoya Cultured Pearl Drop Earrings',
    price: 'PKR 78,000',
    image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&q=80&w=600',
    tag: 'Exclusive'
  },
  {
    id: 4,
    name: 'Interlocking Gold Chain Necklace',
    price: 'PKR 145,000',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=600',
    tag: 'Limited'
  }
];

export default function BestSellers() {
  // Track liked items for the wishlist heart toggle
  const [wishlist, setWishlist] = useState({});

  const toggleWishlist = (id, e) => {
    e.stopPropagation();
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="bg-white border-y border-[#EAE6DF] py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-14">
          <div>
            <p className="text-[10px] uppercase font-semibold tracking-[0.35em] text-[#D4AF37] mb-2">Iconic Pieces</p>
            <h2 className="text-2xl md:text-3xl font-serif font-light tracking-[0.2em] text-[#1A1A1A] uppercase">
              The Bestsellers
            </h2>
          </div>
          <a 
            href="#" 
            className="mt-4 md:mt-0 text-xs tracking-[0.2em] font-medium uppercase border-b border-[#1A1A1A] pb-1 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors"
          >
            View All Masterpieces
          </a>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {BEST_SELLERS.map((product) => (
            <div key={product.id} className="group cursor-pointer flex flex-col">
              
              {/* Image Container with Hover Actions */}
              <div className="relative bg-[#F9F8F6] aspect-square overflow-hidden mb-4 border border-[#EAE6DF]">
                {/* Tag Badge */}
                <span className="absolute top-3 left-3 bg-[#1A1A1A] text-[#D4AF37] text-[9px] tracking-[0.2em] px-2.5 py-1 uppercase font-semibold z-10">
                  {product.tag}
                </span>

                {/* Wishlist Button */}
                <button 
                  onClick={(e) => toggleWishlist(product.id, e)}
                  className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-xs rounded-full text-gray-700 hover:text-black z-10 transition-colors shadow-sm"
                  aria-label="Save to Wishlist"
                >
                  <Heart 
                    size={16} 
                    className={wishlist[product.id] ? "fill-red-500 text-red-500" : "text-gray-700"} 
                  />
                </button>

                {/* Product Image */}
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Quick Action Slide-up Bar on Hover */}
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex space-x-2">
                  <button className="flex-1 bg-white text-[#1A1A1A] py-2 text-[10px] font-medium tracking-[0.2em] uppercase hover:bg-[#1A1A1A] hover:text-white transition-colors flex items-center justify-center space-x-1.5 shadow-md">
                    <ShoppingBag size={13} />
                    <span>Quick Add</span>
                  </button>
                  <button className="bg-white text-[#1A1A1A] p-2 hover:bg-[#1A1A1A] hover:text-white transition-colors shadow-md">
                    <Eye size={15} />
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="mt-1 flex flex-col flex-1 justify-between">
                <h3 className="text-xs font-serif font-normal tracking-wide text-[#1A1A1A] line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs font-semibold text-gray-900 mt-2 tracking-wide">
                  {product.price}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}