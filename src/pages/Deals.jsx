import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, AlertCircle, Loader2 } from 'lucide-react';
import { getDeals, getProducts } from '../api';
import { useQuickAdd } from '../hooks/useQuickAdd';
import { getPricing } from '../utils/pricing';
import { useNow } from '../utils/dealTime';
import DealCard from '../component/DealCard';
import ProductGridSection from '../component/ProductGridSection';

export default function Deals() {
  const navigate = useNavigate();
  const quickAdd = useQuickAdd();
  const now = useNow();

  const [deals, setDeals] = useState([]); // live deals made in the dashboard, each with its products
  const [otherOffers, setOtherOffers] = useState([]); // products with their own discount, not in any deal
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [wishlist, setWishlist] = useState({});

  const load = () => {
    setLoading(true);
    setError('');
    Promise.all([getDeals(), getProducts({ onSale: true, limit: 100 })])
      .then(([dealsRes, saleRes]) => {
        const liveDeals = dealsRes.deals || [];
        const inDeals = new Set(liveDeals.flatMap((deal) => deal.products.map((product) => product._id)));
        setDeals(liveDeals);
        setOtherOffers(
          (saleRes.products || []).filter((product) => !inDeals.has(product._id) && getPricing(product).onSale)
        );
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const nothingOnSale = deals.length === 0 && otherOffers.length === 0;

  const toggleWishlist = (id) => setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));

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
        {!loading && !error && nothingOnSale && (
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

        {/* Live deals: each card opens that deal's page */}
        {!loading && deals.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
            {deals.map((deal) => (
              <DealCard key={deal._id} deal={deal} now={now} />
            ))}
          </div>
        )}

        {/* Products with their own discount, outside any deal */}
        {!loading && otherOffers.length > 0 && (
          <section className={deals.length > 0 ? 'mt-16 md:mt-24' : ''}>
            <h2 className="text-xl md:text-2xl font-serif font-light tracking-[0.12em] uppercase border-b border-[#EAE6DF] pb-4 mb-8">
              More Offers
            </h2>
            <ProductGridSection
              loading={false}
              error=""
              reload={load}
              products={otherOffers}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
              quickAdd={quickAdd}
            />
          </section>
        )}

      </div>
    </main>
  );
}
