import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, ShoppingBag } from 'lucide-react';
import { timeLeft } from '../utils/dealTime';
import { formatPrice } from '../utils/pricing';
import { dealBundle, useBuyDeal } from '../hooks/useBuyDeal';

// One deal on the Deals page: banner, badge, % off, countdown. The whole card links to the deal's page;
// the Buy button adds the whole deal to the cart and goes to checkout.
export default function DealCard({ deal, now }) {
  const buyDeal = useBuyDeal();
  const bundle = dealBundle(deal);
  const preview = deal.products.slice(0, 3).filter((product) => product.images?.[0]);

  return (
    <Link
      to={`/deals/${deal.slug || deal._id}`}
      className="group flex flex-col bg-white border border-[#EAE6DF] overflow-hidden shadow-sm hover:shadow-[0_18px_40px_-16px_rgba(26,26,26,0.35)] hover:border-[#D4AF37]/60 transition-all duration-300"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[#1A1A1A]">
        {deal.banner?.url ? (
          <img
            src={deal.banner.url}
            alt={deal.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : preview.length > 0 ? (
          // No banner uploaded: show the deal's first few products instead
          <div className="w-full h-full grid" style={{ gridTemplateColumns: `repeat(${preview.length}, 1fr)` }}>
            {preview.map((product) => (
              <img
                key={product._id}
                src={product.images[0].url}
                alt={product.images[0].alt || product.name}
                loading="lazy"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />
            ))}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-serif text-5xl text-[#D4AF37] tracking-wider">{deal.percent}%</span>
          </div>
        )}

        <span className="absolute top-3 left-3 bg-[#D4AF37] text-[#1A1A1A] text-[10px] font-bold tracking-[0.2em] uppercase px-2.5 py-1.5 shadow-sm">
          {deal.percent}% Off
        </span>
        {deal.badge && (
          <span className="absolute top-3 right-3 bg-[#1A1A1A] text-white text-[9px] font-semibold tracking-[0.2em] uppercase px-2.5 py-1.5 shadow-sm">
            {deal.badge}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h2 className="font-serif text-xl tracking-[0.08em] uppercase text-[#1A1A1A] group-hover:text-[#9A7B1F] transition-colors">
          {deal.title}
        </h2>
        {deal.subtitle && <p className="text-xs text-gray-500 mt-2 leading-relaxed line-clamp-2">{deal.subtitle}</p>}

        <div className="mt-auto pt-5 flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.15em] font-semibold">
          <span className="flex items-center gap-1.5 text-gray-500">
            {deal.endsAt ? (
              <>
                <Clock size={12} className="text-[#D4AF37]" /> {timeLeft(deal.endsAt, now)}
              </>
            ) : (
              `${deal.products.length} ${deal.products.length === 1 ? 'piece' : 'pieces'}`
            )}
          </span>
          <span className="flex items-center gap-1.5 text-[#1A1A1A] group-hover:text-[#9A7B1F] transition-colors">
            View Deal <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </span>
        </div>

        <button
          type="button"
          onClick={(e) => {
            // The card is a link; don't also open the deal page
            e.preventDefault();
            e.stopPropagation();
            buyDeal(deal);
          }}
          disabled={bundle.items.length === 0}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-[#1A1A1A] text-white py-3 text-[10px] font-semibold tracking-[0.2em] uppercase hover:bg-[#D4AF37] hover:text-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#1A1A1A] disabled:hover:text-white"
        >
          <ShoppingBag size={13} />
          {bundle.items.length === 0 ? 'Sold Out' : `Buy Deal · ${formatPrice(bundle.total)}`}
        </button>
      </div>
    </Link>
  );
}
