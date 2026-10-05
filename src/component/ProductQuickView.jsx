import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag } from 'lucide-react';

const formatPrice = (value) => Number(value || 0).toLocaleString();

// Lightweight preview opened by the eye icon on a ProductCard - image, name,
// price and an add-to-bag action, without leaving the grid.
export default function ProductQuickView({ product, outOfStock, onAddToCart, onClose }) {
  const href = `/product/${product.slug || product._id}`;
  const image = product.images?.[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg overflow-hidden relative shadow-2xl flex flex-col sm:flex-row border border-[#EAE6DF]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 text-gray-500 hover:text-black bg-white/80 p-1.5 rounded-full transition-colors"
          aria-label="Close quick view"
        >
          <X size={16} />
        </button>

        <div className="w-full sm:w-1/2 aspect-square bg-[#F4F2EE] shrink-0">
          {image ? (
            <img src={image.url} alt={image.alt || product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[10px] uppercase tracking-widest text-gray-400">
              No Image
            </div>
          )}
        </div>

        <div className="w-full sm:w-1/2 p-6 flex flex-col justify-between">
          <div>
            {product.badge && (
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
                {product.badge}
              </span>
            )}
            <h3 className="text-base font-serif uppercase tracking-wide text-[#1A1A1A] mt-1 mb-2">
              {product.name}
            </h3>
            {product.description && (
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-4">{product.description}</p>
            )}
          </div>

          <div className="mt-6">
            <p className="text-lg font-semibold text-[#1A1A1A] mb-4">PKR {formatPrice(product.price)}</p>
            <div className="flex gap-2">
              <button
                onClick={onAddToCart}
                disabled={outOfStock}
                className="flex-1 bg-[#1A1A1A] text-white py-3 text-[10px] font-semibold tracking-[0.2em] uppercase hover:bg-[#D4AF37] hover:text-black transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ShoppingBag size={14} />
                <span>{outOfStock ? 'Out of Stock' : product.sizes?.length > 0 ? 'Select Size' : 'Add to Bag'}</span>
              </button>
              <Link
                to={href}
                onClick={onClose}
                className="px-4 py-3 bg-[#F4F2EE] text-[#1A1A1A] text-[10px] font-semibold tracking-[0.2em] uppercase hover:bg-[#1A1A1A] hover:text-white transition-colors flex items-center justify-center"
              >
                Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
