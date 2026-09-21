import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, ArrowLeft, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    paymentMethod: 'cod',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const shippingFee = totalPrice > 50000 ? 0 : 1500;
  const finalTotal = totalPrice + shippingFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (clearCart) clearCart();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <main className="bg-[#FCFCFB] min-h-screen flex items-center justify-center px-6 py-16">
        <div className="max-w-md w-full bg-white border border-[#EAE6DF] p-8 text-center space-y-6 shadow-sm">
          <CheckCircle2 size={56} className="text-[#D4AF37] mx-auto stroke-1" />
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
            Order Confirmed
          </p>
          <h1 className="text-2xl font-serif text-[#1A1A1A]">Thank You For Your Purchase</h1>
          <p className="text-xs text-gray-500 font-serif leading-relaxed">
            Your order has been placed successfully. A confirmation email with order details has been sent to <span className="font-semibold text-black">{formData.email || 'your email'}</span>.
          </p>
          <div className="pt-4 border-t border-[#EAE6DF]">
            <button
              onClick={() => navigate('/')}
              className="w-full py-3.5 bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-colors"
            >
              Return to Store
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#FCFCFB] text-[#1A1A1A] min-h-screen py-10 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between border-b border-[#EAE6DF] pb-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-500 hover:text-[#D4AF37] transition-colors"
          >
            <ArrowLeft size={14} /> Back to Store
          </Link>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Lock size={12} className="text-[#D4AF37]" />
            <span className="uppercase tracking-widest text-[10px]">Secure Checkout</span>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#EAE6DF]">
            <h2 className="text-lg font-serif uppercase tracking-widest text-gray-500 mb-4">
              Your Shopping Bag is Empty
            </h2>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.2em] hover:bg-[#D4AF37] hover:text-black transition-colors"
            >
              Explore Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmitOrder} className="space-y-8">
                {/* 1. Contact Details */}
                <div>
                  <h2 className="text-xs font-serif uppercase tracking-[0.25em] text-[#1A1A1A] mb-4 pb-2 border-b border-[#EAE6DF]">
                    1. Contact Details
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-500 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full border border-[#EAE6DF] bg-white p-3 text-base sm:text-xs focus:outline-none focus:border-[#D4AF37]"
                        placeholder="example@domain.com"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Shipping Address */}
                <div>
                  <h2 className="text-xs font-serif uppercase tracking-[0.25em] text-[#1A1A1A] mb-4 pb-2 border-b border-[#EAE6DF]">
                    2. Shipping Address
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-500 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full border border-[#EAE6DF] bg-white p-3 text-base sm:text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-500 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full border border-[#EAE6DF] bg-white p-3 text-base sm:text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] uppercase tracking-wider text-gray-500 mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full border border-[#EAE6DF] bg-white p-3 text-base sm:text-xs focus:outline-none focus:border-[#D4AF37]"
                        placeholder="House / Apartment number and street name"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-500 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full border border-[#EAE6DF] bg-white p-3 text-base sm:text-xs focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-gray-500 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full border border-[#EAE6DF] bg-white p-3 text-base sm:text-xs focus:outline-none focus:border-[#D4AF37]"
                        placeholder="+92 300 0000000"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Payment Method */}
                <div>
                  <h2 className="text-xs font-serif uppercase tracking-[0.25em] text-[#1A1A1A] mb-4 pb-2 border-b border-[#EAE6DF]">
                    3. Payment Method
                  </h2>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 border border-[#EAE6DF] bg-white cursor-pointer hover:border-[#D4AF37] transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="accent-[#1A1A1A]"
                      />
                      <div className="text-xs">
                        <p className="font-medium text-[#1A1A1A]">Cash on Delivery (COD)</p>
                        <p className="text-gray-400 text-[11px] mt-0.5">Pay with cash upon delivery.</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-4 border border-[#EAE6DF] bg-white cursor-pointer hover:border-[#D4AF37] transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bank"
                        checked={formData.paymentMethod === 'bank'}
                        onChange={handleInputChange}
                        className="accent-[#1A1A1A]"
                      />
                      <div className="text-xs">
                        <p className="font-medium text-[#1A1A1A]">Direct Bank Transfer</p>
                        <p className="text-gray-400 text-[11px] mt-0.5">Make your payment directly into our bank account.</p>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#1A1A1A] text-white text-xs uppercase tracking-[0.25em] hover:bg-[#D4AF37] hover:text-black transition-all duration-300 font-medium"
                >
                  Place Order
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-[#EAE6DF] p-6 sticky top-8">
                <h2 className="text-xs font-serif uppercase tracking-[0.25em] text-[#1A1A1A] mb-6 pb-2 border-b border-[#EAE6DF]">
                  Order Summary
                </h2>

                <div className="space-y-4 max-h-80 overflow-y-auto pr-2 mb-6">
                  {cart.map((item, idx) => {
                    const imgUrl = Array.isArray(item.images) ? item.images[0] : item.image;
                    return (
                      <div key={idx} className="flex gap-4 items-center">
                        <div className="w-16 h-16 bg-[#F9F8F6] border border-[#EAE6DF] flex-shrink-0">
                          <img src={imgUrl} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 text-xs">
                          <h3 className="font-serif text-[#1A1A1A]">{item.title}</h3>
                          <p className="text-gray-400 text-[11px]">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-xs font-mono font-semibold text-[#1A1A1A]">
                          PKR {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="space-y-2 border-t border-[#EAE6DF] pt-4 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <span className="font-mono text-black">PKR {totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Shipping</span>
                    <span className="font-mono text-black">
                      {shippingFee === 0 ? 'FREE' : `PKR ${shippingFee.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold text-sm border-t border-[#EAE6DF] pt-3 mt-3 text-[#1A1A1A]">
                    <span>Total</span>
                    <span className="font-mono text-[#D4AF37]">PKR {finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-6 border-t border-[#EAE6DF] pt-4 flex items-center justify-center gap-2 text-gray-400 text-[10px] uppercase tracking-wider">
                  <ShieldCheck size={14} className="text-[#D4AF37]" />
                  <span>Insured Express Delivery</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}