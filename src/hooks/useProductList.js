import { useCallback, useEffect, useState } from 'react';
import { getProductsByMenu } from '../api';

const DEFAULT_LIMIT = 12;

// Backend sort keys (see services/productService.js SORT_OPTIONS)
export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'name-asc', label: 'Name: A to Z' },
];

// Fetches one navbar page's products from the backend (GET /products/menu/:menuSlug),
// e.g. useProductList('rings'), useProductList('new-arrivals').
export function useProductList(menuSlug, { limit = DEFAULT_LIMIT } = {}) {
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    setError('');
    getProductsByMenu(menuSlug, { sort, page, limit })
      .then((res) => {
        setProducts(res.products || []);
        setPagination(res.pagination || { total: 0, page: 1, limit, pages: 1 });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [menuSlug, sort, page, limit]);

  useEffect(() => {
    load();
  }, [load]);

  // Changing sort starts back at page 1, in one state update instead of two fetches
  const changeSort = useCallback((value) => {
    setSort(value);
    setPage(1);
  }, []);

  return { products, pagination, loading, error, sort, changeSort, page, setPage, reload: load };
}
