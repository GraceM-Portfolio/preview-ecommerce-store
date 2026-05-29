// app/product/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts";

// Type for the product data
type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  mainTab: string;
  sold: number;
  rating: number;
  isNew?: boolean;
  originalPrice?: number;
  isBundle?: boolean;
};

// Product data (same as in page.tsx)
const allProducts: Product[] = [
  // Skincare
  { id: "1", name: "Face Serum (Instant Glow)", price: 49, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400", category: "Serum", mainTab: "skincare", sold: 234, rating: 4.8, isNew: true },
  { id: "2", name: "Daily Body Lotion (Moisturizing)", price: 29, image: "https://images.unsplash.com/photo-1556229162-5c63ed9c4efb?w=400", category: "Lotion", mainTab: "skincare", sold: 189, rating: 4.7 },
  { id: "3", name: "Sunscreen (SPF 50)", price: 35, image: "https://images.unsplash.com/photo-1556229162-5c63ed9c4efb?w=400", category: "Sunscreen", mainTab: "skincare", sold: 456, rating: 4.9 },
  { id: "4", name: "Vitamin C Brightening Serum", price: 59, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400", category: "Serum", mainTab: "skincare", sold: 312, rating: 4.9, isNew: true },
  { id: "5", name: "Hyaluronic Acid Cream", price: 45, image: "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400", category: "Moisturizer", mainTab: "skincare", sold: 145, rating: 4.8, isNew: true },
  { id: "6", name: "Shea Butter Balm", price: 22, image: "https://images.unsplash.com/photo-1591370874773-6702e8f12a22?w=400", category: "Balm", mainTab: "skincare", sold: 98, rating: 4.7 },
  { id: "7", name: "Ceramide Night Cream", price: 52, image: "https://images.unsplash.com/photo-1616690185667-b5bf60b8adbb?w=400", category: "Moisturizer", mainTab: "skincare", sold: 207, rating: 4.9 },
  // Accessories
  { id: "8", name: "Classic Leather Watch", price: 89, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400", category: "Watches", mainTab: "accessories", sold: 89, rating: 4.8, isNew: true },
  { id: "9", name: "Polarized Sunglasses", price: 59, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400", category: "Eyewear", mainTab: "accessories", sold: 156, rating: 4.7 },
  { id: "10", name: "Leather Belt", price: 39, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400", category: "Belts", mainTab: "accessories", sold: 98, rating: 4.6 },
  { id: "11", name: "Silver Necklace", price: 79, image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=400", category: "Jewelry", mainTab: "accessories", sold: 67, rating: 4.9, isNew: true },
  // Outfit
  { id: "12", name: "Cotton Summer Dress", price: 69, image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400", category: "Dresses", mainTab: "outfit", sold: 112, rating: 4.8 },
  { id: "13", name: "Linen Button Shirt", price: 49, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400", category: "Shirts", mainTab: "outfit", sold: 203, rating: 4.7, isNew: true },
  { id: "14", name: "Slim Fit Jeans", price: 65, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400", category: "Jeans", mainTab: "outfit", sold: 178, rating: 4.6 },
  { id: "15", name: "Blazer Jacket", price: 99, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400", category: "Jackets", mainTab: "outfit", sold: 54, rating: 4.9, isNew: true },
  // Bundles
  { id: "b1", name: "Glow Serum + Lotion Bundle", price: 69, originalPrice: 78, image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400", category: "Bundle", mainTab: "bundles", sold: 78, rating: 4.9, isBundle: true },
  { id: "b2", name: "Sun Protection Kit", price: 59, originalPrice: 75, image: "https://images.unsplash.com/photo-1520975661595-6453be3f7070?w=400", category: "Bundle", mainTab: "bundles", sold: 42, rating: 4.8, isBundle: true },
  { id: "b3", name: "Office Ready Combo", price: 149, originalPrice: 198, image: "https://images.unsplash.com/photo-1485527691629-8e370684924c?w=400", category: "Bundle", mainTab: "bundles", sold: 35, rating: 4.7, isBundle: true },
];

export default function ProductPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = allProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-4">Product Not Found</h1>
          <Link href="/" className="text-amber-600 hover:underline">Back to shop</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-800 mb-8">
          <ArrowLeft size={18} /> Back to shop
        </Link>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50">
            <Image src={product.image} alt={product.name} fill className="object-cover" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-light tracking-tight text-gray-900">{product.name}</h1>
            <div className="flex items-center gap-2 mt-4">
              <div className="flex items-center gap-0.5">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span className="text-sm font-medium">{product.rating}</span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-500">{product.sold}+ sold</span>
            </div>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
              )}
            </div>
            <p className="mt-6 text-gray-600 leading-relaxed">
              Premium quality product, carefully curated for your everyday needs. Enjoy fast shipping and exceptional customer support.
            </p>
            <button
              onClick={() => addToCart(product)}
              className="mt-8 w-full py-3 bg-gray-900 text-white rounded-full text-base font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2"
            >
              <ShoppingBag size={20} /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
