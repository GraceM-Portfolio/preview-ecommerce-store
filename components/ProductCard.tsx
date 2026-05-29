"use client";

import Image from "next/image";
import { useState } from "react";
import { Star } from "lucide-react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    rating?: number;
    sold?: number;
    originalPrice?: number;
  };
  addToCart: (product: any) => void;
  isDeal?: boolean;
}

export default function ProductCard({ product, addToCart, isDeal = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Safety guard
  if (!product || !product.image) {
    console.warn("Invalid product data:", product);
    return null;
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.originalPrice && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Sale
          </span>
        )}
        {isDeal && (
          <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">
            Deal
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-900 text-sm sm:text-base line-clamp-1">{product.name}</h3>
        
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-0.5">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-xs text-gray-600">{product.rating || 4.8}</span>
          </div>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-500">{product.sold || 0}+ sold</span>
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-lg font-semibold text-gray-900">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className={`w-full mt-3 py-2 rounded-full text-sm font-medium transition-all ${
            isDeal
              ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-sm hover:shadow-md'
              : 'bg-black text-white hover:bg-gray-800'
          }`}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}