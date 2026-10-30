import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, X, Check, Tag, AlertCircle, Loader2 } from 'lucide-react';
import { getProducts } from '../api';
import { useQuickAdd } from '../hooks/useQuickAdd';
import { formatPrice, getPricing } from '../utils/pricing';

export default function Deals() {
  const navigate = useNavigate();
  const quickAdd = useQuickAdd();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [wishlist, setWishlist] = useState({});
  const [addedToCart, setAddedToCart] = useState({});
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const load = () => {
    setLoading(true);
    setError('');
    // Fetch products from backend (adjust limit as needed)
    getProducts({ limit: 50 })
      .then((res) => {
        const allProducts = res.products || [];
        // Filter out only items that are on sale (using getPricing utility)
        const saleProducts = allProducts.filter((product) => getPricing(product).onSale);
        setProducts(saleProducts);
      })
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

  return (
    <main className="bg-[#FCFCFB] text-[#111111] min-h-screen py-10 md:py-16 px-4 sm:px-6 md:px-12 antialiased">
      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <div className="mb-10 pb-6 border-b border-[#EAE6DF] text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-[10px] uppercase font-semibold tracking-[0.35em] text-[#D4AF37] mb-2 flex items-center justify-center md:justify-start gap-1.5">
              <Tag size={12} /> Exclusive Offers
            </p>
            <h1 className="text-3xl md:text-4xl font-serif font-light tracking-[0.18em] uppercase text-[#111111]">
              Special Deals & Sale
            </h1>
          </div>
          <p className="text-xs text-gray-500 max-w-sm text-center md:text-right font-sans">
            Explore our curated selection of luxury timepieces and fine jewelry at exceptional value. Limited time offers.
          </p>
        </div>

        {/* Error State */}
        {error && (
          <div className="flex items-center gap-3 border border-red-200 bg-red-50 text-red-700 p-4 text-xs mb-10">
            <AlertCircle size={16} className="shrink-0" />
            <span className="flex-1">Could not load deals: {error}</span>
            <button onClick={load} className="shrink-0 border border-red-300 px-3 py-1.5 hover:bg-red-100 transition-colors">
              Retry
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="py-24 flex items-center justify-center text-gray-400">
            <Loader2 size={24} className="animate-spin" />
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="py-24 text-center border border-dashed border-[#EAE6DF] bg-white">
            <p className="text-sm text-gray-400 font-serif mb-4">No active deals right now. Check back soon.</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-[#111111] text-white text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-colors"
            >
              Return Home
            </button>
          </div>
        )}

        {/* Products Grid (2-Column Mobile, 4-Column Desktop) */}
        {!loading && products.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 sm:gap-x-6 gap-y-6 sm:gap-y-10 w-full items-stretch">
            {products.map((product) => {
              const pricing = getPricing(product);
              return (
                <div
                  key={product._id}
                  onClick={() => handleNavigateToProduct(product)}
                  className="group cursor-pointer flex flex-col justify-between bg-white w-full h-full min-w-0 border border-[#F2F0EB] p-2 sm:p-3 shadow-xs hover:shadow-md transition-shadow"
                >
                  <div className="w-full flex flex-col">
                    {/* Image Frame */}
                    <div className="relative aspect-[3/4] w-full min-h-[160px] overflow-hidden bg-[#F5F5F3]">
                      {/* Sale Badge */}
                      <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#111111] text-white text-[8px] sm:text-[9px] font-semibold tracking-wider px-1.5 sm:px-2 py-0.5 z-10 select-none">
                        -{pricing.percent}% OFF
                      </span>

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => toggleWishlist(product._id, e)}
                        className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1.5 sm:p-2 bg-white/90 backdrop-blur-md rounded-full text-[#111111] hover:bg-white z-10 transition-colors cursor-pointer shadow-xs"
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
                          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03] select-none"
                        />
                      ) : (
                        <div className="absolute inset-0 w-full h-full flex items-center justify-center text-[10px] uppercase tracking-widest text-gray-400">
                          No Image
                        </div>
                      )}

                      {/* Desktop Quick Action Drawer */}
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

                    {/* Product Title */}
                    <div className="pt-2.5 sm:pt-3.5 flex flex-col justify-start w-full min-w-0">
                      <h3 className="text-[10px] sm:text-[11px] font-medium tracking-wider text-[#111111] uppercase line-clamp-1 group-hover:text-[#D4AF37] transition-colors leading-tight">
                        {product.name}
                      </h3>
                    </div>
                  </div>

                  {/* Pricing Block */}
                  <div className="mt-2 flex items-center gap-2 text-[11px] sm:text-[12px] flex-wrap border-t border-gray-100 pt-2">
                    <span className="text-gray-400 line-through font-light text-[10px] sm:text-[11px]">
                      {formatPrice(pricing.originalPrice)}
                    </span>
                    <span className="font-semibold text-[#D4AF37]">{formatPrice(pricing.finalPrice)}</span>
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
          <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto md:overflow-hidden relative shadow-2xl flex flex-col md:flex-row border border-[#EAE6DF]">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 z-20 text-gray-500 hover:text-black bg-white/80 p-2 rounded-full cursor-pointer transition-colors"
              aria-label="Close modal"
            >
              <X size={16} />
            </button>

            <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-auto bg-[#F5F5F3] relative min-h-[220px]">
              {quickViewProduct.images?.[0] ? (
                <img
                  src={quickViewProduct.images[0].url}
                  alt={quickViewProduct.images[0].alt || quickViewProduct.name}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />
              ) : (
                <div className="absolute inset-0 w-full h-full flex items-center justify-center text-xs uppercase tracking-widest text-gray-400">
                  No Image
                </div>
              )}
            </div>

            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between bg-white">
              <div>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
                  -{getPricing(quickViewProduct).percent}% OFF SALE
                </span>
                <h3 className="text-lg font-serif text-[#111111] tracking-wider uppercase mt-1 mb-2">
                  {quickViewProduct.name}
                </h3>
                {quickViewProduct.description && (
                  <p className="text-[11px] text-gray-500 mb-4 leading-relaxed font-sans line-clamp-4">
                    {quickViewProduct.description}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-sm text-gray-400 line-through font-light">
                    {formatPrice(getPricing(quickViewProduct).originalPrice)}
                  </span>
                  <p className="text-base font-semibold text-[#D4AF37]">
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
    </main>
  );
}