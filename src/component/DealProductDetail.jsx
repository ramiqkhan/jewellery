import React, { useState } from 'react';
import { ImageOff, Sparkles } from 'lucide-react';
import { formatPrice, getPricing } from '../utils/pricing';

// One piece of a deal, shown in full on the deal page: gallery, price, description, sizes and specs.
// There's no add-to-bag here on purpose - the deal is bought as a whole from the page header.
export default function DealProductDetail({ product, index, count }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const images = product.images || [];
  const image = images[selectedImage];
  const { onSale, originalPrice, finalPrice, percent } = getPricing(product);

  const hasSizes = product.sizes?.length > 0;
  const stock = hasSizes ? product.sizes.reduce((sum, size) => sum + (size.stock ?? 0), 0) : product.stock ?? 0;
  const outOfStock = stock <= 0;

  return (
    <article className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 py-10 md:py-14 border-b border-[#EAE6DF] last:border-b-0">
      {/* Gallery */}
      <div className="flex flex-col gap-3">
        <div className="relative aspect-square bg-[#F4F2EE] border border-[#EAE6DF] overflow-hidden">
          {image ? (
            <img src={image.url} alt={image.alt || product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-gray-300">
              <ImageOff size={22} strokeWidth={1.25} />
              <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400">Image Coming Soon</span>
            </div>
          )}
          {onSale && (
            <span className="absolute top-3 left-3 bg-[#1A1A1A] text-[#D4AF37] text-[10px] font-bold tracking-[0.15em] uppercase px-2.5 py-1.5">
              -{percent}%
            </span>
          )}
          {outOfStock && (
            <div className="absolute bottom-0 inset-x-0 bg-[#1A1A1A]/95 text-[#D4AF37] text-[10px] uppercase font-bold tracking-[0.25em] py-2.5 text-center">
              Out of Stock
            </div>
          )}
        </div>

        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto">
            {images.map((img, idx) => (
              <button
                key={img.url}
                type="button"
                onClick={() => setSelectedImage(idx)}
                aria-label={`Show image ${idx + 1}`}
                className={`shrink-0 w-16 h-16 border transition-all ${
                  selectedImage === idx ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]' : 'border-[#EAE6DF] opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img.url} alt={img.alt || `${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col">
        <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-3">
          Piece {index + 1} of {count}
        </p>
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#9A7B1F] font-semibold">
          {[product.brand, product.category].filter(Boolean).join(' · ')}
        </p>
        <h2 className="font-serif text-2xl md:text-3xl text-[#1A1A1A] mt-1.5 tracking-wide capitalize">{product.name}</h2>
        {product.sku && <p className="text-[11px] font-mono text-gray-400 mt-1">SKU: {product.sku}</p>}

        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-[#EAE6DF] pb-5 mt-5">
          {onSale && <span className="text-sm text-gray-400 line-through">{formatPrice(originalPrice)}</span>}
          <span className="text-xl font-serif font-semibold text-[#1A1A1A]">{formatPrice(finalPrice)}</span>
          {onSale && (
            <span className="text-[10px] font-semibold text-[#9A7B1F] bg-[#FFFBF0] border border-[#D4AF37]/40 px-2 py-0.5 uppercase tracking-wider">
              Save {percent}%
            </span>
          )}
          {product.priceNote && <span className="text-[11px] text-gray-500 w-full">{product.priceNote}</span>}
        </div>

        {product.description && (
          <p className="text-sm font-light text-gray-700 leading-relaxed mt-5 whitespace-pre-line">{product.description}</p>
        )}

        {hasSizes && (
          <div className="mt-5">
            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#1A1A1A] mb-2">
              {product.sizeLabel || 'Sizes'}
            </p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <span
                  key={size.label}
                  className={`px-3 py-1.5 text-xs border ${
                    (size.stock ?? 0) > 0 ? 'border-[#D9D4CA] text-[#1A1A1A]' : 'border-[#EAE6DF] text-gray-300 line-through'
                  }`}
                >
                  {size.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {!outOfStock && stock <= 5 && <p className="text-xs text-amber-700 mt-4">Only {stock} left</p>}

        {product.specifications?.length > 0 && (
          <div className="border-t border-[#EAE6DF] pt-5 mt-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A] mb-3 flex items-center gap-2">
              <Sparkles size={13} className="text-[#D4AF37]" /> Specifications
            </h3>
            <ul className="space-y-2">
              {product.specifications.map((detail, idx) => (
                <li key={idx} className="text-xs font-light text-gray-600 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                  {/* Some specs are typed as "* Material: ..."; the dot already marks the bullet */}
                  <span>{detail.replace(/^\s*[*•-]\s*/, '')}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}
