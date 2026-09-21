import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

// Component & Page Imports
import Navbar from './component/Navbar';
import CartDrawer from './component/CartDrawer';
import Footer from './component/Footer';

import Home from './pages/home';
import Rings from './pages/Rings';
import NewArrivals from './pages/NewArrivals';
import Necklaces from './pages/Necklaces';
import Earrings from './pages/Earrings';
import Bracelets from './pages/Bracelets';
import FineJewellery from './pages/FineJewellery';
import Bridal from './pages/Bridal';
import Eighties from './pages/Eighties';
import Gifts from './pages/Gifts';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout'; // Checkout Page Import
import ContactUs from './pages/ContactUs'; // Contact Us Page Import

// Context Import
import { CartProvider } from './Context/CartContext';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Placeholder Shop Page
function ShopPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <h1 className="text-3xl font-serif tracking-widest text-[#1A1A1A]">SHOP ALL COLLECTIONS</h1>
      <p className="mt-4 text-gray-500 text-sm">Explore our complete range of fine jewellery.</p>
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-[#FCFCFB] text-[#1A1A1A]">
          <Navbar />
          <CartDrawer />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/rings" element={<Rings />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/necklaces" element={<Necklaces />} />
            <Route path="/earrings" element={<Earrings />} />
            <Route path="/bracelets" element={<Bracelets />} />
            <Route path="/fine-jewellery" element={<FineJewellery />} />
            <Route path="/bridal" element={<Bridal />} />
            <Route path="/80s-collection" element={<Eighties />} />
            <Route path="/gifts" element={<Gifts />} />
            
            {/* Dynamic Product Page Route */}
            <Route path="/product/:id" element={<ProductDetail />} />

            {/* Checkout Route */}
            <Route path="/checkout" element={<Checkout />} />
            {/* Contact Us Route */}
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}