import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Droplets, Sun, AlertTriangle, HelpCircle } from 'lucide-react';

export default function JewelleryCare() {
  const careGuides = [
    {
      id: 'daily-care',
      icon: <Sparkles className="w-5 h-5 text-[#D4AF37]" />,
      title: '1. Daily Maintenance & Rituals',
      content: (
        <>
          <p className="mb-3">
            Fine jewellery and luxury timepieces should be the last thing you put on when getting dressed and the first thing you take off at night.
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li><strong>Avoid Chemicals:</strong> Remove rings and bracelets before applying perfume, hairspray, lotions, or cosmetics.</li>
            <li><strong>Physical Activities:</strong> Take off fine jewellery before swimming, working out, gardening, or cleaning to prevent scratches or chemical degradation.</li>
            <li><strong>Gently Wipe:</strong> After each wear, wipe your pieces with a soft microfiber cloth to remove skin oils and maintain brilliance.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'cleaning-guide',
      icon: <Droplets className="w-5 h-5 text-[#D4AF37]" />,
      title: '2. Cleaning Gold, Platinum & Diamonds',
      content: (
        <>
          <p className="mb-3">Restore the radiant luster of your precious metals and solid diamonds at home with this simple method:</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li><strong>Soak:</strong> Immerse your piece in a bowl of lukewarm water mixed with a few drops of mild dish liquid for 10–15 minutes.</li>
            <li><strong>Brush Gently:</strong> Use an ultra-soft toothbrush to gently remove residue behind diamond settings and gemstone under-castings.</li>
            <li><strong>Rinse & Dry:</strong> Rinse thoroughly under lukewarm running water (ensure the drain is plugged) and pat dry with a lint-free cloth.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'delicate-gemstones',
      icon: <AlertTriangle className="w-5 h-5 text-[#D4AF37]" />,
      title: '3. Caring for Pearls & Delicate Gems',
      content: (
        <p className="leading-relaxed">
          Organic and porous gems such as pearls, emeralds, opals, and turquoise require delicate care. Never submerge pearls or emeralds in hot water or harsh cleaning solutions. Use only a damp, soft cloth to gently clean pearls after wear. Avoid ultrasonic cleaners, as intense vibrations can fracture porous stones or loosen delicate prong settings.
        </p>
      ),
    },
    {
      id: 'watch-care',
      icon: <Sun className="w-5 h-5 text-[#D4AF37]" />,
      title: '4. Luxury Timepiece Maintenance',
      content: (
        <>
          <p className="mb-3">Preserve the precision engineering of your mechanical and quartz movements:</p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600">
            <li><strong>Water Resistance:</strong> Ensure the winding crown is fully screwed down before any water exposure. Leather straps should never be exposed to water.</li>
            <li><strong>Magnetic Fields:</strong> Avoid placing automatic watches near strong magnetic sources (speakers, laptops, magnetic clasps) to protect timing accuracy.</li>
            <li><strong>Routine Servicing:</strong> We recommend a full mechanical service every 3 to 5 years by an authorized watchmaker.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'storage',
      icon: <Shield className="w-5 h-5 text-[#D4AF37]" />,
      title: '5. Proper Storage Guidelines',
      content: (
        <p className="leading-relaxed">
          Store each piece individually in its original Zelora velvet box or a soft pouch to prevent metals and gemstones from scratching against one another. Keep your jewellery in a cool, dry place away from direct sunlight and excessive humidity.
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
          <span className="text-gray-300">Jewellery Care & Cleaning</span>
        </nav>
        <p className="text-[10px] uppercase font-semibold tracking-[0.35em] text-[#D4AF37] mb-2">
          Preserving Timeless Elegance
        </p>
        <h1 className="text-3xl md:text-4xl font-serif font-light tracking-[0.2em] uppercase">
          Jewellery Care & Cleaning
        </h1>
        <div className="w-10 h-px bg-[#D4AF37] mx-auto mt-4 mb-5" />
        <p className="text-xs text-gray-400 font-serif tracking-widest uppercase">
          Expert Advice for Maintaining Your Precious Pieces
        </p>
      </section>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="bg-white p-8 md:p-14 border border-[#EAE6DF] shadow-xs">
          <p className="text-sm font-serif leading-relaxed text-gray-700 mb-12 border-b border-[#EAE6DF] pb-8">
            Every <strong>Zelora</strong> creation is crafted to endure for generations. With thoughtful daily wear, proper storage, and gentle maintenance, your fine jewellery and luxury timepieces will retain their brilliance and beauty for a lifetime.
          </p>

          {/* Policy Sections */}
          <div className="space-y-12">
            {careGuides.map((section) => (
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

        {/* Concierge Support Box */}
        <div className="mt-12 text-center bg-[#F9F8F6] p-8 border border-[#EAE6DF]">
          <div className="inline-flex p-3 bg-white border border-[#EAE6DF] rounded-full mb-3 text-[#D4AF37]">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-serif uppercase tracking-[0.2em] mb-2 text-[#111111]">
            Need Professional Servicing or Cleaning?
          </h3>
          <p className="text-xs text-gray-500 mb-5 font-serif max-w-md mx-auto">
            Our master jewellers provide complimentary lifetime inspection, professional ultrasonic cleaning, and prong checks for all Zelora creations.
          </p>
          <Link
            to="/contact-us"
            className="inline-block px-8 py-3.5 bg-[#111111] text-white text-[10px] uppercase tracking-[0.25em] font-semibold hover:bg-[#D4AF37] hover:text-black transition-colors"
          >
            Contact Concierge Care
          </Link>
        </div>
      </div>
    </main>
  );
}