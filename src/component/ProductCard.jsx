import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ImageOff, Eye } from 'lucide-react';
import ProductQuickView from './ProductQuickView';

const formatPrice = (value) => Number(value || 0).toLocaleString();

const isOutOfStock = (product) =>
  product.sizes?.length > 0
    ? product.sizes.every((size) => (size.stock ?? 0) <= 0)
    : (product.stock ?? 0) <= 0;

// A bare number (e.g. a stray "22") reads as broken data, not a promo label -
// only show the ribbon when it actually looks like one.
const isDisplayableBadge = (badge) => !!badge && !/^\d+$/.test(badge.trim());

// Circular white icon button used in the desktop hover overlay (quick view / add to bag)
function IconButton({ onClick, disabled, label, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="w-10 h-10 rounded-full bg-white text-[#1A1A1A] flex items-center justify-center shadow-md hover:bg-[#D4AF37] transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white"
    >
      {children}
    </button>
  );
}

// One product tile for a backend-driven grid: discount/promo badge, a
// persistent wishlist heart, a hover overlay (quick view / add to bag) for
// desktop, and an always-visible Quick Buy button for touch devices, since
// there's no hover on mobile to reveal anything. Used by every /…-collection page.
export default function ProductCard({ product, isWishlisted, onToggleWishlist, onQuickAdd }) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const href = `/product/${product.slug || product._id}`;
  const image = product.images?.[0];
  const outOfStock = isOutOfStock(product);
  const lowStock = !outOfStock && (product.sizes?.length
    ? Math.min(...product.sizes.map((s) => s.stock ?? 0)) <= 3
    : (product.stock ?? 0) <= 3);

  // Supports a future "compareAtPrice" field if one is ever added to the backend;
  // today's Product schema only has `price`, so this quietly does nothing yet.
  const compareAtPrice = product.compareAtPrice;
  const hasDiscount = compareAtPrice > product.price;
  const discountPercent = hasDiscount ? Math.round(100 - (product.price / compareAtPrice) * 100) : null;

  const quickBuyLabel = product.sizes?.length > 0 ? 'Select size' : 'Quick buy';

  return (
    <>
      <article className="group flex flex-col">
        <div className="relative bg-[#F4F2EE] aspect-square overflow-hidden rounded-lg mb-5 border border-[#EAE6DF] shadow-sm transition-all duration-300 group-hover:shadow-[0_18px_40px_-16px_rgba(26,26,26,0.35)] group-hover:border-[#D4AF37]/60">
          {(discountPercent || isDisplayableBadge(product.badge)) && (
            <span className="absolute top-3 left-3 bg-[#1A1A1A] text-[#D4AF37] text-[9px] font-semibold tracking-[0.15em] uppercase px-2.5 py-1.5 rounded-sm z-10 pointer-events-none shadow-sm">
              {discountPercent ? `-${discountPercent}%` : product.badge}
            </span>
          )}

          {/* Wishlist: always visible, since touch devices can't hover to reveal it */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleWishlist(product._id);
            }}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
            aria-pressed={isWishlisted}
            className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm border border-[#EAE6DF] flex items-center justify-center shadow-sm hover:border-[#D4AF37] transition-colors"
          >
            <Heart size={15} className={isWishlisted ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-[#1A1A1A]'} />
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
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-300">
                <ImageOff size={22} strokeWidth={1.25} />
                <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400">Image Coming Soon</span>
              </div>
            )}
          </Link>

          {/* Soft wash so the white icon buttons stay legible over any photo */}
          <div className="absolute inset-0 bg-black/0 sm:group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />

          {/* Desktop hover overlay: quick view / add to bag. Hidden below sm - mobile gets
              the persistent Quick Buy button instead, since it can't hover to reveal this. */}
          <div className="hidden sm:flex absolute inset-0 items-center justify-center gap-2.5 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 z-20">
            <IconButton
              label="Quick view"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setQuickViewOpen(true);
              }}
            >
              <Eye size={15} />
            </IconButton>

            <IconButton
              label={quickBuyLabel}
              disabled={outOfStock}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickAdd(product);
              }}
            >
              <ShoppingBag size={15} />
            </IconButton>
          </div>

          {/* Mobile Quick Buy: always on, bottom-right, no hover required */}
          {!outOfStock && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickAdd(product);
              }}
              aria-label={quickBuyLabel}
              className="sm:hidden absolute bottom-2 right-2 z-20 w-9 h-9 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center shadow-md active:scale-90 transition-transform"
            >
              <ShoppingBag size={15} />
            </button>
          )}

          {outOfStock && (
            <div className="absolute bottom-0 inset-x-0 bg-[#1A1A1A]/95 text-[#D4AF37] text-[10px] uppercase font-bold tracking-[0.25em] py-2.5 text-center z-10">
              Out of Stock
            </div>
          )}
        </div>

        <Link to={href} className="block px-0.5">
          {product.category && (
            <p className="text-[9px] uppercase tracking-[0.25em] text-[#9A7B1F] mb-2 font-semibold">
              {product.category}
            </p>
          )}

          <p className="text-[8px] uppercase tracking-[0.2em] text-gray-400 mb-0.5">Name</p>
          <h2 className="font-serif capitalize text-[15px] leading-snug text-[#1A1A1A] group-hover:text-[#9A7B1F] transition-colors line-clamp-2">
            {product.name}
          </h2>

          <p className="text-[8px] uppercase tracking-[0.2em] text-gray-400 mt-3 mb-0.5">Price</p>
          <div className="flex items-baseline gap-2">
            {hasDiscount && (
              <span className="text-xs text-gray-400 line-through">PKR {formatPrice(compareAtPrice)}</span>
            )}
            <span className="text-base font-semibold text-[#1A1A1A] tracking-wide">
              PKR {formatPrice(product.price)}
            </span>
          </div>

          {lowStock && (
            <span className="inline-block mt-2 text-[9px] uppercase tracking-[0.15em] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5">
              Only Few Left
            </span>
          )}
        </Link>
      </article>

      {quickViewOpen && (
        <ProductQuickView
          product={product}
          outOfStock={outOfStock}
          onAddToCart={() => {
            onQuickAdd(product);
            setQuickViewOpen(false);
          }}
          onClose={() => setQuickViewOpen(false)}
        />
      )}
    </>
  );
}
