"use client";

import Image from "next/image";
import { X, Star } from "lucide-react";
import { motion } from "framer-motion";

type Product = { id: string; name: string; price: number; image: string; rating: number; sold: number; };

export default function ProductDetailModal({
  product,
  onClose,
  addToCart,
}: {
  product: Product;
  onClose: () => void;
  addToCart: (p: any) => void;
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden"
      >
        <div className="relative h-96">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
          <button onClick={onClose} className="absolute top-4 right-4 bg-white p-3 rounded-full">
            <X size={24} />
          </button>
        </div>
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-3">{product.name}</h2>
          <div className="flex items-center gap-2 mb-6">
            <Star size={20} fill="#f59e0b" className="text-amber-500" />
            <span>{product.rating} • {product.sold}+ sold</span>
          </div>
          <p className="text-4xl font-bold text-orange-600 mb-8">KSh {product.price}</p>
          <button
            onClick={() => {
              addToCart(product);
              onClose();
            }}
            className="w-full py-4 bg-gradient-to-r from-red-900 to-orange-600 text-white rounded-2xl text-lg font-semibold"
          >
            Add to Cart
          </button>
        </div>
      </motion.div>
    </div>
  );
}