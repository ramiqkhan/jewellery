import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';

const formatPrice = (value) => `PKR ${Number(value || 0).toLocaleString()}`;

const isOutOfStock = (product) =>
  product.sizes?.length > 0
    ? product.sizes.every((size) => (size.stock ?? 0) <= 0)
    : (product.stock ?? 0) <= 0;

// One product tile for a backend-driven grid: image, badge, wishlist heart,
// quick add, name, category and price. Used by every /…-collection page.
export default function ProductCard({ product, isWishlisted, onToggleWishlist, onQuickAdd }) {
  const href = `/product/${product.slug || product._id}`;
  const image = product.images?.[0];
  const outOfStock = isOutOfStock(product);

  return (
    <article className="group flex flex-col">
      <div className="relative bg-[#F9F8F6] aspect-square overflow-hidden mb-4 border border-[#EAE6DF]">
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#1A1A1A] text-[#D4AF37] text-[9px] tracking-[0.2em] px-2.5 py-1 uppercase font-semibold z-10 pointer-events-none">
            {product.badge}
          </span>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleWishlist(product._id);
          }}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:text-black z-20 transition-colors shadow-sm cursor-pointer"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          aria-pressed={isWishlisted}
        >
          <Heart size={16} className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-700'} />
        </button>

        <Link to={href} className="block w-full h-full">
          {image ? (
            <img
              src={image.url}
              alt={image.alt || product.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[10px] uppercase tracking-widest text-gray-400">
              No Image
            </div>
          )}
        </Link>

        {outOfStock ? (
          <div className="absolute bottom-0 inset-x-0 bg-gray-700/90 text-white text-[10px] uppercase font-bold tracking-[0.2em] py-3 text-center z-10">
            Out of Stock
          </div>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onQuickAdd(product);
            }}
            className="absolute bottom-0 inset-x-0 bg-black/90 text-white text-[10px] uppercase font-bold tracking-[0.2em] py-3 flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10 hover:bg-[#D4AF37] cursor-pointer"
          >
            <ShoppingBag size={14} />
            <span>{product.sizes?.length > 0 ? 'Select Size' : 'Quick Add'}</span>
          </button>
        )}
      </div>

      <Link to={href} className="block">
        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">{product.category}</p>
        <h2 className="text-xs font-serif tracking-wide leading-relaxed group-hover:text-[#D4AF37] transition-colors">
          {product.name}
        </h2>
        <p className="text-xs font-semibold tracking-wide mt-2">{formatPrice(product.price)}</p>
      </Link>
    </article>
  );
}
