import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProductList, SORT_OPTIONS } from '../hooks/useProductList';
import { useQuickAdd } from '../hooks/useQuickAdd';
import ProductGridSection from '../component/ProductGridSection';

export default function Rings() {
  const { products, pagination, loading, error, sort, changeSort, page, setPage, reload } = useProductList('rings');
  const [wishlist, setWishlist] = useState({});
  const quickAdd = useQuickAdd();

  const toggleWishlist = (id) => setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <main className="bg-[#FCFCFB] text-[#1A1A1A] min-h-screen">
      {/* Page Header */}
      <section className="bg-[#111111] text-white px-6 py-16 md:py-24 text-center">
        <nav aria-label="Breadcrumb" className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-4">
          <Link to="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">Rings</span>
        </nav>
        <p className="text-[10px] uppercase font-semibold tracking-[0.35em] text-[#D4AF37] mb-2">
          The Ring Collection
        </p>
        <h1 className="text-3xl md:text-4xl font-serif font-light tracking-[0.2em] uppercase">
          Rings
        </h1>
        <div className="w-10 h-px bg-[#D4AF37] mx-auto mt-4 mb-5" />
        <p className="text-sm text-gray-400 max-w-xl mx-auto leading-relaxed font-serif">
          From timeless solitaires to heirloom-inspired vintage pieces, each ring is handcrafted
          and set with GIA certified stones.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14">
        {/* Sort Bar */}
        <div className="flex items-center justify-between gap-4 mb-10 pb-6 border-b border-[#EAE6DF]">
          <p className="text-xs text-gray-500 tracking-wide">
            {loading ? 'Loading…' : `${pagination.total} ${pagination.total === 1 ? 'piece' : 'pieces'}`}
          </p>
          <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-gray-500">
            Sort
            <select
              value={sort}
              onChange={(e) => changeSort(e.target.value)}
              className="border border-[#EAE6DF] bg-white px-3 py-2 text-xs normal-case tracking-normal text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <ProductGridSection
          loading={loading}
          error={error}
          reload={reload}
          products={products}
          pagination={pagination}
          page={page}
          setPage={setPage}
          wishlist={wishlist}
          toggleWishlist={toggleWishlist}
          quickAdd={quickAdd}
          resourceLabel="piece"
          emptyLabel="No rings available right now."
        />
      </div>
    </main>
  );
}
