"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

interface FilterSidebarProps {
  selectedSkinType: string[];
  setSelectedSkinType: (types: string[]) => void;
  selectedCategory: string[];
  setSelectedCategory: (categories: string[]) => void;
}

const skinTypes = ["Oily", "Dry", "Sensitive"];
const categories = ["Serums", "Toners", "Accessories"];

export const FilterSidebar = ({
  selectedSkinType,
  setSelectedSkinType,
  selectedCategory,
  setSelectedCategory,
}: FilterSidebarProps) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSkinType = (type: string) => {
    if (selectedSkinType.includes(type)) {
      setSelectedSkinType(selectedSkinType.filter((t) => t !== type));
    } else {
      setSelectedSkinType([...selectedSkinType, type]);
    }
  };

  const toggleCategory = (cat: string) => {
    if (selectedCategory.includes(cat)) {
      setSelectedCategory(selectedCategory.filter((c) => c !== cat));
    } else {
      setSelectedCategory([...selectedCategory, cat]);
    }
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-lg mb-3 text-slate-800">Skin Type</h3>
        <div className="flex flex-wrap gap-2">
          {skinTypes.map((type) => (
            <button
              key={type}
              onClick={() => toggleSkinType(type)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                selectedSkinType.includes(type)
                  ? "bg-[#5D6D7E] text-white"
                  : "bg-white/60 text-slate-700 hover:bg-[#D4A373]/20"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-serif text-lg mb-3 text-slate-800">Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                selectedCategory.includes(cat)
                  ? "bg-[#5D6D7E] text-white"
                  : "bg-white/60 text-slate-700 hover:bg-[#D4A373]/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="md:hidden sticky top-4 z-20 w-full px-4">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="w-full bg-white/80 backdrop-blur-md rounded-full py-3 px-6 shadow-md flex items-center justify-center gap-2 border border-[#D4A373]/20"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="font-medium">Filter Products</span>
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 shrink-0 sticky top-24 h-fit bg-white/30 backdrop-blur-sm rounded-2xl p-5 border border-[#D4A373]/10">
        <FilterContent />
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsMobileOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-[#F9F7F5] rounded-t-3xl p-6 max-h-[70vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-serif text-2xl">Filters</h2>
              <button onClick={() => setIsMobileOpen(false)} className="text-slate-500 text-2xl">
                ✕
              </button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}
    </>
  );
};