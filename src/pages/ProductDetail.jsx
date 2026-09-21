import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  ChevronRight, 
  Minus, 
  Plus, 
  Sparkles 
} from 'lucide-react';
import { useCart } from '../context/CartContext';

// Sample product database matching route IDs
const PRODUCTS_DATA = [
  {
    id: 'zelora-ring-01',
    title: 'The Royal Solitaire Diamond Ring',
    category: 'Rings',
    price: 185000,
    sku: 'ZLR-RNG-01',
    description:
      'Handcrafted in 18k solid yellow gold, featuring an extraordinary center-cut brilliant diamond. Designed for timeless elegance and designed to capture light from every angle.',
    details: [
      '18K Solid Yellow Gold',
      '1.5 Carat Solitaire Cut Diamond',
      'VS1 Clarity, F Color Grade',
      'Hand-finished in our master atelier',
      'Includes Certificate of Authenticity',
    ],
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&q=80&w=1000',
    ],
    sizes: ['US 5', 'US 6', 'US 7', 'US 8', 'US 9'],
  },
  {
    id: 'zelora-necklace-01',
    title: 'Aura Emerald & Diamond Pendant',
    category: 'Necklaces',
    price: 245000,
    sku: 'ZLR-NCK-01',
    description:
      'A striking Colombian emerald surrounded by a halo of micro-pave diamonds, suspended on an adjustable 18k gold chain.',
    details: [
      '18K Solid Gold Chain (18-20 inches)',
      '2.1 Carat Natural Colombian Emerald',
      '0.4 Carat Total Weight Round Diamonds',
      'Secure Lobster Lock Clasp',
    ],
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1000',
    ],
    sizes: ['16 Inch', '18 Inch', '20 Inch'],
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, setIsCartOpen } = useCart();

  // Find product by ID or fall back to the first item
  const product = PRODUCTS_DATA.find((item) => item.id === id) || PRODUCTS_DATA[0];

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Reset local state variables whenever the URL product ID or product data changes
  useEffect(() => {
    setSelectedImage(0);
    setQuantity(1);
    setIsWishlisted(false);
    if (product?.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    } else {
      setSelectedSize('');
    }
  }, [id, product]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: `${product.id}-${selectedSize || 'default'}`,
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.images?.[0] || '',
      size: selectedSize,
      quantity: quantity,
    });
    
    if (typeof setIsCartOpen === 'function') {
      setIsCartOpen(true);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-sm font-serif tracking-widest text-gray-500">PRODUCT NOT FOUND</p>
      </div>
    );
  }

  return (
    <div className="bg-white text-[#1A1A1A] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <nav className="max-w-7xl mx-auto mb-8 flex items-center space-x-2 text-xs uppercase tracking-widest text-gray-500">
        <Link to="/" className="hover:text-black transition-colors">Home</Link>
        <ChevronRight size={12} />
        <Link to={`/${product.category.toLowerCase()}`} className="hover:text-black transition-colors">
          {product.category}
        </Link>
        <ChevronRight size={12} />
        <span className="text-black font-semibold truncate">{product.title}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Image Gallery (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[550px] scrollbar-none">
            {product.images?.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative flex-shrink-0 w-20 h-20 border transition-all ${
                  selectedImage === idx ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]' : 'border-gray-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`${product.title} view ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Featured Hero Image */}
          <div className="flex-1 aspect-square bg-gray-50 border border-gray-100 relative overflow-hidden group">
            <img
              src={product.images?.[selectedImage] || product.images?.[0]}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <span className="absolute top-4 left-4 bg-black text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1">
              HAUTE JOAILLERIE
            </span>
          </div>
        </div>

        {/* Right Column: Product Info & Purchase Actions (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-[#D4AF37] uppercase">
              ZELORA FINE JEWELLERY
            </span>
            <h1 className="text-3xl font-serif text-black mt-1 font-normal tracking-wide">
              {product.title}
            </h1>
            <p className="text-xs font-mono text-gray-400 mt-1">SKU: {product.sku}</p>
          </div>

          <div className="flex items-baseline space-x-3 border-b border-gray-100 pb-6">
            <span className="text-2xl font-serif text-black font-semibold">
              PKR {product.price?.toLocaleString()}
            </span>
            <span className="text-xs text-gray-500 font-light">Taxes & Insured Express Shipping Included</span>
          </div>

          {/* Description */}
          <p className="text-sm font-light text-gray-700 leading-relaxed">
            {product.description}
          </p>

          {/* Size Selector */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-bold tracking-wider uppercase text-black">
                  Select Size: <span className="font-normal text-gray-600">{selectedSize}</span>
                </label>
                <button className="text-[11px] underline tracking-widest text-gray-500 hover:text-black">
                  SIZE GUIDE
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-xs font-medium tracking-wider border transition-all ${
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-black border-gray-200 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Controls */}
          <div>
            <label className="block text-xs font-bold tracking-wider uppercase text-black mb-3">
              Quantity
            </label>
            <div className="inline-flex items-center border border-gray-300">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="p-3 text-gray-600 hover:text-black transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={14} />
              </button>
              <span className="px-6 text-sm font-mono font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="p-3 text-gray-600 hover:text-black transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Actions: Add to Bag & Wishlist */}
          <div className="flex space-x-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-black text-white hover:bg-[#D4AF37] transition-colors duration-300 py-4 px-6 text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center space-x-2"
            >
              <ShoppingBag size={18} />
              <span>ADD TO BAG</span>
            </button>
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`p-4 border transition-colors ${
                isWishlisted
                  ? 'border-red-500 bg-red-50 text-red-500'
                  : 'border-gray-300 text-black hover:border-black'
              }`}
              aria-label="Save to Wishlist"
            >
              <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Product Specifications */}
          {product.details && product.details.length > 0 && (
            <div className="border-t border-gray-100 pt-6 mt-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-black mb-3 flex items-center gap-2">
                <Sparkles size={14} className="text-[#D4AF37]" /> Specifications
              </h2>
              <ul className="space-y-2">
                {product.details.map((detail, idx) => (
                  <li key={idx} className="text-xs font-light text-gray-600 flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Guarantees & Shipping Specs */}
          <div className="grid grid-cols-3 gap-2 border-t border-gray-100 pt-6 text-center">
            <div className="flex flex-col items-center">
              <Truck size={20} className="text-gray-700 mb-1" />
              <span className="text-[10px] font-bold tracking-wider uppercase text-black">Complimentary Express Shipping</span>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck size={20} className="text-gray-700 mb-1" />
              <span className="text-[10px] font-bold tracking-wider uppercase text-black">Certified Authenticity Guarantee</span>
            </div>
            <div className="flex flex-col items-center">
              <RotateCcw size={20} className="text-gray-700 mb-1" />
              <span className="text-[10px] font-bold tracking-wider uppercase text-black">14-Day Bespoke Returns</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}