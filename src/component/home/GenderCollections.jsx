import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowUpRight } from 'lucide-react';

const GENDER_PRODUCTS = [
  // Men's Collection
  {
    id: 101,
    gender: 'men',
    name: 'Zelora Royal Oak Skeleton Automatic',
    originalPrice: 'Rs 890,000',
    price: 'Rs 850,000',
    discount: '-4%',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 102,
    gender: 'men',
    name: '18K Cuban Link Solid Gold Chain',
    originalPrice: 'Rs 420,000',
    price: 'Rs 385,000',
    discount: '-8%',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 103,
    gender: 'men',
    name: 'Cosmograph Onyx Chronograph Gold',
    originalPrice: 'Rs 650,000',
    price: 'Rs 620,000',
    discount: '-5%',
    image: 'https://images.unsplash.com/photo-1547996160-01ff74742fd0?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 104,
    gender: 'men',
    name: 'Black Diamond Signet Ring 18K',
    originalPrice: 'Rs 195,000',
    price: 'Rs 175,000',
    discount: '-10%',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=800',
  },

  // Women's Collection
  {
    id: 201,
    gender: 'women',
    name: 'Classic Diamond Tennis Bracelet',
    originalPrice: 'Rs 380,000',
    price: 'Rs 340,000',
    discount: '-10%',
    image: 'https://images.unsplash.com/photo-1611591471171-a1314efea44d?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 202,
    gender: 'women',
    name: '18K Gold Solitaire Diamond Ring',
    originalPrice: 'Rs 210,000',
    price: 'Rs 185,000',
    discount: '-12%',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 203,
    gender: 'women',
    name: 'Emerald Cut Diamond Pendant',
    originalPrice: 'Rs 290,000',
    price: 'Rs 260,000',
    discount: '-10%',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 204,
    gender: 'women',
    name: 'Rose Gold Petite Diamond Bangle',
    originalPrice: 'Rs 310,000',
    price: 'Rs 275,000',
    discount: '-11%',
    image: 'https://images.unsplash.com/photo-1547996160-01ff74742fd0?auto=format&fit=crop&q=80&w=800',
  },
];

export default function GenderProductDisplay() {
  const navigate = useNavigate();
  const [activeGender, setActiveGender] = useState('men');
  const [wishlist, setWishlist] = useState({});

  const toggleWishlist = (id, e) => {
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProducts = GENDER_PRODUCTS.filter(
    (item) => item.gender === activeGender
  );

  return (
    <section className="bg-white py-16 md:py-24 px-6 md:px-12 text-[#111111] antialiased">
      <div className="max-w-7xl mx-auto">
        
        {/* Simple Header & Gender Selector */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 pb-6 border-b border-[#EAE6DF] gap-6">
          <div>
            <p className="text-[10px] uppercase font-semibold tracking-[0.35em] text-[#D4AF37] mb-2">
              Curated Catalog
            </p>
            <h2 className="text-2xl md:text-3xl font-serif font-light tracking-[0.18em] uppercase text-[#111111]">
              {activeGender === 'men' ? "Men's Edition" : "Women's Edition"}
            </h2>
          </div>

          {/* Men / Women Switcher */}
          <div className="flex items-center gap-2 border border-[#EAE6DF] p-1 bg-[#FAF9F6]">
            <button
              onClick={() => setActiveGender('men')}
              className={`px-6 py-2 text-[10px] uppercase tracking-[0.25em] font-semibold transition-all duration-300 cursor-pointer ${
                activeGender === 'men'
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'text-gray-500 hover:text-[#111111]'
              }`}
            >
              Men's
            </button>
            <button
              onClick={() => setActiveGender('women')}
              className={`px-6 py-2 text-[10px] uppercase tracking-[0.25em] font-semibold transition-all duration-300 cursor-pointer ${
                activeGender === 'women'
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'text-gray-500 hover:text-[#111111]'
              }`}
            >
              Women's
            </button>
          </div>
        </div>

        {/* Clean Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="group cursor-pointer flex flex-col bg-white"
            >
              {/* Image Frame */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F3]">
                {product.discount && (
                  <span className="absolute top-3 left-3 bg-[#111111] text-white text-[9px] font-semibold tracking-wider px-2 py-0.5 z-10">
                    {product.discount}
                  </span>
                )}

                <button
                  onClick={(e) => toggleWishlist(product.id, e)}
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md rounded-full text-[#111111] hover:bg-white z-10 transition-colors cursor-pointer shadow-xs"
                  aria-label="Save to Wishlist"
                >
                  <Heart
                    size={14}
                    className={
                      wishlist[product.id]
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-500 hover:text-[#111111]'
                    }
                  />
                </button>

                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>

              {/* Minimal Product Details */}
              <div className="pt-3.5 flex flex-col justify-start">
                <h3 className="text-[11px] font-medium tracking-wider text-[#111111] uppercase line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                  {product.name}
                </h3>
                
                <div className="mt-1 flex items-center justify-between text-[12px]">
                  <div className="flex items-center gap-2">
                    {product.originalPrice && (
                      <span className="text-gray-400 line-through font-light">
                        {product.originalPrice}
                      </span>
                    )}
                    <span className="font-semibold text-[#111111]">
                      {product.price}
                    </span>
                  </div>

                  <span className="text-[9px] uppercase tracking-[0.15em] text-gray-400 group-hover:text-[#D4AF37] transition-colors flex items-center gap-0.5">
                    View <ArrowUpRight size={11} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}