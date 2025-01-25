// import React from "react";
// import { Search, ShoppingCart } from "lucide-react";
import AdBanner from "./components/AdBanner";
import Navbar from "./components/Navbar";
import Sidebar from "./components/SideBar";
import ProductGrid from "./components/ProductGrid";
import './App.css'
import bannerImage1 from './bannerimage1.jpg'; // Replace with your image path
import bannerImage2 from './bannerimage2.jpg'; // Replace with your image path
import bannerImage3 from './bannerimage3.jpg'; // Replace with your image path
import bannerImage4 from './bannerimage4.png'; // Replace with your image path


export function App() {
  const images = [
    bannerImage1,
    bannerImage2,
    bannerImage3,
    bannerImage4
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50">
      <AdBanner imageUrls={images} />
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <Sidebar />
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-slate-800">
                Men's Clothing
              </h1>
              <button className="px-4 py-2 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors">
                Show All
              </button>
            </div>
            <ProductGrid />
          </div>
        </div>
      </main>
    </div>
  );
}
