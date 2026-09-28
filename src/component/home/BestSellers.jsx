import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, X, Check, Watch, Sparkles, ArrowUpRight } from 'lucide-react';

const BEST_SELLERS = [
  {
    id: 1,
    category: 'watches',
    name: 'Zelora Royal Oak Skeleton Automatic',
    price: 'PKR 850,000',
    specs: '41mm • Rose Gold & Obsidian Dial • Automatic Movement',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800',
    tag: 'Haute Horlogerie',
    description: 'Precision mechanical movement encased in 18k rose gold with an open-worked skeleton dial and glareproofed sapphire crystal.'
  },
  {
    id: 2,
    category: 'watches',
    name: 'Zelora Cosmograph Gold Edition',
    price: 'PKR 620,000',
    specs: '40mm • Yellow Gold & Onyx Dial • Chronograph',
    image: 'https://images.unsplash.com/photo-1547996160-01ff74742fd0?auto=format&fit=crop&q=80&w=800',
    tag: 'Bestseller',
    description: 'A timeless homage to motorsports, crafted with precision chronograph function and high-polish yellow gold bracelet.'
  },
  {
    id: 3,
    category: 'jewellery',
    name: '18K Yellow Gold Diamond Solitaire Ring',
    price: 'PKR 185,000',
    specs: '1.5 Carat GIA Certified • VVS1 Clarity',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=800',
    tag: 'Iconic',
    description: 'A brilliant solitaire diamond hand-set on a tapered 18k yellow gold band to maximize light reflection.'
  },
  {
    id: 4,
    category: 'jewellery',
    name: 'Classic Diamond Tennis Bracelet in White Gold',
    price: 'PKR 340,000',
    specs: '4.2 Total Carat Weight • 18K White Gold',
    image: 'https://images.unsplash.com/photo-1611591471171-a1314efea44d?auto=format&fit=crop&q=80&w=800',
    tag: 'New Edition',
    description: 'A continuous line of hand-selected round brilliant diamonds set in polished 18k white gold.'
  }
];

