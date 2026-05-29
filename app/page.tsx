"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  User,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Plus,
  Minus,
  Trash2,
  Clock,
  Sparkles,
  Droplet,
  ArrowRight,
  Filter,
  Watch,
  Shirt,
  Star,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CartProvider, AuthProvider, useCart, useAuth, CartItem } from "@/contexts";
import ProductCard from "@/components/ProductCard";
import ProductDetailModal from "@/components/ProductDetailModal";
import AuthModal from "@/components/AuthModal";
import AccountPanel from "@/components/Account";
import MiniCart from "@/components/MiniCart";
import MpesaModal from "@/components/MpesaModal";

// ========================
// PRODUCT DATA (USD prices)
// ========================
const allProducts = [
  // Skincare
  { id: "1", name: "Face Serum (Instant Glow)", price: 49, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400", category: "Serum", mainTab: "skincare", sold: 234, rating: 4.8, isNew: true },
  { id: "2", name: "Daily Body Lotion (Moisturizing)", price: 29, image: "https://images.unsplash.com/photo-1556229162-5c63ed9c4efb?w=400", category: "Lotion", mainTab: "skincare", sold: 189, rating: 4.7 },
  { id: "3", name: "Sunscreen (SPF 50)", price: 35,  image: "https://images.unsplash.com/photo-1556229162-5c63ed9c4efb?w=400", category: "Sunscreen", mainTab: "skincare", sold: 456, rating: 4.9 },

  { id: "4", name: "Vitamin C Brightening Serum", price: 59, image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400", category: "Serum", mainTab: "skincare", sold: 312, rating: 4.9, isNew: true },
  { id: "5", name: "Hyaluronic Acid Cream", price: 45, image: "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400", category: "Moisturizer", mainTab: "skincare", sold: 145, rating: 4.8, isNew: true },
  { id: "6", name: "Shea Butter Balm", price: 22, image: "https://images.unsplash.com/photo-1567721913486-6585f069b332?w=400", category: "Balm", mainTab: "skincare", sold: 98, rating: 4.7 },
  { id: "7", name: "Ceramide Night Cream", price: 52, image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400", category: "Moisturizer", mainTab: "skincare", sold: 207, rating: 4.9 },
  
  // Accessories
  { id: "8", name: "Classic Leather Watch", price: 89, image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400", category: "Watches", mainTab: "accessories", sold: 89, rating: 4.8, isNew: true },
  { id: "9", name: "Polarized Sunglasses", price: 59, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400", category: "Eyewear", mainTab: "accessories", sold: 156, rating: 4.7 },
  { id: "10", name: "Leather Belt", price: 39, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400", category: "Belts", mainTab: "accessories", sold: 98, rating: 4.6 },
  { id: "11", name: "Gemstone Necklace", price: 79, image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=400", category: "Jewelry", mainTab: "accessories", sold: 67, rating: 4.9, isNew: true },
  
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

const heroSlides = [
  { title: "Get Your Glow Back", subtitle: "Serum + Lotion Bundle $69", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200" },
  { title: "Elevate Your Style", subtitle: "Premium accessories from $39", image: "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=1200" },
  { title: "Fresh Outfits", subtitle: "Summer collection starting $49", image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=1200" },
];

// Weekly deals – exactly 2 items
const weekDeals = (() => {
  const bundles = allProducts.filter((p) => p.isBundle);
  const newProducts = allProducts.filter((p) => !p.isBundle && p.isNew);
  const candidates = [...bundles, ...newProducts];
  return candidates.slice(0, 2);
})();

// Tab configuration
const tabs = [
  { id: "skincare", label: "Skincare", icon: Droplet, gradient: "from-slate-800 to-slate-700" },
  { id: "accessories", label: "Accessories", icon: Watch, gradient: "from-amber-600 to-orange-600" },
  { id: "outfit", label: "Outfit", icon: Shirt, gradient: "from-emerald-700 to-teal-600" },
  { id: "bundles", label: "Bundles", icon: Sparkles, gradient: "from-violet-600 to-purple-600" },
];

function GlowAndGo() {
  const { addToCart, totalItems, items, removeFromCart, updateQuantity, totalPrice, setShowMpesaModal, showMpesaModal } = useCart();
  const { user, setIsAuthModalOpen, isAuthModalOpen, showAccount, setShowAccount } = useAuth();

  const [activeTab, setActiveTab] = useState<"skincare" | "accessories" | "outfit" | "bundles">("skincare");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showFullCart, setShowFullCart] = useState(false);
  const [showAllProductsModal, setShowAllProductsModal] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "name-asc" | "name-desc" | null>(null);

  // Hero carousel
  const [heroIndex, setHeroIndex] = useState(0);
  const heroSlides = [
    { title: "Get Your Glow Back", subtitle: "Serum + Lotion Bundle $69", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200" },
    { title: "Elevate Your Style", subtitle: "Premium accessories from $39", image: "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=1200" },
    { title: "Fresh Outfits", subtitle: "Summer collection starting $49", image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=1200" },
  ];
  const nextHero = () => setHeroIndex((prev) => (prev + 1) % heroSlides.length);
  const prevHero = () => setHeroIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  useEffect(() => {
    const timer = setInterval(nextHero, 5000);
    return () => clearInterval(timer);
  }, []);

  // Filtering & sorting
  const tabProducts = allProducts.filter((p) => p.mainTab === activeTab);
  let filteredProducts = [...tabProducts];
  if (selectedCategory) filteredProducts = filteredProducts.filter((p) => p.category === selectedCategory);
  if (searchQuery) filteredProducts = filteredProducts.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

  if (sortBy === "price-asc") filteredProducts.sort((a, b) => a.price - b.price);
  if (sortBy === "price-desc") filteredProducts.sort((a, b) => b.price - a.price);
  if (sortBy === "name-asc") filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  if (sortBy === "name-desc") filteredProducts.sort((a, b) => b.name.localeCompare(a.name));

  // Responsive display limit
  const [displayLimit, setDisplayLimit] = useState(10);
  useEffect(() => {
    const handleResize = () => setDisplayLimit(window.innerWidth < 768 ? 5 : 10);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const displayedProducts = filteredProducts.slice(0, displayLimit);
  const hasMoreProducts = filteredProducts.length > displayLimit;

  // --- FIX: Allow mixed array types ---
  const gridItems: any[] = [...displayedProducts];
  if (hasMoreProducts) {
    gridItems.push({ isSeeMore: true, remainingCount: filteredProducts.length - displayLimit });
  }

  // --- FIX: Use Array.from instead of spread on Set ---
  const allCategories = Array.from(new Set(tabProducts.map((p) => p.category)));
  const limitedCategories = allCategories.slice(0, 3);
  const activeTabGradient = tabs.find(t => t.id === activeTab)?.gradient || "from-gray-700 to-gray-600";

  const searchSuggestions =
    searchQuery.length > 0 ? allProducts.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 4) : [];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-gray-900">GLOW & GO</h1>
          <div className="flex-1 min-w-[180px] max-w-md mx-2 sm:mx-4 relative order-last sm:order-none w-full sm:w-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-300 text-sm"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2">
                <X size={18} className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
            {searchSuggestions.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-xl border border-gray-100 z-50 py-2">
                {searchSuggestions.map((p) => (
                  <button
                    key={p.id}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-sm"
                    onClick={() => { setSelectedProduct(p); setSearchQuery(""); }}
                  >
                    <Image src={p.image} alt="" width={40} height={40} className="rounded-lg object-cover" />
                    <span className="font-medium">{p.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => (user ? setShowAccount(true) : setIsAuthModalOpen(true))}
              className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 rounded-full px-4 py-2 text-sm font-medium transition"
            >
              <User size={18} /><span className="hidden sm:inline">{user ? "Account" : "Sign In"}</span>
            </button>
            <button
              onClick={() => setShowFullCart(true)}
              className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 rounded-full px-4 py-2 text-sm font-medium relative transition"
            >
              <ShoppingBag size={18} /><span className="hidden sm:inline">Cart</span>
              {totalItems > 0 && <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{totalItems}</span>}
            </button>
          </div>
        </div>
      </header>

     {/* HERO */}
      <section className="relative h-[60vh] sm:h-[70vh] flex items-center overflow-hidden">
        <Image src={heroSlides[heroIndex].image} alt="hero" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        <div className="relative z-10 px-4 sm:px-8 text-white max-w-2xl">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight mb-3">
            {heroSlides[heroIndex].title}
          </h2>
          <p className="text-xl sm:text-2xl font-light opacity-90">
            {heroSlides[heroIndex].subtitle}
          </p>
          <button className="mt-6 px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/40 rounded-full text-sm font-medium hover:bg-white/30 transition">
            Shop Now
          </button>
        </div>
        <button
          onClick={prevHero}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full text-white transition z-10"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={nextHero}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full text-white transition z-10"
        >
          <ChevronRight size={24} />
        </button>
      </section>

      {/* WEEKLY DEALS – LANDSCAPE ORIENTED */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center gap-3 mb-8">
            <Clock className="text-amber-600" size={24} />
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">This Week's Deals</h2>
          </div>
          <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide md:grid md:grid-cols-2 md:overflow-visible">
            {weekDeals.map((deal) => (
              <div key={deal.id} className="w-[280px] flex-shrink-0 md:w-auto">
                <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-48 h-48 sm:h-auto aspect-video sm:aspect-square">
                    <Image src={deal.image} alt={deal.name} fill className="object-cover" />
                    {deal.isBundle && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">Bundle</span>
                    )}
                    <span className="absolute top-2 right-2 bg-amber-500 text-white text-xs px-2 py-1 rounded-full">Deal</span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{deal.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-0.5">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="text-sm">{deal.rating || 4.9}</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-500">{deal.sold}+ sold</span>
                      </div>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">${deal.price}</span>
                        {deal.originalPrice && <span className="text-sm text-gray-400 line-through">${deal.originalPrice}</span>}
                      </div>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); addToCart(deal); }}
                      className="mt-4 w-full py-2 rounded-full text-sm font-medium bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-sm hover:shadow-md transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-light tracking-tight text-gray-900">Our Products</h1>
        <p className="text-gray-500 mt-2">Discover premium skincare, accessories, outfits and bundles.</p>
      </div>

      {/* TABS */}
      <div className="sticky top-[65px] z-40 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-1 overflow-x-auto py-3 scrollbar-hide">
            {tabs.map(({ id, label, icon: Icon, gradient }) => (
              <button
                key={id}
                onClick={() => { setActiveTab(id as any); setSelectedCategory(null); setSortBy(null); }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === id
                    ? `bg-gradient-to-r ${gradient} text-white shadow-md`
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={18} /> {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FILTER BAR – rectangular chips + wrapping */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2 pb-1 flex-1">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                !selectedCategory
                  ? `bg-gradient-to-r ${activeTabGradient} text-white shadow-sm`
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            {limitedCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition ${
                  selectedCategory === cat
                    ? `bg-gradient-to-r ${activeTabGradient} text-white shadow-sm`
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center gap-2 bg-white border border-gray-200 rounded-md px-4 py-1.5 text-sm font-medium shadow-sm hover:bg-gray-50"
            >
              <Filter size={14} /> Sort {sortBy && <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />}
            </button>
            {showSortMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 z-50 py-1">
                <button onClick={() => { setSortBy("price-asc"); setShowSortMenu(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Price: Low to High</button>
                <button onClick={() => { setSortBy("price-desc"); setShowSortMenu(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Price: High to Low</button>
                <button onClick={() => { setSortBy("name-asc"); setShowSortMenu(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Name: A to Z</button>
                <button onClick={() => { setSortBy("name-desc"); setShowSortMenu(false); }} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50">Name: Z to A</button>
                {sortBy && (
                  <button onClick={() => { setSortBy(null); setShowSortMenu(false); }} className="w-full text-left px-4 py-2 text-sm text-red-500 border-t hover:bg-gray-50">
                    Clear sort
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20"><p className="text-gray-500">No products found. Try another search.</p></div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {gridItems.map((item, idx) => {
              if ((item as any).isSeeMore) {
                const remaining = (item as any).remainingCount;
                return (
                  <div
                    key="see-more"
                    onClick={() => setShowAllProductsModal(true)}
                    className="cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col items-center justify-center p-6 aspect-square group"
                  >
                    <div className="p-3 rounded-full bg-gray-50 group-hover:bg-gray-100 transition">
                      <ArrowRight size={32} className="text-gray-600" />
                    </div>
                    <span className="text-lg font-medium text-gray-800 mt-3">See More</span>
                    <span className="text-sm text-gray-400 mt-1">{remaining} more products</span>
                  </div>
                );
              }
              const product = item as any;
              if (!product || !product.id) return null;
              return (
                <Link key={product.id} href={`/product/${product.id}`} className="cursor-pointer">
                  <ProductCard product={product} addToCart={addToCart} isDeal={false} />
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* CART MODAL */}
      <AnimatePresence>
        {showFullCart && (
          <div className="fixed inset-0 bg-white z-[60] overflow-y-auto">
            <div className="max-w-3xl mx-auto px-6 py-10 relative min-h-full">
              <button onClick={() => setShowFullCart(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100"><X size={24} /></button>
              <button onClick={() => setShowFullCart(false)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-6">← Back to shopping</button>
              <h1 className="text-3xl font-light tracking-tight mb-8">Your Cart</h1>
              {items.length === 0 ? (
                <p className="text-center py-20 text-gray-400">Your cart is empty</p>
              ) : (
                <>
                  <div className="space-y-6 divide-y divide-gray-100">
                    {items.map((item: CartItem) => (
                      <div key={item.id} className="flex gap-4 py-6">
                        <Image src={item.image} alt="" width={80} height={80} className="rounded-xl object-cover" />
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-lg font-semibold text-amber-700 mt-1">${item.price}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="border border-gray-200 rounded-full p-1 hover:bg-gray-50"><Minus size={14} /></button>
                            <span className="w-6 text-center font-medium">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="border border-gray-200 rounded-full p-1 hover:bg-gray-50"><Plus size={14} /></button>
                          </div>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={20} /></button>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center text-xl font-semibold">
                    <span>Total</span>
                    <span>${totalPrice.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => (user ? setShowMpesaModal(true) : setIsAuthModalOpen(true))}
                    className="w-full mt-8 py-3 bg-gray-900 text-white rounded-full text-base font-medium hover:bg-gray-800 transition"
                  >
                    Proceed to Checkout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ALL PRODUCTS MODAL */}
      <AnimatePresence>
        {showAllProductsModal && (
          <div className="fixed inset-0 bg-white z-[70] overflow-auto">
            <div className="max-w-7xl mx-auto px-6 py-10 relative">
              <button onClick={() => setShowAllProductsModal(false)} className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100"><X size={24} /></button>
              <h2 className="text-2xl font-light tracking-tight mb-8">All {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Products</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                {filteredProducts.map((p) => (
                  <div key={p.id} onClick={() => { setSelectedProduct(p); setShowAllProductsModal(false); }} className="cursor-pointer">
                    <ProductCard product={p} addToCart={addToCart} isDeal={false} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER – dark */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-light tracking-tight text-white mb-3">GLOW & GO</h3>
            <p className="text-sm text-gray-400">Premium skincare, accessories, outfits & bundles.</p>
          </div>
          <div><h4 className="font-medium text-white mb-3">Shop</h4><p className="text-sm text-gray-400">Skincare · Accessories · Outfit · Bundles</p></div>
          <div><h4 className="font-medium text-white mb-3">Support</h4><p className="text-sm text-gray-400">Contact · Track Order · Returns</p></div>
          <div><h4 className="font-medium text-white mb-3">Newsletter</h4><input type="email" placeholder="Your email" className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 text-sm text-white placeholder-gray-400" /><button className="mt-2 w-full bg-white text-gray-900 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition">Subscribe</button></div>
        </div>
        <div className="text-center text-xs text-gray-500 mt-10">© 2026 Glow & Go — Modern essentials</div>
      </footer>

      {/* MODALS */}
      <AnimatePresence>
        {isAuthModalOpen && <AuthModal />}
        {showAccount && <AccountPanel />}
        {showMpesaModal && <MpesaModal amount={totalPrice} onClose={() => setShowMpesaModal(false)} />}
      </AnimatePresence>
    </main>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <GlowAndGo />
        <MiniCart />
      </AuthProvider>
    </CartProvider>
  );
}
