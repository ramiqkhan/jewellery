import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './pages/home';
import Rings from './pages/Rings';
import NewArrivals from './pages/NewArrivals';
import Necklaces from './pages/Necklaces';
import Earrings from './pages/Earrings';
import Bracelets from './pages/Bracelets';
import FineJewellery from './pages/FineJewellery';
import Bridal from './pages/Bridal';
import Gifts from './pages/Gifts';
import Footer from './component/Footer';

// Start every page at the top when the route changes
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Simple placeholder for another page (e.g. Shop or Rings)
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
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-[#FCFCFB] text-[#1A1A1A]">
        {/* Global Navigation Header Appears on All Pages */}
        <Navbar />

        {/* Route Controller */}
        <Routes>
          {/* Home Route - Renders your Home page with the Video Banner & Sections */}
          <Route path="/" element={<Home />} />

          {/* Additional Pages Routing Example */}
          <Route path="/shop" element={<ShopPage />} />

          {/* Rings Route - Full ring collection */}
          <Route path="/rings" element={<Rings />} />

          {/* New Arrivals Route - Latest pieces across all categories */}
          <Route path="/new-arrivals" element={<NewArrivals />} />

          <Route path="/necklaces" element={<Necklaces />} />
          <Route path="/earrings" element={<Earrings />} />
          <Route path="/bracelets" element={<Bracelets />} />
          <Route path="/fine-jewellery" element={<FineJewellery />} />
          <Route path="/bridal" element={<Bridal />} />
          <Route path="/gifts" element={<Gifts />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}