import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Eye, X, Check, Watch, Sparkles } from 'lucide-react';

const BEST_SELLERS = [
  {
    id: 1,
    category: 'watches',
    name: 'MIDNIGHT MINERAL WASH OVERSIZED TEE',
    originalPrice: 'Rs 2,500',
    price: 'Rs 2,299',
    discount: '-8%',
    specs: '41mm • Rose Gold & Obsidian Dial',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=800',
    tag: 'Haute Horlogerie',
    description: 'Precision mechanical movement encased in 18k rose gold with an open-worked skeleton dial.'
  },
  {
    id: 2,
    category: 'watches',
    name: 'SUMMER PUFF TERRY SHORTS',
    originalPrice: 'Rs 2,600',
    price: 'Rs 1,799',
    discount: '-31%',
    specs: '40mm • Yellow Gold & Onyx Dial',
    image: 'https://images.unsplash.com/photo-1547996160-01ff74742fd0?auto=format&fit=crop&q=80&w=800',
    tag: 'Bestseller',
    description: 'A timeless homage to motorsports, crafted with precision chronograph function.'
  },
  {
    id: 3,
    category: 'watches',
    name: 'STRIPED POLO SHIRT - BLACK WHITE',
    originalPrice: 'Rs 3,000',
    price: 'Rs 2,199',
    discount: '-27%',
    specs: '1.5 Carat GIA Certified',
    image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=800',
    tag: 'Iconic',
    description: 'A brilliant solitaire diamond hand-set on a tapered 18k yellow gold band.'
  },
  {
    id: 4,
    category: 'jewellery',
    name: 'MULTI TULIP BRACELET',
    originalPrice: 'Rs 2,500',
    price: 'Rs 1,249',
    discount: '-50%',
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
    <section className="bg-white py-20 px-6 md:px-12 text-[#111111] relative overflow-hidden antialiased">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 pb-6 border-b border-[#F2F2F2] gap-6">
          <div>
            <p className="text-[10px] uppercase font-semibold tracking-[0.35em] text-[#D4AF37] mb-2 flex items-center gap-2">
              <Sparkles size={12} /> Curated Masterpieces
            </p>
            <h2 className="text-2xl md:text-3xl font-serif font-light tracking-[0.18em] text-[#111111] uppercase">
              The Bestsellers
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2 text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-[#111111] text-white'
                  : 'bg-[#F9F8F6] text-gray-600 hover:bg-[#111111] hover:text-white'
              }`}
            >
              All Masterpieces
            </button>
            <button
              onClick={() => setActiveCategory('watches')}
              className={`px-5 py-2 text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                activeCategory === 'watches'
                  ? 'bg-[#111111] text-white'
                  : 'bg-[#F9F8F6] text-gray-600 hover:bg-[#111111] hover:text-white'
              }`}
            >
              <Watch size={12} className={activeCategory === 'watches' ? 'text-[#D4AF37]' : 'text-gray-400'} />
              <span>Timepieces</span>
            </button>
            <button
              onClick={() => setActiveCategory('jewellery')}
              className={`px-5 py-2 text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300 cursor-pointer ${
                activeCategory === 'jewellery'
                  ? 'bg-[#111111] text-white'
                  : 'bg-[#F9F8F6] text-gray-600 hover:bg-[#111111] hover:text-white'
              }`}
            >
              Jewellery
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleNavigateToProduct(product.id)}
              className="group cursor-pointer flex flex-col bg-white"
            >
              {/* Product Image Frame */}
              <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F3]">
                {/* Discount Badge */}
                {product.discount && (
                  <span className="absolute top-3 left-3 bg-[#111111] text-white text-[9px] font-semibold tracking-wider px-2 py-0.5 z-10">
                    {product.discount}
                  </span>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={(e) => toggleWishlist(product.id, e)}
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-md rounded-full text-[#111111] hover:bg-white z-10 transition-colors cursor-pointer shadow-xs"
                  aria-label="Save to Wishlist"
                >
                  <Heart
                    size={14}
                    className={
                      wishlist[product.id]
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-500 hover:text-[#111111]'
                    }
                  />
                </button>

                {/* Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />

                {/* Hover Quick Action Drawer */}
                <div className="absolute inset-x-0 bottom-0 p-3 bg-white/95 backdrop-blur-md translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2 border-t border-[#EAE6DF]">
                  <button
                    onClick={(e) => handleAddToCart(product.id, e)}
                    className="flex-1 bg-[#111111] text-white py-2.5 text-[9px] font-semibold tracking-[0.25em] uppercase hover:bg-[#D4AF37] hover:text-black transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {addedToCart[product.id] ? (
                      <>
                        <Check size={12} />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={12} />
                        <span>Add To Bag</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={(e) => handleQuickView(product, e)}
                    className="bg-[#F9F8F6] text-[#111111] p-2.5 hover:bg-[#D4AF37] hover:text-black transition-colors cursor-pointer"
                    title="Quick Preview"
                  >
                    <Eye size={13} />
                  </button>
                </div>
              </div>

              {/* Product Info Block */}
              <div className="pt-3.5 flex flex-col justify-start">
                <h3 className="text-[11px] font-medium tracking-wider text-[#111111] uppercase line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
                  {product.name}
                </h3>
                
                <div className="mt-1 flex items-center gap-2 text-[12px]">
                  {product.originalPrice && (
                    <span className="text-gray-400 line-through font-light">
                      {product.originalPrice}
                    </span>
                  )}
                  <span className="font-semibold text-[#111111]">
                    {product.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="bg-white w-full max-w-2xl overflow-hidden relative shadow-2xl flex flex-col md:flex-row border border-[#EAE6DF]">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 z-20 text-gray-500 hover:text-black bg-white/80 p-2 rounded-full cursor-pointer transition-colors"
            >
              <X size={16} />
            </button>

            <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-[#F5F5F3] relative">
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
                <h3 className="text-lg font-serif text-[#111111] tracking-wider uppercase mt-1 mb-2">
                  {quickViewProduct.name}
                </h3>
                <p className="text-[11px] text-gray-500 mb-4 leading-relaxed font-sans">
                  {quickViewProduct.description}
                </p>
                <div className="bg-[#F9F8F6] p-3 text-[10px] text-gray-600 tracking-wider mb-6 border-l-2 border-[#D4AF37]">
                  {quickViewProduct.specs}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  {quickViewProduct.originalPrice && (
                    <span className="text-xs text-gray-400 line-through font-light">
                      {quickViewProduct.originalPrice}
                    </span>
                  )}
                  <p className="text-base font-semibold text-[#111111]">
                    {quickViewProduct.price}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => handleAddToCart(quickViewProduct.id, e)}
                    className="flex-1 bg-[#111111] text-white py-3 text-[9px] font-semibold tracking-[0.25em] uppercase hover:bg-[#D4AF37] hover:text-black transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <ShoppingBag size={13} />
                    <span>
                      {addedToCart[quickViewProduct.id] ? 'Added to Bag' : 'Add to Bag'}
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      setQuickViewProduct(null);
                      handleNavigateToProduct(quickViewProduct.id);
                    }}
                    className="px-4 py-3 bg-[#F9F8F6] text-[#111111] text-[9px] font-semibold tracking-[0.2em] uppercase hover:bg-[#111111] hover:text-white transition-colors cursor-pointer"
                  >
                    Details
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