export default function BestSellers() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [wishlist, setWishlist] = useState({});
  const [addedToCart, setAddedToCart] = useState({});
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const toggleWishlist = (id, e) => {
    e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddToCart = (id, e) => {
    e.stopPropagation();
    setAddedToCart((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedToCart((prev) => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const handleQuickView = (product, e) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleNavigateToProduct = (id) => {
    navigate(`/product/${id}`);
  };

  const filteredProducts =
    activeCategory === 'all'
      ? BEST_SELLERS
      : BEST_SELLERS.filter((item) => item.category === activeCategory);

  return (
    <section className="bg-white py-20 px-6 md:px-12 text-[#111111] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 pb-6 gap-6">
          <div>
            <p className="text-[10px] uppercase font-semibold tracking-[0.4em] text-[#D4AF37] mb-2 flex items-center gap-2">
              <Sparkles size={12} /> Curated Masterpieces
            </p>
            <h2 className="text-2xl md:text-4xl font-serif font-light tracking-[0.18em] text-[#111111] uppercase">
              The Bestsellers
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#111111] text-white shadow-md'
                  : 'bg-[#F9F8F6] text-gray-600 hover:bg-[#111111] hover:text-white'
              }`}
            >
              All Masterpieces
            </button>
            <button
              onClick={() => setActiveCategory('watches')}
              className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                activeCategory === 'watches'
                  ? 'bg-[#111111] text-white shadow-md'
                  : 'bg-[#F9F8F6] text-gray-600 hover:bg-[#111111] hover:text-white'
              }`}
            >
              <Watch size={12} className={activeCategory === 'watches' ? 'text-[#D4AF37]' : 'text-[#111111]'} />
              <span>Timepieces</span>
            </button>
            <button
              onClick={() => setActiveCategory('jewellery')}
              className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer ${
                activeCategory === 'jewellery'
                  ? 'bg-[#111111] text-white shadow-md'
                  : 'bg-[#F9F8F6] text-gray-600 hover:bg-[#111111] hover:text-white'
              }`}
            >
              Jewellery
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleNavigateToProduct(product.id)}
              className="group cursor-pointer flex flex-col bg-white transition-all duration-500 rounded-sm overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-[#F5F4F0] rounded-sm">
                {/* Tag Badge */}
                <span className="absolute top-3 left-3 bg-[#111111] text-white text-[9px] tracking-[0.2em] px-2.5 py-1 uppercase font-medium z-10">
                  {product.tag}
                </span>

                {/* Wishlist Heart Button */}
                <button
                  onClick={(e) => toggleWishlist(product.id, e)}
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md rounded-full text-[#111111] hover:bg-white z-10 transition-colors shadow-sm cursor-pointer"
                  aria-label="Save to Wishlist"
                >
                  <Heart
                    size={15}
                    className={
                      wishlist[product.id]
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-600 hover:text-[#111111]'
                    }
                  />
                </button>

                {/* Main Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Quick Action Bar on Hover */}
                <div className="absolute inset-x-0 bottom-0 p-3 bg-white/95 backdrop-blur-md translate-y-full group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 shadow-lg">
                  <button
                    onClick={(e) => handleAddToCart(product.id, e)}
                    className="flex-1 bg-[#111111] text-white py-2.5 text-[9px] font-bold tracking-[0.2em] uppercase hover:bg-[#D4AF37] hover:text-black transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {addedToCart[product.id] ? (
                      <>
                        <Check size={13} />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={13} />
                        <span>Quick Add</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={(e) => handleQuickView(product, e)}
                    className="bg-[#F9F8F6] text-[#111111] p-2.5 hover:bg-[#D4AF37] hover:text-black transition-colors cursor-pointer"
                    title="Quick Preview"
                  >
                    <Eye size={14} />
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="pt-4 pb-2 flex flex-col flex-1 justify-between bg-white">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-1">
                    {product.category === 'watches' ? 'Haute Horlogerie' : 'Fine Jewellery'}
                  </p>
                  <h3 className="text-xs font-serif font-normal tracking-wide text-[#111111] line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[10px] text-gray-500 font-sans mt-0.5 line-clamp-1">
                    {product.specs}
                  </p>
                </div>

                <div className="mt-3 pt-2 flex items-center justify-between">
                  <p className="text-xs font-semibold text-[#111111] tracking-wider">
                    {product.price}
                  </p>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400 group-hover:text-[#D4AF37] transition-colors flex items-center gap-0.5">
                    View Piece <ArrowUpRight size={11} />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
          <div className="bg-white w-full max-w-3xl overflow-hidden relative shadow-2xl flex flex-col md:flex-row">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 z-20 text-gray-600 hover:text-black bg-white/80 p-2 rounded-full cursor-pointer shadow-sm"
            >
              <X size={18} />
            </button>

            <div className="w-full md:w-1/2 h-64 md:h-auto bg-[#F5F4F0] relative">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between bg-white">
              <div>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
                  {quickViewProduct.tag}
                </span>
                <h3 className="text-xl font-serif text-[#111111] tracking-wide uppercase mt-1 mb-2">
                  {quickViewProduct.name}
                </h3>
                <p className="text-xs text-gray-600 mb-4 leading-relaxed font-sans">
                  {quickViewProduct.description}
                </p>
                <div className="bg-[#FCFCFB] p-3 text-[10px] text-gray-700 tracking-wider mb-6 border-l-2 border-[#D4AF37]">
                  {quickViewProduct.specs}
                </div>
              </div>

              <div>
                <p className="text-lg font-semibold text-[#111111] mb-4">
                  {quickViewProduct.price}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => handleAddToCart(quickViewProduct.id, e)}
                    className="flex-1 bg-[#111111] text-white py-3 text-[10px] font-bold tracking-[0.25em] uppercase hover:bg-[#D4AF37] hover:text-black transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag size={14} />
                    <span>
                      {addedToCart[quickViewProduct.id] ? 'Added to Bag' : 'Add to Bag'}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setQuickViewProduct(null);
                      handleNavigateToProduct(quickViewProduct.id);
                    }}
                    className="px-4 py-3 bg-[#F9F8F6] text-[#111111] text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-[#111111] hover:text-white transition-colors cursor-pointer"
                  >
                    Full Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}