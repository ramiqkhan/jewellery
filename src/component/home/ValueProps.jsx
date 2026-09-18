import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Sparkles } from 'lucide-react';

export default function ValueProps() {
  return (
    <section className="border-b border-[#EAE6DF] bg-white py-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
        <div className="flex items-center justify-center md:justify-start space-x-4">
          <Truck className="text-[#D4AF37]" size={24} strokeWidth={1.5} />
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase">Insured Shipping</h4>
            <p className="text-[11px] text-gray-500 mt-0.5">Complimentary worldwide delivery</p>
          </div>
        </div>

        <div className="flex items-center justify-center md:justify-start space-x-4">
          <ShieldCheck className="text-[#D4AF37]" size={24} strokeWidth={1.5} />
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase">Certified Authenticity</h4>
            <p className="text-[11px] text-gray-500 mt-0.5">GIA certified diamonds & metals</p>
          </div>
        </div>

        <div className="flex items-center justify-center md:justify-start space-x-4">
          <RefreshCw className="text-[#D4AF37]" size={24} strokeWidth={1.5} />
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase">Lifetime Warranty</h4>
            <p className="text-[11px] text-gray-500 mt-0.5">Complimentary cleaning & care</p>
          </div>
        </div>

        <div className="flex items-center justify-center md:justify-start space-x-4">
          <Sparkles className="text-[#D4AF37]" size={24} strokeWidth={1.5} />
          <div>
            <h4 className="text-xs font-semibold tracking-widest uppercase">Signature Packaging</h4>
            <p className="text-[11px] text-gray-500 mt-0.5">Gift boxed with custom ribbons</p>
          </div>
        </div>
      </div>
    </section>
  );
}