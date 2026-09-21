import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../Context/CartContext';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    totalPrice,
    totalItems,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag size={18} className="text-[#1A1A1A]" />
              <h2 className="text-sm font-serif uppercase tracking-[0.2em] text-[#1A1A1A]">
                Your Shopping Bag ({totalItems})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 text-gray-400 hover:text-[#1A1A1A] transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <ShoppingBag size={48} className="text-gray-300 mb-4 stroke-1" />
                <p className="text-xs font-serif uppercase tracking-widest text-gray-400">
                  Your bag is currently empty
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 text-xs font-serif uppercase tracking-widest text-[#D4AF37] hover:underline"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map((item, index) => {
                const mainImage = Array.isArray(item.images) ? item.images[0] : item.image;

                return (
                  <div
                    key={`${item.id}-${item.size || ''}-${item.variant || ''}-${index}`}
                    className="flex space-x-4 border-b border-gray-100 pb-6"
                  >
                    {/* Item Image */}
                    <div className="w-20 h-20 bg-[#FCFCFB] border border-gray-100 flex-shrink-0 overflow-hidden">
                      <img
                        src={mainImage || 'https://via.placeholder.com/150'}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-xs font-serif text-[#1A1A1A] tracking-wide pr-2">
                            {item.title}
                          </h3>
                          <button
                            onClick={() => removeFromCart(item.id, item.variant)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        {item.size && (
                          <p className="text-[11px] text-gray-400 mt-0.5">Size: {item.size}</p>
                        )}
                        {item.variant && (
                          <p className="text-[11px] text-gray-400">Variant: {item.variant}</p>
                        )}

                        <p className="text-xs font-mono text-[#1A1A1A] mt-1 font-semibold">
                          PKR {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3 border border-gray-200 w-max px-2 py-1 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.variant, item.quantity - 1)}
                          className="text-gray-400 hover:text-[#1A1A1A] transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-xs font-mono px-2 text-[#1A1A1A]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.variant, item.quantity + 1)}
                          className="text-gray-400 hover:text-[#1A1A1A] transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer / Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-[#FCFCFB] space-y-4">
              <div className="flex justify-between text-xs uppercase tracking-wider text-gray-500">
                <span>Subtotal</span>
                <span className="font-mono text-[#1A1A1A] font-bold">
                  PKR {totalPrice.toLocaleString()}
                </span>
              </div>
              <p className="text-[10px] text-gray-400 font-serif italic">
                Shipping and taxes calculated at checkout.
              </p>

              {/* Standard Direct Checkout Button */}
              <Link
                to="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-4 bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.25em] hover:bg-[#D4AF37] hover:text-black transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}