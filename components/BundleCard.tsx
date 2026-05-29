"use client";

import Image from "next/image";
import { ShoppingBag, Gift } from "lucide-react";
import { useCart } from "@/contexts";

interface Bundle {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  sold?: number;
}

export default function BundleCard({ bundle }: { bundle: Bundle }) {
  const { addToCart } = useCart();
  const savings = bundle.originalPrice ? bundle.originalPrice - bundle.price : 0;

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4">
      <div className="relative w-full h-48">
        <Image src={bundle.image} alt={bundle.name} fill className="object-cover rounded-xl" />
      </div>
      <h3 className="font-semibold mt-4">{bundle.name}</h3>
      <div className="flex items-baseline gap-2 mt-2">
        <span className="text-xl font-bold">${bundle.price}</span>
        {bundle.originalPrice && (
          <span className="text-sm text-gray-400 line-through">${bundle.originalPrice}</span>
        )}
      </div>
      {savings > 0 && (
        <p className="text-sm text-green-600 mt-1">Save ${savings}</p>
      )}
      <button
        onClick={() => addToCart(bundle)}
        className="mt-4 w-full py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition"
      >
        Add to Cart
      </button>
    </div>
  );
}
