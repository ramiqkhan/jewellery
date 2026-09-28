import React from 'react';
import { Link } from 'react-router-dom';
import { RotateCcw, RefreshCw, ShieldCheck, Truck, HelpCircle, AlertCircle } from 'lucide-react';

export default function ReturnExchange() {
  const lastUpdated = "September 2026";

  const policies = [
    {
      id: "policy-overview",
      icon: <RotateCcw className="w-5 h-5 text-[#D4AF37]" />,
      title: "1. 14-Day Complientary Return Policy",
      content: (
        <>
          <p className="mb-3">
            At Zelora, we are dedicated to ensuring absolute satisfaction with your luxury acquisitions. If you are not entirely delighted with your purchase, we offer complimentary returns within <strong>14 days of receipt</strong> for a full refund or store credit.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li>Items must be in pristine, unworn, and original condition.</li>
            <li>All original packaging, diamond certification certificates, authenticity cards, protective stickers, and presentation boxes must be included.</li>
            <li>Timepieces must not have undergone link removals, strap alterations, or case adjustments.</li>
          </ul>
        </>
      ),
    },
    {
      id: "exchange-process",
      icon: <RefreshCw className="w-5 h-5 text-[#D4AF37]" />,
      title: "2. Size & Piece Exchanges",
      content: (
        <p className="leading-relaxed">
          To exchange a ring for a different size or select an alternative timepiece or fine jewellery creation, please initiate an exchange through our Concierge within 14 days. Once your returned piece passes our Quality Assurance inspection, your replacement piece will be dispatched with priority shipping.
        </p>
      ),
    },
    {
      id: "custom-items",
      icon: <AlertCircle className="w-5 h-5 text-[#D4AF37]" />,
      title: "3. Bespoke & Non-Returnable Creations",
      content: (
        <>
          <p className="mb-3">To maintain quality standards, certain items are non-refundable:</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li><strong>Bespoke & Custom Orders:</strong> Pieces crafted to custom specifications or modified with custom engravings.</li>
            <li><strong>Final Sale Items:</strong> Products explicitly marked as Final Sale or Archive Piece during promotional events.</li>
            <li><strong>Damaged or Altered Items:</strong> Any item showing signs of wear, unapproved third-party sizing, or missing security tags.</li>
          </ul>
        </>
      ),
    },
    {
      id: "return-shipping",
      icon: <Truck className="w-5 h-5 text-[#D4AF37]" />,
      title: "4. Return Shipping & Collection",
      content: (
        <p className="leading-relaxed">
          Zelora provides insured, fully tracked return shipping labels for all eligible returns. Upon approving your request, our Concierge team will issue a prepaid shipping label or schedule a secure courier pick-up from your preferred address.
        </p>
      ),
    },
    {
      id: "refund-processing",
      icon: <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />,
      title: "5. Inspection & Refund Timeline",
      content: (
        <p className="leading-relaxed">
          Upon arrival at our atelier, each creation undergoes rigorous verification by our master jewellers and horologists. Once approved, your refund will be processed to your original payment method within <strong>5–7 business days</strong>.
        </p>
      ),
    },
  ];

  return (
    <main className="bg-[#FCFCFB] text-[#1A1A1A] min-h-screen">
      {/* Header Banner */}
      <section className="bg-[#111111] text-white px-6 py-16 md:py-24 text-center">
        <nav aria-label="Breadcrumb" className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-4">
          <Link to="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">Returns & Exchanges</span>
        </nav>
        <p className="text-[10px] uppercase font-semibold tracking-[0.35em] text-[#D4AF37] mb-2">
          Client Care & Assurance
        </p>
        <h1 className="text-3xl md:text-4xl font-serif font-light tracking-[0.2em] uppercase">
          Returns & Exchanges
        </h1>
        <div className="w-10 h-px bg-[#D4AF37] mx-auto mt-4 mb-5" />
        <p className="text-xs text-gray-400 font-serif tracking-widest uppercase">
          Last Updated: {lastUpdated}
        </p>
      </section>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="bg-white p-8 md:p-14 border border-[#EAE6DF] shadow-xs">
          <p className="text-sm font-serif leading-relaxed text-gray-700 mb-12 border-b border-[#EAE6DF] pb-8">
            Each creation at <strong>Zelora</strong> represents a commitment to fine craftsmanship and elegance. We provide a seamless return and exchange experience to guarantee complete confidence with every order.
          </p>

          {/* Policy Sections */}
          <div className="space-y-12">
            {policies.map((section) => (
              <article key={section.id} className="border-b border-[#F0ECE1] pb-10 last:border-0 last:pb-0">
                <div className="flex items-center gap-3 mb-4">
                  {section.icon}
                  <h2 className="text-lg md:text-xl font-serif font-light uppercase tracking-wider text-[#111111]">
                    {section.title}
                  </h2>
                </div>
                <div className="text-xs md:text-sm text-gray-600 font-sans leading-relaxed pl-8">
                  {section.content}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Action / Concierge Contact Box */}
        <div className="mt-12 text-center bg-[#F9F8F6] p-8 border border-[#EAE6DF]">
          <div className="inline-flex p-3 bg-white border border-[#EAE6DF] rounded-full mb-3 text-[#D4AF37]">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-serif uppercase tracking-[0.2em] mb-2 text-[#111111]">
            Need Assistance With A Return or Exchange?
          </h3>
          <p className="text-xs text-gray-500 mb-5 font-serif max-w-md mx-auto">
            Our Concierge team is ready to guide you step-by-step through initiating a return or arranging a product exchange.
          </p>
          <Link
            to="/contact-us"
            className="inline-block px-8 py-3.5 bg-[#111111] text-white text-[10px] uppercase tracking-[0.25em] font-semibold hover:bg-[#D4AF37] hover:text-black transition-colors"
          >
            Initiate Request via Concierge
          </Link>
        </div>
      </div>
    </main>
  );
}