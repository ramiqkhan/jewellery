import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// import BannerImg from '../component/home/bannerimg';
import VideoBanner from '../component/home/bannervid';
// import ValueProps from '../component/home/ValueProps';
import Categories from '../component/home/Categories';
import BestSellers from '../component/home/BestSellers';
// import Heritage from '../component/home/Heritage';
import CustomerReviews from '../component/CustomerReviews';
import InstagramFeed from '../component/InstagramFeed';
import GenderCollections from '../component/home/GenderCollections';

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === '#gender-collections') {
      // Small timeout ensures the DOM is fully rendered before scrolling
      setTimeout(() => {
        const element = document.getElementById('gender-collections');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [hash]);

  return (
    <div className="bg-[#FCFCFB] text-[#1A1A1A] min-h-screen">
      <VideoBanner />
      {/* <BannerImg /> */}
      <Categories />
      
      <BestSellers />
      <GenderCollections />
      {/* <Heritage /> */}
      <CustomerReviews />
      <InstagramFeed />
      {/* <ValueProps /> */}
    </div>
  );
}