"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Star, ShoppingBag, Heart, Share2 } from "lucide-react";
import { useCart } from "@/contexts";

// Product data (copy this from your main page)
const allProducts = [
  // ... your products array (same as in page.tsx) ...
];

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const found = allProducts.find(p => p.id === id);
    if (found) setProduct(found);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Product not found</p>
          <button onClick={() => router.back()} className="mt-4 text-amber-600 underline">
            Go back
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({ ...product, quantity: 1 });
    }
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={20} /> Back to shop
        </button>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-gray-900">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span className="font-medium">{product.rating}</span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">{product.sold}+ sold</span>
            </div>
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <p className="mt-6 text-gray-600 leading-relaxed">
              {product.description ||
                "Premium quality product. Made with care and attention to detail."}
            </p>

            <div className="mt-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                >
                  -
                </button>
                <span className="text-lg font-medium w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="mt-8 w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2"
            >
              <ShoppingBag size={20} /> Add to Cart
            </button>

            <div className="mt-4 flex gap-4">
              <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm">
                <Heart size={18} /> Save to wishlist
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm">
                <Share2 size={18} /> Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}