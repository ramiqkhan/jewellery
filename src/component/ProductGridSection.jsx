import React from 'react';
import { AlertCircle, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import ProductCard from './ProductCard';

// Shared loading / error / grid / pagination block for every backend-driven
// product listing page (Rings, Necklaces, Earrings, Bracelets, Fine Jewellery,
// 80s Collection, Watches, New Arrivals).
export default function ProductGridSection({
  loading,
  error,
  reload,
  products,
  pagination,
  page,
  setPage,
  wishlist,
  toggleWishlist,
  quickAdd,
  resourceLabel = 'piece',
  emptyLabel = 'No products available right now.',
}) {
  return (
    <>
      {error && (
        <div className="flex items-start gap-3 border border-red-200 bg-red-50 text-red-700 p-4 text-xs mb-10">
          <AlertCircle size={18} className="shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold mb-1">Could not load products from the backend</p>
            <p>{error}</p>
          </div>
          <button
            onClick={reload}
            className="shrink-0 border border-red-300 px-3 py-1.5 hover:bg-red-100 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      {loading && (
        <div className="py-24 flex items-center justify-center text-gray-400">
          <Loader2 size={22} className="animate-spin" />
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <p className="py-24 text-center text-sm text-gray-400">{emptyLabel}</p>
      )}

      {!loading && products.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              isWishlisted={!!wishlist[product._id]}
              onToggleWishlist={toggleWishlist}
              onQuickAdd={quickAdd}
            />
          ))}
        </div>
      )}

      {pagination.pages > 1 && (
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-[#EAE6DF] text-xs text-gray-500">
          <p>
            Page {pagination.page} of {pagination.pages} — {pagination.total} {resourceLabel}
            {pagination.total === 1 ? '' : 's'}
          </p>
          <div className="flex gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="p-2 border border-[#EAE6DF] bg-white disabled:opacity-30 hover:border-[#D4AF37] transition-colors"
              aria-label="Previous page"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              disabled={page >= pagination.pages}
              onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
              className="p-2 border border-[#EAE6DF] bg-white disabled:opacity-30 hover:border-[#D4AF37] transition-colors"
              aria-label="Next page"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
