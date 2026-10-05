import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingBag, Menu, X, ChevronRight, Loader2 } from 'lucide-react';
import { useCart } from '../Context/CartContext';
import { getSearchSuggestions } from '../api';

const POPULAR_SEARCHES = ['Diamond Ring', 'Gold Chains', 'Pearl Earrings', 'Tennis Bracelet'];
const formatPrice = (value) => `PKR ${Number(value || 0).toLocaleString()}`;

// `to` is the route for the item; items without one are not built yet and stay as "#"
const NAV_ITEMS = [
  { label: 'NEW ARRIVALS', to: '/new-arrivals', hasDropdown: true },
  { label: 'RINGS', to: '/rings', hasDropdown: false },
  { label: 'NECKLACES', to: '/necklaces', hasDropdown: false },
  { label: 'EARRINGS', to: '/earrings', hasDropdown: false },
  { label: 'BRACELETS', to: '/bracelets', hasDropdown: false },
  { label: 'FINE JEWELLERY', to: '/fine-jewellery', hasDropdown: true, highlight: true },
  { label: '80S COLLECTION', to: '/80s-collection', hasDropdown: false },
  { label: 'WATCHES', to: '/watches', hasDropdown: false },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Search box state: typed query, live suggestions (GET /products/search/suggestions)
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState({ products: [], links: [] });
  const [suggestLoading, setSuggestLoading] = useState(false);
  const suggestDebounce = useRef(null);

  // Connect to global cart context
  const { totalItems, setIsCartOpen } = useCart();

  useEffect(() => {
    if (suggestDebounce.current) clearTimeout(suggestDebounce.current);

    if (!query.trim()) {
      setSuggestions({ products: [], links: [] });
      setSuggestLoading(false);
      return;
    }

    setSuggestLoading(true);
    suggestDebounce.current = setTimeout(() => {
      getSearchSuggestions(query, 6)
        .then((res) => setSuggestions({ products: res.products || [], links: res.links || [] }))
        .catch(() => setSuggestions({ products: [], links: [] }))
        .finally(() => setSuggestLoading(false));
    }, 300);

    return () => clearTimeout(suggestDebounce.current);
  }, [query]);

  const runSearch = (term) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    setIsSearchOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      {/* Announcement Bar */}
      <div className="bg-black py-2 px-4 text-center">
        <p className="text-white text-xs tracking-widest font-medium">
         Free delivery on orders above PKR 2999+ • USE CODE: LUXURY10
        </p>
      </div>

      {/* Main Header Container */}
      <div className="flex items-center justify-between px-4 py-4 md:px-8">
        {/* Left: Mobile Menu Trigger & Logo */}
        <div className="flex items-center space-x-4">
          <button
            className="xl:hidden p-1 text-black focus:outline-none"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Mobile Menu"
          >
            <Menu size={24} />
          </button>

          <Link to="/" className="focus:outline-none">
            <span className="text-2xl font-serif font-bold tracking-widest text-black">
              ZELORA
            </span>
          </Link>
        </div>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden xl:flex items-center space-x-6">
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

        {/* Right: User, Search & Global Cart Trigger */}
        <div className="flex items-center space-x-4">
          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              className="p-2 text-black hover:opacity-70 transition-opacity"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              aria-label="User Account"
            >
              <User size={22} />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-11 w-48 bg-white border border-gray-200 shadow-xl rounded-sm py-2 z-50">
                <a href="#" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-50">
                  My Account
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-50">
                  Orders
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-50">
                  Wishlist
                </a>
                <div className="h-px bg-gray-100 my-1" />
                <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                  Sign Out
                </a>
              </div>
            )}
          </div>

          {/* Search Trigger */}
          <button
            className="p-2 text-black hover:opacity-70 transition-opacity"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Open Search"
          >
            <Search size={22} />
          </button>

          {/* Global Cart Bag Trigger */}
          <button
            className="p-2 text-black hover:text-[#D4AF37] transition-colors relative"
            onClick={() => setIsCartOpen(true)}
            aria-label="View Shopping Bag"
          >
            <ShoppingBag size={22} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {totalItems}
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
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center pt-20 px-4"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="bg-white w-full max-w-xl rounded-lg p-6 shadow-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                runSearch(query);
              }}
              className="flex items-center border-b border-gray-300 pb-2 mb-4"
            >
              <Search size={20} className="text-gray-400 mr-3 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search rings, necklaces, bracelets..."
                className="w-full text-base focus:outline-none bg-transparent"
                autoFocus
              />
              {suggestLoading && <Loader2 size={16} className="animate-spin text-gray-400 ml-2 shrink-0" />}
              <button type="button" onClick={() => setIsSearchOpen(false)} className="ml-2 shrink-0" aria-label="Close search">
                <X size={22} />
              </button>
            </form>

            {query.trim() ? (
              <div>
                {/* Matching product thumbnails */}
                {suggestions.products.length > 0 && (
                  <div className="space-y-1 mb-4">
                    {suggestions.products.map((product) => (
                      <button
                        key={product._id}
                        onClick={() => {
                          navigate(`/product/${product.slug || product._id}`);
                          setIsSearchOpen(false);
                        }}
                        className="w-full flex items-center gap-3 p-2 text-left hover:bg-gray-50 rounded-md transition-colors"
                      >
                        <div className="w-11 h-11 bg-gray-100 shrink-0 overflow-hidden rounded-sm">
                          {product.image?.url && (
                            <img src={product.image.url} alt="" className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900 truncate">{product.name}</p>
                          <p className="text-xs text-gray-400">{formatPrice(product.price)}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Matching navbar pages, e.g. typing "ring" links to the Rings page */}
                {suggestions.links.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {suggestions.links.map((link) => (
                      <Link
                        key={link.slug}
                        to={`/${link.slug}`}
                        onClick={() => setIsSearchOpen(false)}
                        className="bg-gray-100 text-gray-800 text-xs px-3 py-1.5 rounded-full hover:bg-gray-200"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}

                {!suggestLoading && suggestions.products.length === 0 && suggestions.links.length === 0 && (
                  <p className="text-sm text-gray-400 mb-4">No matches yet - press Enter to search anyway.</p>
                )}

                <button
                  onClick={() => runSearch(query)}
                  className="w-full text-left text-xs font-semibold text-black border-t border-gray-100 pt-3 hover:text-[#D4AF37] transition-colors"
                >
                  See all results for "{query}"
                </button>
              </div>
            ) : (
              <>
                <p className="text-xs font-bold text-gray-400 tracking-wider mb-3">POPULAR SEARCHES</p>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => runSearch(tag)}
                      className="bg-gray-100 text-gray-800 text-xs px-3 py-1.5 rounded-full cursor-pointer hover:bg-gray-200"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}