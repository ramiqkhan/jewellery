import React, { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { searchProducts } from '../api';
import { SORT_OPTIONS } from '../hooks/useProductList';
import { useQuickAdd } from '../hooks/useQuickAdd';
import ProductGridSection from '../component/ProductGridSection';

const SEARCH_SORT_OPTIONS = [{ value: '', label: 'Most Relevant' }, ...SORT_OPTIONS];

const EMPTY_FACETS = { categories: [], collections: [], priceRange: null };
const EMPTY_PAGINATION = { total: 0, page: 1, limit: 12, pages: 1 };

const labelize = (value) => value.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

// GET /api/products/search - results page for the navbar search box, with the
// category/collection facets the backend returns alongside the matches.
export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const collection = searchParams.get('collection') || '';
  const sort = searchParams.get('sort') || '';
  const page = Math.max(parseInt(searchParams.get('page') || '1', 10), 1);

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(EMPTY_PAGINATION);
  const [facets, setFacets] = useState(EMPTY_FACETS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [wishlist, setWishlist] = useState({});

  const quickAdd = useQuickAdd();

  // Replaces only the given params in the URL, so filters are shareable / back-button friendly
  const updateParams = useCallback(
    (patch) => {
      const next = new URLSearchParams(searchParams);
      Object.entries(patch).forEach(([key, value]) => {
        if (value) next.set(key, String(value));
        else next.delete(key);
      });
      setSearchParams(next);
    },
    [searchParams, setSearchParams]
  );

  const load = useCallback(() => {
    if (!q.trim()) {
      setProducts([]);
      setPagination(EMPTY_PAGINATION);
      setFacets(EMPTY_FACETS);
      setLoading(false);
      setError('');
      return;
    }

    setLoading(true);
    setError('');
    searchProducts({ q, category, collection, sort: sort || undefined, page, limit: 12 })
      .then((res) => {
        setProducts(res.products || []);
        setPagination(res.pagination || EMPTY_PAGINATION);
        setFacets(res.facets || EMPTY_FACETS);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [q, category, collection, sort, page]);

  useEffect(() => {
    load();
  }, [load]);

  const toggleWishlist = (id) => setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));

  // Resetting any filter goes back to page 1
  const setFacetFilter = (key, value) => updateParams({ [key]: value, page: null });
  const setPage = (updater) => {
    const nextPage = typeof updater === 'function' ? updater(page) : updater;
    updateParams({ page: nextPage > 1 ? nextPage : null });
  };

  return (
    <main className="bg-[#FCFCFB] text-[#1A1A1A] min-h-screen">
      {/* Page Header */}
      <section className="bg-white border-b border-[#EAE6DF] px-6 py-10 md:py-14">
        <div className="max-w-7xl mx-auto">
          <nav aria-label="Breadcrumb" className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-4">
            <Link to="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-600">Search</span>
          </nav>
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <Search size={14} />
            <span className="text-[11px] uppercase tracking-[0.2em]">
              {q ? `Results for "${q}"` : 'No search term given'}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-light tracking-[0.15em] uppercase">
            {q || 'Search'}
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14">
        {!q.trim() ? (
          <p className="py-16 text-center text-sm text-gray-400">
            Type something into the search box in the header to find products.
          </p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
            {/* Facets Sidebar */}
            <aside className="space-y-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">Category</p>
                <div className="flex flex-col gap-1.5">
                  <button
                    onClick={() => setFacetFilter('category', '')}
                    className={`text-left text-xs px-2 py-1.5 transition-colors ${
                      !category ? 'text-[#D4AF37] font-semibold' : 'text-gray-600 hover:text-[#1A1A1A]'
                    }`}
                  >
                    All Categories
                  </button>
                  {facets.categories.map((facet) => (
                    <button
                      key={facet.value}
                      onClick={() => setFacetFilter('category', category === facet.value ? '' : facet.value)}
                      className={`text-left text-xs px-2 py-1.5 flex justify-between gap-2 transition-colors ${
                        category === facet.value ? 'text-[#D4AF37] font-semibold' : 'text-gray-600 hover:text-[#1A1A1A]'
                      }`}
                    >
                      <span>{labelize(facet.value)}</span>
                      <span className="text-gray-400">{facet.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {facets.collections.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-3">Collection</p>
                  <div className="flex flex-col gap-1.5">
                    {facets.collections.map((facet) => (
                      <button
                        key={facet.value}
                        onClick={() => setFacetFilter('collection', collection === facet.value ? '' : facet.value)}
                        className={`text-left text-xs px-2 py-1.5 flex justify-between gap-2 transition-colors ${
                          collection === facet.value ? 'text-[#D4AF37] font-semibold' : 'text-gray-600 hover:text-[#1A1A1A]'
                        }`}
                      >
                        <span>{labelize(facet.value)}</span>
                        <span className="text-gray-400">{facet.count}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {facets.priceRange && (
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-2">Price Range</p>
                  <p className="text-xs text-gray-600">
                    PKR {facets.priceRange.min.toLocaleString()} – PKR {facets.priceRange.max.toLocaleString()}
                  </p>
                </div>
              )}
            </aside>

            {/* Results */}
            <div>
              <div className="flex items-center justify-between gap-4 mb-10 pb-6 border-b border-[#EAE6DF]">
                <p className="text-xs text-gray-500 tracking-wide">
                  {loading ? 'Searching…' : `${pagination.total} ${pagination.total === 1 ? 'result' : 'results'}`}
                </p>
                <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-gray-500">
                  Sort
                  <select
                    value={sort}
                    onChange={(e) => updateParams({ sort: e.target.value, page: null })}
                    className="border border-[#EAE6DF] bg-white px-3 py-2 text-xs normal-case tracking-normal text-[#1A1A1A] focus:outline-none focus:border-[#D4AF37]"
                  >
                    {SEARCH_SORT_OPTIONS.map((option) => (
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
                reload={load}
                products={products}
                pagination={pagination}
                page={page}
                setPage={setPage}
                wishlist={wishlist}
                toggleWishlist={toggleWishlist}
                quickAdd={quickAdd}
                resourceLabel="result"
                emptyLabel={`No products match "${q}". Try a different search.`}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
