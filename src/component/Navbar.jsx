import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X, ChevronRight, Trash2 } from 'lucide-react';

// `to` is the route for the item; items without one are not built yet and stay as "#"
const NAV_ITEMS = [
  { label: 'NEW ARRIVALS', to: '/new-arrivals', hasDropdown: true },
  { label: 'RINGS', to: '/rings', hasDropdown: false },
  { label: 'NECKLACES', to: '/necklaces', hasDropdown: false },
  { label: 'EARRINGS', to: '/earrings', hasDropdown: false },
  { label: 'BRACELETS', to: '/bracelets', hasDropdown: false },
  { label: 'FINE JEWELLERY', to: '/fine-jewellery', hasDropdown: true, highlight: true },
  { label: 'BRIDAL', to: '/bridal', hasDropdown: false },
  { label: 'GIFTS', to: '/gifts', hasDropdown: false },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  const [cartItems, setCartItems] = useState([
    { id: 1, name: '18K Gold Diamond Ring', price: '$850.00', size: '6', qty: 1 },
    { id: 2, name: 'Sterling Silver Pearl Necklace', price: '$320.00', size: '18"', qty: 1 },
  ]);

  const updateQty = (id, delta) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : item;
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* Announcement Bar */}
      <div className="bg-black py-2 px-4 text-center">
        <p className="text-white text-xs tracking-widest font-medium">
          COMPLIMENTARY INSURED SHIPPING ON ALL ORDERS • USE CODE: LUXURY10
        </p>
      </div>

      {/* Main Header Container */}
      <div className="flex items-center justify-between px-4 py-4 md:px-8">
        
        {/* Left: Mobile Menu Trigger & Logo */}
        <div className="flex items-center space-x-4">
          <button 
            className="md:hidden p-1 text-black focus:outline-none"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>

          <Link to="/" className="focus:outline-none">
            <span className="text-2xl font-serif font-bold tracking-widest text-black">
              AURELIA
            </span>
          </Link>
        </div>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden lg:flex items-center space-x-6">
          {NAV_ITEMS.map((item, index) => {
            const className = ({ isActive } = {}) =>
              `text-xs font-semibold tracking-wider pb-1 border-b-2 hover:border-black transition-colors ${
                isActive ? 'border-[#D4AF37]' : 'border-transparent'
              } ${item.highlight ? 'text-amber-700' : 'text-gray-900'}`;

            return item.to ? (
              <NavLink key={index} to={item.to} className={className}>
                {item.label}
              </NavLink>
            ) : (
              <a key={index} href="#" className={className()}>
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right: Icons */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button 
              className="p-2 text-black hover:opacity-70 transition-opacity"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <User size={22} />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-11 w-48 bg-white border border-gray-200 shadow-xl rounded-sm py-2 z-50">
                <a href="#" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-50">My Account</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-50">Orders</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-50">Wishlist</a>
                <div className="h-px bg-gray-100 my-1" />
                <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-50">Sign Out</a>
              </div>
            )}
          </div>

          <button 
            className="p-2 text-black hover:opacity-70 transition-opacity"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search size={22} />
          </button>

          <button 
            className="p-2 text-black hover:opacity-70 transition-opacity relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag size={22} />
            {cartItems.length > 0 && (
              <span className="absolute top-1 right-1 bg-black text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="bg-white w-4/5 max-w-sm h-full p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <span className="text-xl font-serif font-bold tracking-widest">MENU</span>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <div className="flex flex-col space-y-4">
                {NAV_ITEMS.map((item, idx) => {
                  const className = `text-sm font-semibold tracking-wide flex justify-between items-center py-2 border-b border-gray-100 ${
                    item.highlight ? 'text-amber-700' : 'text-gray-900'
                  }`;
                  const content = (
                    <>
                      {item.label}
                      {item.hasDropdown && <ChevronRight size={16} className="text-gray-400" />}
                    </>
                  );

                  return item.to ? (
                    <Link
                      key={idx}
                      to={item.to}
                      className={className}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {content}
                    </Link>
                  ) : (
                    <a key={idx} href="#" className={className}>
                      {content}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
        </div>
      )}

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center pt-20 px-4">
          <div className="bg-white w-full max-w-xl rounded-lg p-6 shadow-2xl">
            <div className="flex items-center border-b border-gray-300 pb-2 mb-4">
              <Search size={20} className="text-gray-400 mr-3" />
              <input 
                type="text"
                placeholder="Search rings, necklaces, bracelets..."
                className="w-full text-base focus:outline-none bg-transparent"
                autoFocus
              />
              <button onClick={() => setIsSearchOpen(false)}>
                <X size={22} />
              </button>
            </div>
            <p className="text-xs font-bold text-gray-400 tracking-wider mb-3">POPULAR SEARCHES</p>
            <div className="flex flex-wrap gap-2">
              {['Diamond Ring', 'Gold Chains', 'Pearl Earrings', 'Tennis Bracelet'].map((tag, i) => (
                <span key={i} className="bg-gray-100 text-gray-800 text-xs px-3 py-1.5 rounded-full cursor-pointer hover:bg-gray-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="bg-white w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                <span className="text-lg font-serif font-bold tracking-tight">YOUR SHOPPING BAG ({cartItems.length})</span>
                <button onClick={() => setIsCartOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              <div className="py-4 overflow-y-auto max-h-[60vh]">
                {cartItems.length === 0 ? (
                  <div className="py-20 text-center">
                    <ShoppingBag size={48} className="mx-auto text-gray-300 mb-3" />
                    <p className="text-gray-500 text-sm">Your shopping bag is empty.</p>
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div key={item.id} className="flex py-4 border-b border-gray-100 justify-between items-center">
                      <div className="flex-1 pr-4">
                        <h4 className="text-sm font-bold text-gray-900">{item.name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">Size: {item.size}</p>
                        <p className="text-sm font-semibold text-black mt-1">{item.price}</p>
                      </div>

                      <div className="flex items-center space-x-2 border border-gray-200 rounded px-2 py-1">
                        <button onClick={() => updateQty(item.id, -1)} className="text-base font-bold px-1">-</button>
                        <span className="text-sm font-bold">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="text-base font-bold px-1">+</button>
                      </div>

                      <button onClick={() => removeItem(item.id)} className="ml-4 text-red-500 hover:text-red-700">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {cartItems.length > 0 && (
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between mb-4">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="text-sm font-bold text-black">$1,170.00</span>
                </div>
                <button className="w-full bg-black text-white py-3.5 rounded-sm text-xs font-bold tracking-widest hover:bg-gray-800 transition-colors">
                  PROCEED TO CHECKOUT
                </button>
              </div>
            )}
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setIsCartOpen(false)} />
        </div>
      )}
    </header>
  );
}