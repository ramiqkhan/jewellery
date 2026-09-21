import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../Context/CartContext';

const img = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=700`;

// Placeholder photography - swap for real product shots
const ARRIVALS = [
  {
    id: 'zelora-arrival-01',
    name: 'Classic Diamond Tennis Bracelet in White Gold',
    category: 'Bracelets',
    metal: '18K White Gold',
    price: 340000,
    added: '2026-09-18',
    image: img('1611591471171-a1314efea44d'),
  },
  {
    id: 'zelora-arrival-02',
    name: 'Pavé Diamond Eternity Band',
    category: 'Rings',
    metal: '18K White Gold',
    price: 215000,
    added: '2026-09-16',
    image: img('1605100804763-247f67b3557e'),
  },
  {
    id: 'zelora-arrival-03',
    name: 'Akoya Cultured Pearl Drop Earrings',
    category: 'Earrings',
    metal: '18K Yellow Gold',
    price: 78000,
    added: '2026-09-14',
    image: img('1630019852942-f89202989a59'),
  },
  {
    id: 'zelora-arrival-04',
    name: 'Interlocking Gold Chain Necklace',
    category: 'Necklaces',
    metal: '18K Yellow Gold',
    price: 145000,
    added: '2026-09-10',
    image: img('1599643477877-530eb83abc8e'),
  },
  {
    id: 'zelora-arrival-05',
    name: 'Three-Stone Diamond Anniversary Ring',
    category: 'Rings',
    metal: 'Platinum',
    price: 520000,
    added: '2026-09-07',
    image: img('1603561591411-07134e71a2a9'),
  },
  {
    id: 'zelora-arrival-06',
    name: 'Diamond Studded Hoop Earrings',
    category: 'Earrings',
    metal: '18K Rose Gold',
    price: 112000,
    added: '2026-09-03',
    image: img('1630019852942-f89202989a59'),
  },
  {
    id: 'zelora-arrival-07',
    name: 'Solitaire Diamond Pendant Necklace',
    category: 'Necklaces',
    metal: '18K White Gold',
    price: 189000,
    added: '2026-08-28',
    image: img('1599643477877-530eb83abc8e'),
  },
  {
    id: 'zelora-arrival-08',
    name: 'Gold Link Chain Bracelet',
    category: 'Bracelets',
    metal: '18K Yellow Gold',
    price: 96000,
    added: '2026-08-24',
    image: img('1611591471171-a1314efea44d'),
  },
];

const CATEGORIES = ['All', ...new Set(ARRIVALS.map((item) => item.category))];

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

// The three most recent pieces get a "Just In" badge
const JUST_IN_IDS = new Set(
  [...ARRIVALS]
    .sort((a, b) => b.added.localeCompare(a.added))
    .slice(0, 3)
    .map((item) => item.id)
);

const formatPrice = (value) => `PKR ${value.toLocaleString()}`;

const formatAdded = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

export default function NewArrivals() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [wishlist, setWishlist] = useState({});
  const { addToCart, setIsCartOpen } = useCart();

  const visibleItems = useMemo(() => {
    const filtered =
      activeCategory === 'All'
        ? ARRIVALS
        : ARRIVALS.filter((item) => item.category === activeCategory);

    const sorted = [...filtered];
    if (sortBy === 'price-asc') sorted.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    else sorted.sort((a, b) => b.added.localeCompare(a.added));
    return sorted;
  }, [activeCategory, sortBy]);

  const toggleWishlist = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleQuickAdd = (e, item) => {
    e.preventDefault();
    e.stopPropagation();

    if (addToCart) {
      addToCart({
        id: item.id,
        productId: item.id,
        title: item.name,
        price: item.price,
        image: item.image,
        quantity: 1,
      });
      if (typeof setIsCartOpen === 'function') {
        setIsCartOpen(true);
      }
    }
  };

  return (
    <main className="bg-[#FCFCFB] text-[#1A1A1A] min-h-screen">
      {/* Page Header */}
      <section className="bg-[#111111] text-white px-6 py-16 md:py-24 text-center">
        <nav aria-label="Breadcrumb" className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-4">
          <Link to="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">New Arrivals</span>
        </nav>
        <p className="text-[10px] uppercase font-semibold tracking-[0.35em] text-[#D4AF37] mb-2">
          Just Landed
        </p>
        <h1 className="text-3xl md:text-4xl font-serif font-light tracking-[0.2em] uppercase">
          New Arrivals
        </h1>
        <div className="w-10 h-px bg-[#D4AF37] mx-auto mt-4 mb-5" />
        <p className="text-sm text-gray-400 max-w-xl mx-auto leading-relaxed font-serif">
          The latest additions to the house, freshly finished at our atelier and available
          to order now.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14">
        {/* Filter & Sort Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#EAE6DF]">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter new arrivals by category">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                className={`px-4 py-2 text-[11px] uppercase tracking-[0.2em] border transition-colors ${
                  activeCategory === category
                    ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]'
                    : 'bg-transparent text-gray-700 border-[#EAE6DF] hover:border-[#D4AF37] hover:text-[#9A7B1F]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between md:justify-end gap-6">
            <p className="text-xs text-gray-500 tracking-wide">
              {visibleItems.length} {visibleItems.length === 1 ? 'piece' : 'pieces'}
            </p>
            <label className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-gray-500">
              Sort
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
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
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {visibleItems.map((item) => (
            <article key={item.id} className="group flex flex-col">
              <div className="relative bg-[#F9F8F6] aspect-square overflow-hidden mb-4 border border-[#EAE6DF]">
                {JUST_IN_IDS.has(item.id) && (
                  <span className="absolute top-3 left-3 bg-[#1A1A1A] text-[#D4AF37] text-[9px] tracking-[0.2em] px-2.5 py-1 uppercase font-semibold z-10">
                    Just In
                  </span>
                )}

                <button
                  onClick={(e) => toggleWishlist(e, item.id)}
                  className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:text-black z-10 transition-colors shadow-sm"
                  aria-label={wishlist[item.id] ? 'Remove from wishlist' : 'Save to wishlist'}
                  aria-pressed={!!wishlist[item.id]}
                >
                  <Heart
                    size={16}
                    className={wishlist[item.id] ? 'fill-red-500 text-red-500' : 'text-gray-700'}
                  />
                </button>

                {/* Clickable Card Link to Product Detail Page */}
                <Link to={`/product/${item.id}`} className="block w-full h-full">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </Link>

                {/* Quick Add Overlay Button */}
                <button
                  onClick={(e) => handleQuickAdd(e, item)}
                  className="absolute bottom-0 inset-x-0 bg-black/90 text-white text-[10px] uppercase font-bold tracking-[0.2em] py-3 flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10 hover:bg-[#D4AF37]"
                >
                  <ShoppingBag size={14} />
                  <span>Quick Add</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">
                <span>{item.category}</span>
                <span>Added {formatAdded(item.added)}</span>
              </div>

              <Link to={`/product/${item.id}`}>
                <h2 className="text-xs font-serif tracking-wide leading-relaxed group-hover:text-[#D4AF37] transition-colors">
                  {item.name}
                </h2>
              </Link>

              <p className="text-[11px] text-gray-500 mt-1">{item.metal}</p>
              <p className="text-xs font-semibold tracking-wide mt-2">{formatPrice(item.price)}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}