import React from 'react';
import { Truck, ShieldCheck, RefreshCw, Sparkles } from 'lucide-react';

const VALUE_PROPS = [
  {
    icon: Truck,
    title: 'Insured Shipping',
    description: 'Complimentary worldwide delivery',
  },
  {
    icon: ShieldCheck,
    title: 'Certified Authenticity',
    description: 'GIA certified diamonds & metals',
  },
  {
    icon: RefreshCw,
    title: 'Lifetime Warranty',
    description: 'Complimentary cleaning & care',
  },
  {
    icon: Sparkles,
    title: 'Signature Packaging',
    description: 'Gift boxed with custom ribbons',
  },
];

export default function ValueProps() {
  return (
    <section
      aria-label="Our promises"
      className="border-y border-[#EAE6DF] bg-[#FCFCFB] py-10 md:py-14 px-6"
    >
      <ul className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-y-10 list-none m-0 p-0">
        {VALUE_PROPS.map(({ icon: Icon, title, description }, index) => (
          <li
            key={title}
            className={`group flex flex-col items-center text-center px-4 lg:px-8 ${
              index > 0 ? 'lg:border-l lg:border-[#EAE6DF]' : ''
            }`}
          >
            {/* Icon in a fine gold ring that fills on hover */}
            <span className="flex items-center justify-center w-14 h-14 rounded-full border border-[#D4AF37]/40 text-[#D4AF37] mb-5 transition-all duration-500 group-hover:bg-[#D4AF37] group-hover:text-white group-hover:border-[#D4AF37] group-hover:-translate-y-1">
              <Icon size={22} strokeWidth={1.25} aria-hidden="true" />
            </span>

            <h4 className="text-[11px] md:text-xs font-semibold tracking-[0.25em] uppercase text-[#1A1A1A]">
              {title}
            </h4>

            <div className="w-6 h-px bg-[#D4AF37] my-3 transition-all duration-500 group-hover:w-12" />

            <p className="text-xs text-gray-500 leading-relaxed max-w-[200px]">
              {description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
