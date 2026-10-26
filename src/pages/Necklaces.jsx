import React from 'react';
import { Heart, ShoppingBag, Eye, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const formatPrice = (value) => `PKR ${Number(value || 0).toLocaleString()}`;

export default function ProductGridSection({
  loading,
  error,
  reload,
  products = [],
  pagination,
  page,
  setPage,
  wishlist = {},
  toggleWishlist,
  quickAdd,
  resourceLabel = "piece",
  emptyLabel = "No products found.",
  gridClassName,
}) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="py-16 flex items-center justify-center text-gray-400">
        <Loader2 size={22} className="animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center gap-3 border border-red-200 bg-red-50 text-red-700 p-4 text-xs mb-10">
        <AlertCircle size={16} className="shrink-0" />
        <span className="flex-1">{error}</span>
        <button onClick={reload} className="shrink-0 border border-red-300 px-3 py-1.5 hover:bg-red-100 transition-colors">
          Retry
        </button>
      </div>
    );
  }

  if (!products.length) {
    return <p className="py-16 text-center text-sm text-gray-400">{emptyLabel}</p>;
  }

  return (
    <div>
      {/* 2 Columns on Mobile, 2 on SM, 4 on LG */}
      <div className={gridClassName || "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-3 sm:gap-x-6 gap-y-6 sm:gap-y-10"}>
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() => navigate(`/product/${product.slug || product._id}`)}
            className="group cursor-pointer flex flex-col bg-white w-full"
          >
            {/* Aspect Ratio Box */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F5F5F3]">
              {product.badge && (
                <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-[#111111] text-white text-[8px] sm:text-[9px] font-semibold tracking-wider px-1.5 sm:px-2 py-0.5 z-10">
                  {product.badge}
                </span>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product._id);
                }}
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

            {/* Info */}
            <div className="pt-2.5 sm:pt-3.5 flex flex-col justify-start">
              <h3 className="text-[10px] sm:text-[11px] font-medium tracking-wider text-[#111111] uppercase line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                {product.name}
              </h3>
              <div className="mt-1 flex items-center gap-2 text-[11px] sm:text-[12px]">
                <span className="font-semibold text-[#111111]">
                  {formatPrice(product.price)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}