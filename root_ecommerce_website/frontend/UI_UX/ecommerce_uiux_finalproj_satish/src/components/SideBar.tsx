import "./sideBar.css";
import { totalCategoryData } from "./CategoryProductData/categoryData";
import { totalBrandData } from "./CategoryProductData/brandData";

interface SidebarProps {
  onCategoryChange: (category: string, isChecked: boolean) => void;
  selectedCategories: string[];
  onBrandChange: (brand: string, isChecked: boolean) => void;
  selectedBrands: string[];
  onReset: () => void;
  onMinPriceChange: (price: number) => void;
  onMaxPriceChange: (price: number) => void;
  selectedMinPrice: number;
  selectedMaxPrice: number;
}

const Sidebar = ({
  onCategoryChange,
  selectedCategories,
  onBrandChange,
  selectedBrands,
  onReset,
  onMinPriceChange,
  onMaxPriceChange,
  selectedMinPrice,
  selectedMaxPrice,
}: SidebarProps) => {
  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    if (newMin <= selectedMaxPrice) {
      onMinPriceChange(newMin);
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    if (newMax >= selectedMinPrice) {
      onMaxPriceChange(newMax);
    }
  };

  return (
    <aside className="w-64 flex-shrink-0">
      <div className="border border-slate-200 rounded-lg p-4 shadow-sm">
        <h2 className="text-xl font-medium mb-4 text-slate-800">Filter</h2>

        {/* Categories Section */}
        <div className="mb-6">
          <h3 className="font-medium mb-2 text-slate-700">Category</h3>
          <div className="space-y-2">
            <label key="all" className="flex items-center">
              <input
                type="checkbox"
                checked={selectedCategories.includes("All")}
                onChange={(e) => onCategoryChange("All", e.target.checked)}
                className="mr-2 text-indigo-600 focus:ring-indigo-500"
              />
              All
            </label>

            {totalCategoryData.map((category) => (
              <label key={category.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.name)}
                  onChange={(e) => onCategoryChange(category.name, e.target.checked)}
                  className="mr-2 text-indigo-600 focus:ring-indigo-500"
                />
                {category.name}
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Section (Dual Slider) */}
        <div className="mb-6">
          <h3 className="font-medium mb-2 text-slate-700">Price Range</h3>
          <div className="space-y-2">
            <div className="relative w-full h-10 flex items-center">
              <input
                type="range"
                className="absolute w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                min="0"
                max="1000"
                step="10"
                value={selectedMinPrice}
                onChange={handleMinPriceChange}
              />
              <input
                type="range"
                className="absolute w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                min="0"
                max="1000"
                step="10"
                value={selectedMaxPrice}
                onChange={handleMaxPriceChange}
              />
            </div>
            <div className="text-sm text-slate-600">
              ${selectedMinPrice} - ${selectedMaxPrice}
            </div>
          </div>
        </div>

        {/* Brands Section */}
        <div className="mb-6">
          <h3 className="font-medium mb-2 text-slate-700">Brand</h3>
          <div className="space-y-2">
            <label key="allBrands" className="flex items-center">
              <input
                type="checkbox"
                checked={selectedBrands.includes("All")}
                onChange={(e) => onBrandChange("All", e.target.checked)}
                className="mr-2 text-indigo-600 focus:ring-indigo-500"
              />
              All
            </label>

            {totalBrandData.map((brand) => (
              <label key={brand.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand.name)}
                  onChange={(e) => onBrandChange(brand.name, e.target.checked)}
                  className="mr-2 text-indigo-600 focus:ring-indigo-500"
                />
                {brand.name}
              </label>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <button
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors"
          onClick={onReset}
        >
          Reset
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
