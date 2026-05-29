"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Gift } from "lucide-react";

export default function BundleCard({ bundle }) {
  const { addToCart } = useCart();
  const savings = bundle.originalPrice ? bundle.originalPrice - bundle.price : 0;

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row">
      <div className="relative md:w-2/5 aspect-square md:aspect-auto bg-[#F4ECE3]">
        <Image src={bundle.image} alt={bundle.name} fill className="object-cover" />
        <div className="absolute top-4 left-4 bg-[#FF6B5E] text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
          <Gift className="w-3 h-3" />
          <span>Bundle & Save</span>
        </div>
      </div>
      <div className="p-6 md:w-3/5 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-serif text-[#1F1F1F] mb-2">{bundle.name}</h3>
          <p className="text-[#4A4A4A] text-sm mb-4">{bundle.description}</p>
          {bundle.items && bundle.items.length > 0 && (
            <div className="space-y-1 mb-4">
              {bundle.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-[#1F1F1F]/80">
                  <span className="text-[#79A38A]">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-2xl font-bold text-[#FF6B5E]">
              KSh {bundle.price.toLocaleString()}
            </span>
            {bundle.originalPrice && (
              <>
                <span className="text-sm text-[#4A4A4A] line-through">
                  KSh {bundle.originalPrice.toLocaleString()}
                </span>
                <span className="text-xs bg-[#79A38A] text-white px-2 py-0.5 rounded-full">
                  Save KSh {savings}
                </span>
              </>
            )}
          </div>
        </div>
        <button
          onClick={() =>
            addToCart({
              id: bundle.id,
              name: bundle.name,
              price: bundle.price,
              image: bundle.image,
            })
          }
          className="w-full bg-[#1F1F1F] text-white py-3 rounded-full font-medium hover:bg-[#FF6B5E] transition"
        >
          Add Bundle to Cart
        </button>
      </div>
    </div>
  );
}