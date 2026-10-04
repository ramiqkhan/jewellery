import React from 'react';
import VideoBanner from '../component/home/bannervid';
import ValueProps from '../component/home/ValueProps';
import Categories from '../component/home/Categories';
import BestSellers from '../component/home/BestSellers';
// import Heritage from '../component/home/Heritage';
import InstagramFeed from '../component/InstagramFeed';

export default function Home() {
  return (
    <div className="bg-[#FCFCFB] text-[#1A1A1A] min-h-screen">
      <VideoBanner />
      <Categories />
      <BestSellers />
      {/* <Heritage /> */}
      <InstagramFeed />
      <ValueProps />
    </div>
  );
}