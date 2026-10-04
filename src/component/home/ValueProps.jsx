import React from 'react';
import { Package, ShoppingCart, ShieldCheck, MessageSquare } from 'lucide-react';

const VALUE_PROPS = [
  {
    icon: Package,
    title: 'NATIONWIDE DELIVERY',
    description: 'Standard shipping included on every order.',
  },
  {
    icon: ShoppingCart,
    title: 'SAFE CHECKOUT',
    description: 'Encrypted payments for secure shopping.',
  },
  {
    icon: ShieldCheck,
    title: 'LIFETIME COVERAGE',
    description: 'Long-term protection on select pieces.',
  },
  {
    icon: MessageSquare,
    title: '100K+ CUSTOMERS',
    description: 'Loved by a fast-growing community in Pakistan.',
  },
];

export default function ValueProps() {
  return (
    <section
      aria-label="Our promises"
      className="bg-white py-8 md:py-12 px-6 border-y border-[#EAE6DF]"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
        {VALUE_PROPS.map(({ icon: Icon, title, description }) => (
          <div key={title} className="flex items-start gap-4">
            {/* Minimal Icon */}
            <div className="shrink-0 text-[#111111] pt-0.5">
              <Icon size={28} strokeWidth={1.2} />
            </div>

            {/* Content */}
            <div className="flex flex-col">
              <h4 className="text-xs font-medium tracking-[0.15em] uppercase text-[#111111] mb-1">
                {title}
              </h4>
              <p className="text-xs text-gray-500 font-sans font-light leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}