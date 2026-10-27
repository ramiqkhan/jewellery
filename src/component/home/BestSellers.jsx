import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, X, Check, Watch, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { getProducts } from '../../api';
import { useQuickAdd } from '../../hooks/useQuickAdd';
import { formatPrice, getPricing } from '../../utils/pricing';

export default function BestSellers() {
  const navigate = useNavigate();
  const quickAdd = useQuickAdd();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [activeCategory, setActiveCategory] = useState('all');
  const [wishlist, setWishlist] = useState({});
  const [addedToCart, setAddedToCart] = useState({});
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const load = () => {
    setLoading(true);
    setError('');
    getProducts({ sort: 'newest', limit: 20 })
      .then((res) => setProducts(res.products || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const toggleWishlist = (id, e) => {
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    quickAdd(product);

    if (!(product.sizes?.length > 0)) {
      setAddedToCart((prev) => ({ ...prev, [product._id]: true }));
      setTimeout(() => {
        setAddedToCart((prev) => ({ ...prev, [product._id]: false }));
      }, 2000);
    }
  };

  const handleQuickView = (product, e) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleNavigateToProduct = (product) => {
    navigate(`/product/${product.slug || product._id}`);
  };

  const filteredProducts = products
    .filter((product) =>
      activeCategory === 'all'
        ? true
        : activeCategory === 'watches'
        ? product.category === 'watches'
        : product.category !== 'watches'
    )
    .slice(0, 4);

  return (
    <section className="bg-white py-16 md:py-20 px-4 sm:px-6 md:px-12 text-[#111111] relative overflow-hidden antialiased">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 pb-6 border-b border-[#F2F2F2] gap-6">
          <div>
            <p className="text-[10px] uppercase font-semibold tracking-[0.35em] text-[#D4AF37] mb-2 flex items-center gap-2">
              <Sparkles size={12} /> Curated Masterpieces
            </p>
            <h2 className="text-2xl md:text-3xl font-serif font-light tracking-[0.18em] text-[#111111] uppercase">
              The Bestsellers
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 sm:px-5 py-2 text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#111111] text-white'
                  : 'bg-[#F9F8F6] text-gray-600 hover:bg-[#111111] hover:text-white'
              }`}
            >
              All Masterpieces
            </button>
            <button
              onClick={() => setActiveCategory('watches')}
              className={`px-4 sm:px-5 py-2 text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                activeCategory === 'watches'
                  ? 'bg-[#111111] text-white'
                  : 'bg-[#F9F8F6] text-gray-600 hover:bg-[#111111] hover:text-white'
              }`}
            >
              <Watch size={12} className={activeCategory === 'watches' ? 'text-[#D4AF37]' : 'text-gray-400'} />
              <span>Timepieces</span>
            </button>
            <button
              onClick={() => setActiveCategory('jewellery')}
              className={`px-4 sm:px-5 py-2 text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === 'jewellery'
                  ? 'bg-[#111111] text-white'
                  : 'bg-[#F9F8F6] text-gray-600 hover:bg-[#111111] hover:text-white'
              }`}
            >
              Jewellery
            </button>
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

        {!loading && !error && filteredProducts.length === 0 && (
          <p className="py-16 text-center text-sm text-gray-400">No products available right now.</p>
        )}

        {/* Product Cards Grid: 2 Columns on Mobile */}
        {!loading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 sm:gap-x-6 gap-y-6 sm:gap-y-10">
            {filteredProducts.map((product) => {
              const pricing = getPricing(product);
              return (
              <div
                key={product._id}
                onClick={() => handleNavigateToProduct(product)}
                className="group cursor-pointer flex flex-col bg-white"
              >
                {/* Product Image Frame */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F3]">
                  {/* Badge */}
                  {(pricing.onSale || product.badge) && (
                    <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-[#111111] text-white text-[8px] sm:text-[9px] font-semibold tracking-wider px-1.5 sm:px-2 py-0.5 z-10">
                      {pricing.onSale ? `-${pricing.percent}%` : product.badge}
                    </span>
                  )}

                  {/* Wishlist Button */}
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

                  {/* Image */}
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

                  {/* Hover Quick Action Drawer (Desktop) */}
                  <div className="hidden sm:flex absolute inset-x-0 bottom-0 p-3 bg-white/95 backdrop-blur-md translate-y-full group-hover:translate-y-0 transition-transform duration-300 items-center gap-2 border-t border-[#EAE6DF]">
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="flex-1 bg-[#111111] text-white py-2.5 text-[9px] font-semibold tracking-[0.25em] uppercase hover:bg-[#D4AF37] hover:text-black transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      {addedToCart[product._id] ? (
                        <>
                          <Check size={12} />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={12} />
                          <span>{product.sizes?.length > 0 ? 'Select Size' : 'Add To Bag'}</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={(e) => handleQuickView(product, e)}
                      className="bg-[#F9F8F6] text-[#111111] p-2.5 hover:bg-[#D4AF37] hover:text-black transition-colors cursor-pointer"
                      title="Quick Preview"
                    >
                      <Eye size={13} />
                    </button>
                  </div>
                </div>

                {/* Product Info Block */}
                <div className="pt-2.5 sm:pt-3.5 flex flex-col justify-start">
                  <h3 className="text-[10px] sm:text-[11px] font-medium tracking-wider text-[#111111] uppercase line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                    {product.name}
                  </h3>

                  <div className="mt-1 flex items-center gap-2 text-[11px] sm:text-[12px]">
                    {pricing.onSale && (
                      <span className="text-gray-400 line-through font-light text-[10px] sm:text-[11px]">
                        {formatPrice(pricing.originalPrice)}
                      </span>
                    )}
                    <span className="font-semibold text-[#111111]">{formatPrice(pricing.finalPrice)}</span>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl overflow-hidden relative shadow-2xl flex flex-col md:flex-row border border-[#EAE6DF]">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 z-20 text-gray-500 hover:text-black bg-white/80 p-2 rounded-full cursor-pointer transition-colors"
            >
              <X size={16} />
            </button>

            <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-[#F5F5F3] relative">
              {quickViewProduct.images?.[0] ? (
                <img
                  src={quickViewProduct.images[0].url}
                  alt={quickViewProduct.images[0].alt || quickViewProduct.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs uppercase tracking-widest text-gray-400">
                  No Image
                </div>
              )}
            </div>

            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between bg-white">
              <div>
                {(getPricing(quickViewProduct).onSale || quickViewProduct.badge) && (
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
                    {getPricing(quickViewProduct).onSale
                      ? `-${getPricing(quickViewProduct).percent}% OFF`
                      : quickViewProduct.badge}
                  </span>
                )}
                <h3 className="text-lg font-serif text-[#111111] tracking-wider uppercase mt-1 mb-2">
                  {quickViewProduct.name}
                </h3>
                {quickViewProduct.description && (
                  <p className="text-[11px] text-gray-500 mb-4 leading-relaxed font-sans">
                    {quickViewProduct.description}
                  </p>
                )}
                {quickViewProduct.specifications?.length > 0 && (
                  <div className="bg-[#F9F8F6] p-3 text-[10px] text-gray-600 tracking-wider mb-6 border-l-2 border-[#D4AF37]">
                    {quickViewProduct.specifications.slice(0, 3).join(' • ')}
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-baseline gap-2 mb-4">
                  {getPricing(quickViewProduct).onSale && (
                    <span className="text-sm text-gray-400 line-through font-light">
                      {formatPrice(getPricing(quickViewProduct).originalPrice)}
                    </span>
                  )}
                  <p className="text-base font-semibold text-[#111111]">
                    {formatPrice(getPricing(quickViewProduct).finalPrice)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => handleAddToCart(quickViewProduct, e)}
                    className="flex-1 bg-[#111111] text-white py-3 text-[9px] font-semibold tracking-[0.25em] uppercase hover:bg-[#D4AF37] hover:text-black transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag size={13} />
                    <span>
                      {addedToCart[quickViewProduct._id]
                        ? 'Added to Bag'
                        : quickViewProduct.sizes?.length > 0
                        ? 'Select Size'
                        : 'Add to Bag'}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setQuickViewProduct(null);
                      handleNavigateToProduct(quickViewProduct);
                    }}
                    className="px-4 py-3 bg-[#F9F8F6] text-[#111111] text-[9px] font-semibold tracking-[0.2em] uppercase hover:bg-[#111111] hover:text-white transition-colors cursor-pointer"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}