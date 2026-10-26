import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Heart, ArrowUpRight, AlertCircle, Loader2 } from 'lucide-react';
import { getProducts } from '../../api';
import { formatPrice, getPricing } from '../../utils/pricing';

const GENDERS = [
  { value: 'men', label: "Men's" },
  { value: 'women', label: "Women's" },
];

export default function GenderCollections() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Read active gender from URL parameter (defaulting to 'men' if unassigned)
  const currentGenderParam = searchParams.get('gender');
  const activeGender = currentGenderParam === 'women' ? 'women' : 'men';

  const [wishlist, setWishlist] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    setError('');
    getProducts({ gender: activeGender, sort: 'newest', limit: 4 })
      .then((res) => setProducts(res.products || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, [activeGender]);

  // Update URL parameter when user clicks a switcher button
  const handleGenderChange = (genderValue) => {
    setSearchParams({ gender: genderValue });
  };

  const toggleWishlist = (id, e) => {
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const goToProduct = (product) => navigate(`/product/${product.slug || product._id}`);

  return (
    <section 
      id="gender-collections" 
      className="bg-white py-12 md:py-24 px-4 sm:px-6 md:px-12 text-[#111111] antialiased scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header & Gender Switcher */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 md:mb-10 pb-6 border-b border-[#EAE6DF] gap-4">
          <div>
            <p className="text-[10px] uppercase font-semibold tracking-[0.35em] text-[#D4AF37] mb-2">
              Curated Catalog
            </p>
            <h2 className="text-2xl md:text-3xl font-serif font-light tracking-[0.18em] uppercase text-[#111111]">
              {activeGender === 'men' ? "Men's Edition" : "Women's Edition"}
            </h2>
          </div>

          {/* Switcher Connected to URL Parameters */}
          <div className="flex items-center gap-2 border border-[#EAE6DF] p-1 bg-[#FAF9F6] w-full sm:w-auto">
            {GENDERS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => handleGenderChange(value)}
                className={`flex-1 sm:flex-initial px-6 py-2 text-[10px] uppercase tracking-[0.25em] font-semibold transition-all duration-300 cursor-pointer ${
                  activeGender === value
                    ? 'bg-[#111111] text-white shadow-xs'
                    : 'text-gray-500 hover:text-[#111111]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-3 border border-red-200 bg-red-50 text-red-700 p-4 text-xs mb-10">
            <AlertCircle size={16} className="shrink-0" />
            <span className="flex-1">Could not load products from the backend: {error}</span>
            <button onClick={load} className="shrink-0 border border-red-300 px-3 py-1.5 hover:bg-red-100 transition-colors">
              Retry
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="py-16 flex items-center justify-center text-gray-400">
            <Loader2 size={22} className="animate-spin" />
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="py-16 text-center text-sm text-gray-400">
            No {activeGender === 'men' ? "men's" : "women's"} pieces available right now.
          </p>
        )}

        {/* 2-Column Mobile Grid Layout */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 sm:gap-x-6 gap-y-6 sm:gap-y-10">
            {products.map((product) => {
              const pricing = getPricing(product);
              return (
                <div
                  key={product._id}
                  onClick={() => goToProduct(product)}
                  className="group cursor-pointer flex flex-col bg-white"
                >
                  {/* Image Frame */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F3]">
                    {(pricing.onSale || product.badge) && (
                      <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-[#111111] text-white text-[8px] sm:text-[9px] font-semibold tracking-wider px-1.5 sm:px-2 py-0.5 z-10">
                        {pricing.onSale ? `-${pricing.percent}%` : product.badge}
                      </span>
                    )}

                    <button
                      onClick={(e) => toggleWishlist(product._id, e)}
                      className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 p-1.5 sm:p-2 bg-white/90 backdrop-blur-md rounded-full text-[#111111] hover:bg-white z-10 transition-colors cursor-pointer shadow-xs"
                      aria-label="Save to Wishlist"
                    >
                      <Heart
                        size={13}
                        className={
                          wishlist[product._id]
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-500 hover:text-[#111111]'
                        }
                      />
                    </button>

                    {product.images?.[0] ? (
                      <img
                        src={product.images[0].url}
                        alt={product.images[0].alt || product.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] uppercase tracking-widest text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Minimal Product Details */}
                  <div className="pt-2.5 sm:pt-3.5 flex flex-col justify-start">
                    <h3 className="text-[10px] sm:text-[11px] font-medium tracking-wider text-[#111111] uppercase line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                      {product.name}
                    </h3>

                    <div className="mt-1 flex items-center justify-between text-[11px] sm:text-[12px]">
                      <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                        {pricing.onSale && (
                          <span className="text-gray-400 line-through font-light text-[10px] sm:text-[11px]">
                            {formatPrice(pricing.originalPrice)}
                          </span>
                        )}
                        <span className="font-semibold text-[#111111]">
                          {formatPrice(pricing.finalPrice)}
                        </span>
                      </div>

                      <span className="hidden sm:flex text-[9px] uppercase tracking-[0.15em] text-gray-400 group-hover:text-[#D4AF37] transition-colors items-center gap-0.5">
                        View <ArrowUpRight size={11} />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}