import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './pages/home';
import Footer from './component/Footer';

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
      <div className="min-h-screen bg-[#FCFCFB] text-[#1A1A1A]">
        {/* Global Navigation Header Appears on All Pages */}
        <Navbar />

        {/* Route Controller */}
        <Routes>
          {/* Home Route - Renders your Home page with the Video Banner & Sections */}
          <Route path="/" element={<Home />} />

          {/* Additional Pages Routing Example */}
          <Route path="/shop" element={<ShopPage />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}