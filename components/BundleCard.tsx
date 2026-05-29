// components/BundleCard.tsx
import Image from "next/image";
import { ShoppingBag, Gift } from "lucide-react";
import { useCart } from "@/contexts";

// Add this type (adjust fields as needed)
interface Bundle {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  // add other fields if you use them (rating, sold, etc.)
}

export default function BundleCard({ bundle }: { bundle: Bundle }) {
  const { addToCart } = useCart();
  const savings = bundle.originalPrice ? bundle.originalPrice - bundle.price : 0;

  return (
    <div className="relative bg-white rounded-2xl shadow-md overflow-hidden">
      {/* your existing JSX */}
    </div>
  );
}
