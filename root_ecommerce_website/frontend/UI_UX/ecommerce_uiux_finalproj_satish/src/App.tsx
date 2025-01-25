import AdBanner from "./components/AdBanner";
import Navbar from "./components/Navbar";
import Sidebar from "./components/SideBar";
import ProductGrid from "./components/ProductGrid";
import "./App.css";
import bannerImage1 from "./bannerimage1.jpg";
import bannerImage2 from "./bannerimage2.jpg";
import bannerImage3 from "./bannerimage3.jpg";
import bannerImage4 from "./bannerimage4.png";
import { productsForCategoryWatches, productsForCategoryClothing, productsForCategoryBooks } from './components/CategoryProductData/productsData';
import {totalCategoryData} from './components/CategoryProductData/categoryData';

export function App() {
  const images = [bannerImage1, bannerImage2, bannerImage3, bannerImage4];

  // Manually defined lists for text and products
  const categoryList = totalCategoryData;
  const productLists = [productsForCategoryWatches, productsForCategoryClothing, productsForCategoryBooks];

  return (
    <div className="w-full min-h-screen bg-slate-50">
      <AdBanner imageUrls={images} />
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <Sidebar />
          <div className="flex-1">
            {categoryList.map((category, index) => (
              <div key={index} className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-2xl font-medium text-slate-800">
                    {category.name}
                  </h1>
                </div>
                <ProductGrid products={productLists[index]} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
