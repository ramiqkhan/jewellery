import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const img = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=700`;

// Placeholder photography - swap for real product shots
const IMAGES = {
  necklace: img('1599643477877-530eb83abc8e'),
};

const PRODUCTS = [
  {
    id: 'zelora-necklace-01',
    name: 'Interlocking Gold Chain Necklace',
    category: 'Chains',
    metal: '18K Yellow Gold',
    price: 1450,
    tag: 'Limited',
    image: IMAGES.necklace,
  },
  {
    id: 'zelora-necklace-02',
    name: 'Solitaire Diamond Pendant Necklace',
    category: 'Pendants',
    metal: '18K White Gold',
    price: 1890,
    tag: 'Bestseller',
    image: IMAGES.necklace,
  },
  {
    id: 'zelora-necklace-03',
    name: 'Akoya Pearl Strand Necklace',
    category: 'Pearls',
    metal: '18K Yellow Gold',
    price: 2350,
    image: IMAGES.necklace,
  },
  {
    id: 'zelora-necklace-04',
    name: 'Paperclip Link Chain',
    category: 'Chains',
    metal: '18K Rose Gold',
    price: 920,
    image: IMAGES.necklace,
  },
  {
    id: 'zelora-necklace-05',
    name: 'Heart Locket Pendant',
    category: 'Pendants',
    metal: '14K Yellow Gold',
    price: 640,
    tag: 'New',
    image: IMAGES.necklace,
  },
  {
    id: 'zelora-necklace-06',
    name: 'Freshwater Pearl Choker',
    category: 'Pearls',
    metal: 'Sterling Silver',
    price: 480,
    image: IMAGES.necklace,
  },
];

const CATEGORIES = ['All', ...new Set(PRODUCTS.map((product) => product.category))];

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

const formatPrice = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);

export default function Necklaces() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [wishlist, setWishlist] = useState({});
  const { addToCart, setIsCartOpen } = useCart();

  const visibleProducts = useMemo(() => {
    const filtered =
      activeCategory === 'All'
        ? PRODUCTS
        : PRODUCTS.filter((product) => product.category === activeCategory);

    if (sortBy === 'price-asc') return [...filtered].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [activeCategory, sortBy]);

  const toggleWishlist = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleQuickAdd = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (addToCart) {
      addToCart({
        id: product.id,
        productId: product.id,
        title: product.name,
        price: product.price,
        image: product.image,
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
          <span className="text-gray-300">Necklaces</span>
        </nav>
        <p className="text-[10px] uppercase font-semibold tracking-[0.35em] text-[#D4AF37] mb-2">
          The Necklace Collection
        </p>
        <h1 className="text-3xl md:text-4xl font-serif font-light tracking-[0.2em] uppercase">
          Necklaces
        </h1>
        <div className="w-10 h-px bg-[#D4AF37] mx-auto mt-4 mb-5" />
        <p className="text-sm text-gray-400 max-w-xl mx-auto leading-relaxed font-serif">
          Pendants, chains and pearl strands designed to be layered, gifted and worn for a lifetime.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14">
        {/* Filter & Sort Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#EAE6DF]">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter necklaces">
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
              {visibleProducts.length} {visibleProducts.length === 1 ? 'piece' : 'pieces'}
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
          {visibleProducts.map((product) => (
            <article key={product.id} className="group flex flex-col">
              <div className="relative bg-[#F9F8F6] aspect-square overflow-hidden mb-4 border border-[#EAE6DF]">
                {product.tag && (
                  <span className="absolute top-3 left-3 bg-[#1A1A1A] text-[#D4AF37] text-[9px] tracking-[0.2em] px-2.5 py-1 uppercase font-semibold z-10">
                    {product.tag}
                  </span>
                )}

                <button
                  onClick={(e) => toggleWishlist(e, product.id)}
                  className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:text-black z-10 transition-colors shadow-sm"
                  aria-label={wishlist[product.id] ? 'Remove from wishlist' : 'Save to wishlist'}
                  aria-pressed={!!wishlist[product.id]}
                >
                  <Heart
                    size={16}
                    className={wishlist[product.id] ? 'fill-red-500 text-red-500' : 'text-gray-700'}
                  />
                </button>

                {/* Clickable Card Link to Product Detail Page */}
                <Link to={`/product/${product.id}`} className="block w-full h-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </Link>

                {/* Quick Add Overlay Button */}
                <button
                  onClick={(e) => handleQuickAdd(e, product)}
                  className="absolute bottom-0 inset-x-0 bg-black/90 text-white text-[10px] uppercase font-bold tracking-[0.2em] py-3 flex items-center justify-center gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10 hover:bg-[#D4AF37]"
                >
                  <ShoppingBag size={14} />
                  <span>Quick Add</span>
                </button>
              </div>

              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1">
                {product.metal}
              </p>
              
              <Link to={`/product/${product.id}`}>
                <h2 className="text-xs font-serif tracking-wide leading-relaxed group-hover:text-[#D4AF37] transition-colors">
                  {product.name}
                </h2>
              </Link>

              <p className="text-xs font-semibold tracking-wide mt-2">{formatPrice(product.price)}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}