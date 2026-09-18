import React from 'react';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-[#EAE6DF] pt-20 pb-10 border-t border-[#222222]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Top Newsletter & Concierge Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pb-16 border-b border-[#222222] items-center">
          <div>
            <p className="text-[10px] uppercase font-semibold tracking-[0.35em] text-[#D4AF37] mb-2">
              Private Client Services
            </p>
            <h3 className="text-2xl md:text-3xl font-serif font-light tracking-[0.15em] text-white uppercase">
              Join the Aurelia Inner Circle
            </h3>
            <p className="text-gray-400 text-xs tracking-wide mt-2 max-w-md font-serif">
              Subscribe to receive private invitations to seasonal showcases, bespoke collection releases, and complimentary care guides.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-2">
            <input 
              type="email" 
              placeholder="Enter your email address..."
              className="bg-[#1A1A1A] border border-[#333333] px-5 py-3.5 text-xs text-white placeholder-gray-500 tracking-wide focus:outline-none focus:border-[#D4AF37] flex-1 transition-colors"
            />
            <button className="bg-white text-[#111111] px-8 py-3.5 text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-[#D4AF37] hover:text-white transition-all flex items-center justify-center space-x-2">
              <span>Subscribe</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-16 border-b border-[#222222]">
          
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-serif font-bold tracking-[0.3em] text-white mb-6">
              AURELIA
            </h2>
            <p className="text-gray-400 text-xs tracking-wide leading-relaxed mb-6 font-serif">
              Handcrafted fine jewellery created for everlasting moments and generations of elegance.
            </p>
            <div className="flex space-x-4 text-gray-400">
              {/* Instagram SVG */}
              <a href="#" className="hover:text-[#D4AF37] transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              {/* Facebook SVG */}
              <a href="#" className="hover:text-[#D4AF37] transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* Twitter / X SVG */}
              <a href="#" className="hover:text-[#D4AF37] transition-colors" aria-label="Twitter">
                <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 1: Collections */}
          <div>
            <h4 className="text-xs uppercase font-semibold tracking-[0.25em] text-white mb-6">Collections</h4>
            <ul className="space-y-3 text-xs tracking-wider text-gray-400 font-serif">
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Solitaire Rings</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Diamond Tennis Bracelets</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Akoya Pearl Pendants</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Bridal Sets</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">80's Vintage Line</a></li>
            </ul>
          </div>

          {/* Column 2: Client Care */}
          <div>
            <h4 className="text-xs uppercase font-semibold tracking-[0.25em] text-white mb-6">Client Care</h4>
            <ul className="space-y-3 text-xs tracking-wider text-gray-400 font-serif">
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Bespoke Appointments</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Complimentary Insured Shipping</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Ring Size Guide</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Jewellery Care & Cleaning</a></li>
            </ul>
          </div>

          {/* Column 3: The House */}
          <div>
            <h4 className="text-xs uppercase font-semibold tracking-[0.25em] text-white mb-6">The House</h4>
            <ul className="space-y-3 text-xs tracking-wider text-gray-400 font-serif">
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Our Heritage</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Sustainable Sourcing</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Craftsmanship</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Press & Editorial</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Column 4: Concierge Support */}
          <div>
            <h4 className="text-xs uppercase font-semibold tracking-[0.25em] text-white mb-6">Concierge</h4>
            <ul className="space-y-3 text-xs tracking-wider text-gray-400 font-serif">
              <li className="flex items-center space-x-2.5">
                <Phone size={14} className="text-[#D4AF37]" />
                <span>+1 (800) 555-AURELIA</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail size={14} className="text-[#D4AF37]" />
                <span>concierge@aurelia.com</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <MapPin size={14} className="text-[#D4AF37] mt-0.5" />
                <span>5th Avenue, Luxury District, New York</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Legal Bar */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-[0.2em] uppercase text-gray-500 font-medium">
          <p>© 2026 AURELIA FINE JEWELLERY. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Preferences</a>
          </div>
        </div>

      </div>
    </footer>
  );
}