// data/products.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  category: "Serums" | "Toners" | "Accessories" | "Cleanser" | "Moisturizer";
  skinType: ("Oily" | "Dry" | "Sensitive")[];
  image: string;
  hoverImage?: string;
  isBundle?: boolean;
  description: string;
  originalPrice?: number;
  items?: string[];
}

export const products: Product[] = [
  // Best sellers (individual products)
  {
    id: "1",
    name: "Niacinamide Brightening Serum",
    price: 1850,
    category: "Serums",
    skinType: ["Oily", "Sensitive"],
    image: "https://images.unsplash.com/photo-1620916566390-51b23567c2d8?w=600&auto=format",
    hoverImage: "https://images.unsplash.com/photo-1620916566390-51b23567c2d8?w=600&auto=format&fit=crop&blend=00000030",
    description: "5% Niacinamide + Zinc, controls oil and brightens dark spots.",
  },
  {
    id: "2",
    name: "Salicylic Clear Gel",
    price: 1650,
    category: "Serums",
    skinType: ["Oily"],
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=600&auto=format",
    hoverImage: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=600&auto=format&fit=crop&blend=00000020",
    description: "2% Salicylic Acid, unclogs pores and prevents breakouts.",
  },
  {
    id: "3",
    name: "Retinol Night Cream",
    price: 2200,
    category: "Moisturizer",
    skinType: ["Dry", "Sensitive"],
    image: "https://images.unsplash.com/photo-1615859131861-052f0641a60e?w=600&auto=format",
    hoverImage: "https://images.unsplash.com/photo-1615859131861-052f0641a60e?w=600&auto=format&fit=crop&blend=00000030",
    description: "0.3% Retinol + Squalane, anti-aging and skin renewal.",
  },
  {
    id: "4",
    name: "Silk Scrunchies (3pcs)",
    price: 850,
    category: "Accessories",
    skinType: ["Oily", "Dry", "Sensitive"],
    image: "https://images.unsplash.com/photo-1598965402089-897d52b2b8f7?w=600&auto=format",
    hoverImage: "https://images.unsplash.com/photo-1598965402089-897d52b2b8f7?w=600&auto=format&fit=crop&blend=00000020",
    description: "Gentle on hair, prevents breakage.",
  },
  // Bundle products (skinType added)
  {
    id: "b1",
    name: "Glow & Protect Duo",
    price: 3200,
    originalPrice: 4050,
    category: "Serums",
    skinType: ["Oily", "Dry"],   // ✅ added
    image: "https://images.unsplash.com/photo-1617897903246-71924e6cd92c?w=600&auto=format",
    isBundle: true,
    description: "Niacinamide Serum + Salicylic Gel + Free Sunscreen sample",
    items: ["Niacinamide Serum", "Salicylic Gel", "Sunscreen sample"],
  },
  {
    id: "b2",
    name: "Ultimate Night Renewal",
    price: 3500,
    originalPrice: 4750,
    category: "Moisturizer",
    skinType: ["Dry", "Sensitive"],   // ✅ added
    image: "https://images.unsplash.com/photo-1616940844649-5352aeede23e?w=600&auto=format",
    isBundle: true,
    description: "Retinol Night Cream + Ceramide Moisturizer + Silk Eye Mask",
    items: ["Retinol Night Cream", "Ceramide Moisturizer", "Silk Eye Mask"],
  },
];