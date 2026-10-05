import React, { useEffect, useState } from 'react';
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
  Sparkles,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { useCart } from '../Context/CartContext';
import { getProduct } from '../api';

const formatPrice = (value) => `PKR ${Number(value || 0).toLocaleString()}`;

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, setIsCartOpen } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Fetch the product by its slug or Mongo id (GET /api/products/:idOrSlug)
  useEffect(() => {
    setLoading(true);
    setError('');
    setProduct(null);
    getProduct(id)
      .then((res) => setProduct(res.product))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  // Reset local selection state whenever a new product has loaded
  useEffect(() => {
    setSelectedImage(0);
    setQuantity(1);
    setIsWishlisted(false);
    setSelectedSize(product?.sizes?.[0]?.label || '');
  }, [product]);

  const hasSizes = product?.sizes?.length > 0;
  const selectedStock = hasSizes
    ? product.sizes.find((s) => s.label === selectedSize)?.stock ?? 0
    : product?.stock ?? 0;
  const outOfStock = hasSizes ? product?.sizes?.every((s) => s.stock <= 0) : product?.stock <= 0;

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: hasSizes ? `${product._id}-${selectedSize}` : product._id,
      productId: product._id,
      title: product.name,
      price: product.price,
      image: product.images?.[0]?.url || '',
      size: hasSizes ? selectedSize : '',
      quantity,
    });

    if (typeof setIsCartOpen === 'function') {
      setIsCartOpen(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 size={24} className="animate-spin text-gray-400" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center gap-4">
        <AlertCircle size={32} className="text-red-400" />
        <p className="text-sm font-serif tracking-widest text-gray-500">
          {error ? 'COULD NOT LOAD THIS PRODUCT' : 'PRODUCT NOT FOUND'}
        </p>
        {error && <p className="text-xs text-gray-400 max-w-sm">{error}</p>}
        <Link to="/" className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] hover:underline">
          Back to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white text-[#1A1A1A] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <nav className="max-w-7xl mx-auto mb-8 flex items-center space-x-2 text-xs uppercase tracking-widest text-gray-500">
        <Link to="/" className="hover:text-black transition-colors">Home</Link>
        <ChevronRight size={12} />
        <Link to={`/${product.category}`} className="hover:text-black transition-colors">
          {product.category}
        </Link>
        <ChevronRight size={12} />
        <span className="text-black font-semibold truncate">{product.name}</span>
      </nav>

      {/* Main Product Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        {/* Left Column: Image Gallery (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          {/* Thumbnails */}
          {product.images?.length > 1 && (
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[550px] scrollbar-none">
              {product.images.map((img, idx) => (
                <button
                  key={img.url}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative flex-shrink-0 w-20 h-20 border transition-all ${
                    selectedImage === idx ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]' : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.alt || `${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Featured Hero Image */}
          <div className="flex-1 aspect-square bg-gray-50 border border-gray-100 relative overflow-hidden group">
            {product.images?.[selectedImage] ? (
              <img
                src={product.images[selectedImage].url}
                alt={product.images[selectedImage].alt || product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs uppercase tracking-widest text-gray-400">
                No Image
              </div>
            )}
            {product.badge && (
              <span className="absolute top-4 left-4 bg-black text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1">
                {product.badge}
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Product Info & Purchase Actions (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-[#D4AF37] uppercase">
              {product.brand}
            </span>
            <h1 className="text-3xl font-serif text-black mt-1 font-normal tracking-wide">
              {product.name}
            </h1>
            <p className="text-xs font-mono text-gray-400 mt-1">SKU: {product.sku}</p>
          </div>

          <div className="flex items-baseline space-x-3 border-b border-gray-100 pb-6">
            <span className="text-2xl font-serif text-black font-semibold">
              {formatPrice(product.price)}
            </span>
            {product.priceNote && (
              <span className="text-xs text-gray-500 font-light">{product.priceNote}</span>
            )}
          </div>

          {/* Description */}
          {product.description && (
            <p className="text-sm font-light text-gray-700 leading-relaxed">
              {product.description}
            </p>
          )}

          {/* Size Selector */}
          {hasSizes && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-bold tracking-wider uppercase text-black">
                  {product.sizeLabel || 'Select Size'}:{' '}
                  <span className="font-normal text-gray-600">{selectedSize}</span>
                </label>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(size.label)}
                    disabled={size.stock <= 0}
                    className={`px-4 py-2 text-xs font-medium tracking-wider border transition-all disabled:opacity-30 disabled:cursor-not-allowed ${
                      selectedSize === size.label
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-black border-gray-200 hover:border-black'
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!outOfStock && selectedStock > 0 && selectedStock <= 5 && (
            <p className="text-xs text-amber-600">Only {selectedStock} left</p>
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
              disabled={outOfStock || (hasSizes && !selectedSize)}
              className="flex-1 bg-black text-white hover:bg-[#D4AF37] transition-colors duration-300 py-4 px-6 text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center space-x-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ShoppingBag size={18} />
              <span>{outOfStock ? 'OUT OF STOCK' : 'ADD TO BAG'}</span>
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
          {product.specifications?.length > 0 && (
            <div className="border-t border-gray-100 pt-6 mt-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-black mb-3 flex items-center gap-2">
                <Sparkles size={14} className="text-[#D4AF37]" /> Specifications
              </h2>
              <ul className="space-y-2">
                {product.specifications.map((detail, idx) => (
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
