import React from 'react';
import { Truck, ShieldCheck, Clock, RefreshCw, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ShippingPolicy() {
  return (
    <div className="bg-white min-h-screen text-[#111111] font-sans antialiased py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gray-500 hover:text-[#D4AF37] transition-colors mb-10"
        >
          <ArrowLeft size={14} /> Back to Home
        </Link>

        {/* Page Header */}
        <div className="border-b border-[#EAE6DF] pb-8 mb-12">
          <span className="text-[10px] uppercase tracking-[0.35em] text-[#D4AF37] font-semibold block mb-2">
            Client Care & Services
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif uppercase tracking-[0.15em] font-light text-[#111111]">
            Shipping & Delivery Policy
          </h1>
          <p className="text-xs text-gray-500 font-sans mt-3 tracking-wide">
            Last Updated: October 2026
          </p>
        </div>

        {/* Highlight Stats / Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-[#FAF9F6] border border-[#EAE6DF] rounded-xl flex flex-col items-center text-center">
            <Truck size={24} className="text-[#D4AF37] mb-3" />
            <h3 className="text-xs font-serif uppercase tracking-widest text-[#111111] font-semibold mb-1">
              Complimentary Express
            </h3>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              On all insured domestic orders over Rs 5,000.
            </p>
          </div>

          <div className="p-6 bg-[#FAF9F6] border border-[#EAE6DF] rounded-xl flex flex-col items-center text-center">
            <ShieldCheck size={24} className="text-[#D4AF37] mb-3" />
            <h3 className="text-xs font-serif uppercase tracking-widest text-[#111111] font-semibold mb-1">
              Fully Insured
            </h3>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Every shipment is protected from dispatch to delivery.
            </p>
          </div>

          <div className="p-6 bg-[#FAF9F6] border border-[#EAE6DF] rounded-xl flex flex-col items-center text-center">
            <Clock size={24} className="text-[#D4AF37] mb-3" />
            <h3 className="text-xs font-serif uppercase tracking-widest text-[#111111] font-semibold mb-1">
              Discreet Packaging
            </h3>
            <p className="text-[11px] text-gray-500 leading-relaxed">
              Delivered in unbranded exterior boxes for maximum security.
            </p>
          </div>
        </div>

        {/* Policy Content Sections */}
        <div className="space-y-10 text-xs text-gray-600 leading-relaxed tracking-wide">
          
          {/* Section 1 */}
          <section>
            <h2 className="text-sm font-serif uppercase tracking-[0.2em] text-[#111111] font-semibold mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span> 1. Order Processing Time
            </h2>
            <p>
              All Zelora creations are subjected to rigorous quality control checks prior to dispatch. Standard pieces require <strong>1–2 business days</strong> for processing. Custom orders, bespoke sizing, or specialized gemstone settings may require an additional <strong>3–5 business days</strong>.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-sm font-serif uppercase tracking-[0.2em] text-[#111111] font-semibold mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span> 2. Shipping Methods & Estimated Delivery
            </h2>
            <div className="overflow-x-auto border border-[#EAE6DF] rounded-lg mt-4">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-[#FAF9F6] border-b border-[#EAE6DF] uppercase tracking-wider text-[#111111]">
                  <tr>
                    <th className="p-3.5 font-semibold">Shipping Tier</th>
                    <th className="p-3.5 font-semibold">Estimated Time</th>
                    <th className="p-3.5 font-semibold">Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAE6DF]">
                  <tr>
                    <td className="p-3.5 font-medium text-[#111111]">Standard Express</td>
                    <td className="p-3.5">2 – 4 Business Days</td>
                    <td className="p-3.5">Free (Orders over Rs 5,000)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-[#111111]">VIP White Glove / Urgent Courier</td>
                    <td className="p-3.5">1 – 2 Business Days</td>
                    <td className="p-3.5">Rs 500</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-medium text-[#111111]">International Priority Air</td>
                    <td className="p-3.5">5 – 9 Business Days</td>
                    <td className="p-3.5">Calculated at Checkout</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className="text-sm font-serif uppercase tracking-[0.2em] text-[#111111] font-semibold mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span> 3. Signature & Verification Requirement
            </h2>
            <p>
              To safeguard your valuable purchase, all Zelora deliveries require an adult signature upon receipt. If no adult is available at the delivery location, courier partners will attempt re-delivery or hold the package at a secure regional station for pickup.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-sm font-serif uppercase tracking-[0.2em] text-[#111111] font-semibold mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span> 4. Order Tracking
            </h2>
            <p>
              Once your order has been dispatched, you will receive an email and SMS confirmation containing a real-time tracking reference number. You can monitor your shipment status via our website under the <strong className="text-[#111111]">Track Order</strong> section or directly on the courier partner's portal.
            </p>
          </section>

          {/* Section 5 */}
          <section className="bg-[#FAF9F6] border border-[#EAE6DF] p-6 rounded-xl">
            <h2 className="text-sm font-serif uppercase tracking-[0.2em] text-[#111111] font-semibold mb-2">
              Need Personal Assistance?
            </h2>
            <p className="text-gray-500 mb-4">
              If you have specific delivery instructions, delivery deadline queries, or address change requests, our Concierge team is available 24/7.
            </p>
            <div className="flex flex-wrap gap-4 text-[11px] font-semibold uppercase tracking-wider">
              {/* <a href="mailto:concierge@zelora.com" className="text-[#111111] hover:text-[#D4AF37] underline">
                concierge@zelora.com
              </a> */}
              <span className="text-gray-300">•</span>
              <a href="tel:+923000000000" className="text-[#111111] hover:text-[#D4AF37] underline">
                +92 (300) 000-0000
              </a>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}