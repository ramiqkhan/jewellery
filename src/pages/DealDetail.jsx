import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Loader2, ShoppingBag, Tag } from 'lucide-react';
import { getDeal, getProduct } from '../api';
import { dealBundle, useBuyDeal } from '../hooks/useBuyDeal';
import { formatPrice } from '../utils/pricing';
import { timeLeft, useNow } from '../utils/dealTime';
import DealProductDetail from '../component/DealProductDetail';

export default function DealDetail() {
  const { slug } = useParams();
  const buyDeal = useBuyDeal();
  const now = useNow();

  const [deal, setDeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // The deal only carries card fields for its products, so fetch each one in full
  // (description, specifications, brand...). A product that fails to load keeps its card fields.
  const load = () => {
    setLoading(true);
    setError('');
    getDeal(slug)
      .then(async (res) => {
        const products = await Promise.all(
          res.deal.products.map((product) =>
            getProduct(product.slug || product._id)
              .then((full) => ({ ...product, ...full.product }))
              .catch(() => product)
          )
        );
        setDeal({ ...res.deal, products });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(load, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FCFCFB] py-32 flex items-center justify-center text-gray-400">
        <Loader2 size={24} className="animate-spin" />
      </main>
    );
  }

  // The API returns 404 for deals that have ended, are hidden or don't exist
  if (error || !deal) {
    return (
      <main className="min-h-screen bg-[#FCFCFB] py-24 px-4">
        <div className="max-w-xl mx-auto text-center border border-dashed border-[#EAE6DF] bg-white py-16 px-6">
          <p className="font-serif text-xl tracking-wider uppercase mb-2">Deal not available</p>
          <p className="text-xs text-gray-500 mb-6">
            {/not found/i.test(error) ? 'This offer has ended or no longer exists.' : error}
          </p>
          <div className="flex justify-center gap-3">
            {!/not found/i.test(error) && (
              <button
                onClick={load}
                className="px-5 py-3 border border-[#1A1A1A] text-[10px] uppercase tracking-[0.2em] hover:bg-[#1A1A1A] hover:text-white transition-colors"
              >
                Retry
              </button>
            )}
            <Link
              to="/deals"
              className="px-5 py-3 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-colors"
            >
              View All Deals
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const bundle = dealBundle(deal);

  return (
    <main className="bg-[#FCFCFB] text-[#111111] min-h-screen pb-16 antialiased">
      {/* Hero */}
      <section className="relative bg-[#1A1A1A] text-white overflow-hidden">
        {deal.banner?.url && (
          <img src={deal.banner.url} alt={deal.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-8 pb-12 md:pt-10 md:pb-20 min-h-[280px] md:min-h-[380px] flex flex-col">
          <Link
            to="/deals"
            className="self-start flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-white/80 hover:text-[#D4AF37] transition-colors"
          >
            <ArrowLeft size={13} /> All Deals
          </Link>

          <div className="mt-auto pt-12">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="bg-[#D4AF37] text-[#1A1A1A] text-[10px] font-bold tracking-[0.2em] uppercase px-2.5 py-1">
                {deal.percent}% Off
              </span>
              {deal.badge && (
                <span className="border border-white/60 text-white text-[9px] font-semibold tracking-[0.2em] uppercase px-2.5 py-1">
                  {deal.badge}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-light tracking-[0.12em] uppercase">{deal.title}</h1>
            {deal.subtitle && <p className="text-sm text-white/80 mt-3 max-w-2xl leading-relaxed">{deal.subtitle}</p>}
            {deal.endsAt && (
              <p className="mt-5 inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-2 text-[11px] uppercase tracking-[0.15em] font-semibold">
                <Clock size={13} className="text-[#D4AF37]" /> {timeLeft(deal.endsAt, now)}
              </p>
            )}

            {/* Buy the whole deal in one go */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
              <button
                onClick={() => buyDeal(deal)}
                disabled={bundle.items.length === 0}
                className="inline-flex items-center justify-center gap-2 bg-[#D4AF37] text-[#1A1A1A] px-7 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#D4AF37]"
              >
                <ShoppingBag size={15} />
                {bundle.items.length === 0 ? 'Sold Out' : 'Buy This Deal'}
              </button>
              {bundle.items.length > 0 && (
                <p className="text-xs text-white/80">
                  {bundle.items.length} {bundle.items.length === 1 ? 'piece' : 'pieces'} for{' '}
                  <span className="font-semibold text-white">{formatPrice(bundle.total)}</span>
                  {bundle.originalTotal > bundle.total && (
                    <span className="ml-2 line-through text-white/50">{formatPrice(bundle.originalTotal)}</span>
                  )}
                </p>
              )}
            </div>
            {bundle.needsSize.length > 0 && (
              <p className="mt-3 text-[11px] text-white/70">
                {bundle.needsSize.length} {bundle.needsSize.length === 1 ? 'piece needs' : 'pieces need'} a size picked: add{' '}
                {bundle.needsSize.length === 1 ? 'it' : 'them'} from the list below.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-10 md:pt-14">
        <div className="flex items-center justify-between border-b border-[#EAE6DF] pb-4">
          <p className="flex items-center gap-1.5 text-[10px] uppercase font-semibold tracking-[0.3em] text-[#D4AF37]">
            <Tag size={12} /> In This Deal
          </p>
          <p className="text-[11px] text-gray-500">
            {deal.products.length} {deal.products.length === 1 ? 'piece' : 'pieces'}
          </p>
        </div>

        {deal.products.length === 0 ? (
          <p className="py-24 text-center text-sm text-gray-400">No pieces in this deal right now.</p>
        ) : (
          deal.products.map((product, index) => (
            <DealProductDetail key={product._id} product={product} index={index} count={deal.products.length} />
          ))
        )}

        {/* Repeat the buy button after the pieces, so it's there once they've scrolled through */}
        {bundle.items.length > 0 && (
          <div className="mt-6 border-t border-[#EAE6DF] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              All {bundle.items.length} {bundle.items.length === 1 ? 'piece' : 'pieces'} for{' '}
              <span className="font-semibold text-[#1A1A1A]">{formatPrice(bundle.total)}</span>
              {bundle.originalTotal > bundle.total && (
                <span className="ml-2 line-through text-gray-400">{formatPrice(bundle.originalTotal)}</span>
              )}
            </p>
            <button
              onClick={() => buyDeal(deal)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1A1A1A] text-white px-8 py-4 text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#D4AF37] hover:text-black transition-colors"
            >
              <ShoppingBag size={15} /> Buy This Deal
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
