import './sideBar.css'

const categories = [
  "Men's Clothing",
  "Women's Clothing",
  "Jewelry",
  "Electronics",
];

const brands = [
  "Brand 1",
  "Brand 2",
  "Brand 3",
];

const Sidebar = () => {
  return (
    <aside className="w-64 flex-shrink-0">
      <div className="border border-slate-200 rounded-lg p-4 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-slate-800">Filter</h2>
        
        {/* Categories Section */}
        <div className="mb-6">
          <h3 className="font-medium mb-2 text-slate-700">Category</h3>
          <div className="space-y-2">
            {categories.map((category, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 text-indigo-600 focus:ring-indigo-500"
                />
                {category}
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Section */}
        <div className="mb-6">
          <h3 className="font-medium mb-2 text-slate-700">Price Range</h3>
          <div className="space-y-2">
            <input
              type="range"
              className="w-full accent-indigo-600"
              min="0"
              max="1000"
              step="10"
            />
            <div className="text-sm text-slate-600">$0 - $1000</div>
          </div>
        </div>

        {/* Brands Section */}
        <div className="mb-6">
          <h3 className="font-medium mb-2 text-slate-700">Brand</h3>
          <div className="space-y-2">
            {brands.map((brand, index) => (
              <label key={index} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2 text-indigo-600 focus:ring-indigo-500"
                />
                {brand}
              </label>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors">
          Reset
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
