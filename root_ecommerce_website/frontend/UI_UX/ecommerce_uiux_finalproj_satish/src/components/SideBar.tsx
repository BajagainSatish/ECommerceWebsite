// import React from "react";
import './sideBar.css'

const Sidebar = () => {
  return (
    <aside className="w-64 flex-shrink-0">
      <div className="border border-slate-200 rounded-lg p-4 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-slate-800">Filter</h2>
        <div className="mb-6">
          <h3 className="font-medium mb-2 text-slate-700">Category</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 text-indigo-600 focus:ring-indigo-500"
              />
              Men's Clothing
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 text-indigo-600 focus:ring-indigo-500"
              />
              Women's Clothing
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 text-indigo-600 focus:ring-indigo-500"
              />
              Jewelry
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 text-indigo-600 focus:ring-indigo-500"
              />
              Electronics
            </label>
          </div>
        </div>
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
        <div className="mb-6">
          <h3 className="font-medium mb-2 text-slate-700">Brand</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 text-indigo-600 focus:ring-indigo-500"
              />
              Brand 1
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 text-indigo-600 focus:ring-indigo-500"
              />
              Brand 2
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 text-indigo-600 focus:ring-indigo-500"
              />
              Brand 3
            </label>
          </div>
        </div>
        <button className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors">
          Reset
        </button>
      </div>
    </aside>
  );
};
export default Sidebar;
