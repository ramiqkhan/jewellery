import { useCallback, useEffect, useRef, useState } from 'react';
import { getProductsByMenu } from '../api';
import { shuffle } from '../utils/shuffle';

const DEFAULT_LIMIT = 12;
const BACKEND_MAX_LIMIT = 100; // the backend caps ?limit at 100

// 'mixed' is done here, not by the backend; the rest are backend sort keys
// (see services/productService.js SORT_OPTIONS)
export const SORT_OPTIONS = [
  { value: 'mixed', label: 'Mixed' },
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
];

// Every product for one navbar page, fetched in as few requests as the backend allows
async function fetchAll(menuSlug) {
  const first = await getProductsByMenu(menuSlug, { sort: 'newest', page: 1, limit: BACKEND_MAX_LIMIT });
  const pages = first.pagination?.pages || 1;
  const rest = await Promise.all(
    Array.from({ length: pages - 1 }, (_, i) =>
      getProductsByMenu(menuSlug, { sort: 'newest', page: i + 2, limit: BACKEND_MAX_LIMIT })
    )
  );
  return [first, ...rest].flatMap((res) => res.products || []);
}

// Fetches one navbar page's products from the backend (GET /products/menu/:menuSlug),
// e.g. useProductList('rings'), useProductList('new-arrivals').
// The default 'mixed' order loads the whole list once, shuffles it, and pages through it here,
// so paging never repeats or skips a product. Each visit gets a new mix.
export function useProductList(menuSlug, { limit = DEFAULT_LIMIT } = {}) {
  const [sort, setSort] = useState('mixed');
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const mixedRef = useRef(null); // { menuSlug, items } - the shuffled list, kept while paging

  const load = useCallback(
    async ({ refetch = false } = {}) => {
      setLoading(true);
      setError('');
      try {
        if (sort === 'mixed') {
          if (refetch || mixedRef.current?.menuSlug !== menuSlug) {
            mixedRef.current = { menuSlug, items: shuffle(await fetchAll(menuSlug)) };
          }
          const { items } = mixedRef.current;
          setProducts(items.slice((page - 1) * limit, page * limit));
          setPagination({ total: items.length, page, limit, pages: Math.max(1, Math.ceil(items.length / limit)) });
        } else {
          const res = await getProductsByMenu(menuSlug, { sort, page, limit });
          setProducts(res.products || []);
          setPagination(res.pagination || { total: 0, page: 1, limit, pages: 1 });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    [menuSlug, sort, page, limit]
  );

  useEffect(() => {
    load();
  }, [load]);

  // Changing sort starts back at page 1, in one state update instead of two fetches
  const changeSort = useCallback((value) => {
    setSort(value);
    setPage(1);
  }, []);

  const reload = useCallback(() => load({ refetch: true }), [load]);

  return { products, pagination, loading, error, sort, changeSort, page, setPage, reload };
}
