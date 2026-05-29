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

const allProducts: Product[] = [
  // ... (the exact same product objects as in page.tsx)
];
