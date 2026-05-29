"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Image from "next/image";
import {
  ShoppingBag, Heart, User, Search, ChevronLeft, ChevronRight,
  X, Plus, Minus, Trash2, Phone, CreditCard, Star, Clock,
  Filter
} from "lucide-react";

// ---------- Cart Context ----------
type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

const CartContext = createContext<any>(null);

function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showMpesaModal, setShowMpesaModal] = useState(false);
  const [stkPushMessage, setStkPushMessage] = useState("");

  const addToCart = (product: Omit<CartItem, "quantity">) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) =>
    setItems(prev => prev.filter(i => i.id !== id));

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) removeFromCart(id);
    else setItems(prev => prev.map(i => (i.id === id ? { ...i, quantity: qty } : i)));
  };

  const clearCart = () => setItems([]);
  const closeCart = () => setIsCartOpen(false);
  const openCart = () => setIsCartOpen(true);
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.price * i.quantity, 0);

  const simulateMpesa = (phone: string) => {
    if (!phone || phone.length < 10) {
      alert("Please enter a valid M-Pesa number");
      return false;
    }
    setStkPushMessage(`STK Push sent to ${phone}`);
    setTimeout(() => setStkPushMessage(""), 5000);
    return true;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        closeCart,
        openCart,
        showMpesaModal,
        setShowMpesaModal,
        simulateMpesa,
        stkPushMessage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

// ---------- Product Database (unchanged) ----------
const allProducts = [
  // Skincare
  { id: "1", name: "Face Serum (Instant Glow)", price: 749, image: "https://images.unsplash.com/photo-1620916566390-51b23567c2d8?w=400", category: "Serum", mainTab: "skincare", sold: 234, rating: 4.8, isNew: true },
  { id: "2", name: "Daily Body Lotion (Moisturizing)", price: 899, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400", category: "Lotion", mainTab: "skincare", sold: 189, rating: 4.7, isNew: false },
  { id: "3", name: "Sunscreen (SPF 50)", price: 949, image: "https://images.unsplash.com/photo-1615859131861-052f0641a60e?w=400", category: "Sunscreen", mainTab: "skincare", sold: 456, rating: 4.9, isNew: false },
  { id: "4", name: "Vitamin C Brightening Serum", price: 1299, image: "https://images.unsplash.com/photo-1620916566390-51b23567c2d8?w=400", category: "Serum", mainTab: "skincare", sold: 312, rating: 4.9, isNew: true },
  { id: "5", name: "Hyaluronic Acid Cream", price: 1099, image: "https://images.unsplash.com/photo-1615859131861-052f0641a60e?w=400", category: "Moisturizer", mainTab: "skincare", sold: 145, rating: 4.8, isNew: true },
  { id: "6", name: "Shea Butter Balm", price: 850, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400", category: "Balm", mainTab: "skincare", sold: 98, rating: 4.7, isNew: false },
  { id: "7", name: "Ceramide Night Cream", price: 1199, image: "https://images.unsplash.com/photo-1615859131861-052f0641a60e?w=400", category: "Moisturizer", mainTab: "skincare", sold: 207, rating: 4.9, isNew: false },
  // Bags
  { id: "8", name: "Small Waist Bag (Fanny Pack)", price: 949, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400", category: "Waist Bag", mainTab: "bags", sold: 321, rating: 4.6, isNew: false },
  { id: "9", name: "Leather Crossbody Bag", price: 2499, image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400", category: "Crossbody", mainTab: "bags", sold: 89, rating: 4.9, isNew: true },
  { id: "10", name: "Canvas Tote Bag", price: 1299, image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400", category: "Tote", mainTab: "bags", sold: 156, rating: 4.7, isNew: false },
  // Hats
  { id: "11", name: "Sun Visor Hat", price: 699, image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400", category: "Visor", mainTab: "hats", sold: 567, rating: 4.5, isNew: true },
  { id: "12", name: "Foldable Summer Sun Hat", price: 849, image: "https://images.unsplash.com/photo-1556304653-cba65c59b3c5?w=400", category: "Sun Hat", mainTab: "hats", sold: 432, rating: 4.7, isNew: false },
  { id: "13", name: "Fedora Hat (Classic)", price: 999, image: "https://images.unsplash.com/photo-1529472119196-2fa5c52ffb0f?w=400", category: "Fedora", mainTab: "hats", sold: 245, rating: 4.9, isNew: false },
  { id: "14", name: "Beanie Hat (Winter)", price: 549, image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400", category: "Beanie", mainTab: "hats", sold: 89, rating: 4.6, isNew: true },
  // Bundles & Deals
  { id: "b1", name: "Glow Serum + Lotion Bundle", price: 1499, originalPrice: 1648, image: "https://images.unsplash.com/photo-1620916566390-51b23567c2d8?w=400", category: "Bundle", mainTab: "bundles", sold: 78, rating: 4.9, isNew: false, isBundle: true },
  { id: "b2", name: "Sun Protection Kit", price: 1299, originalPrice: 1648, image: "https://images.unsplash.com/photo-1615859131861-052f0641a60e?w=400", category: "Bundle", mainTab: "bundles", sold: 42, rating: 4.8, isNew: false, isBundle: true },
  { id: "b3", name: "Waist Bag + Fedora Hat Bundle", price: 1799, originalPrice: 1948, image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400", category: "Bundle", mainTab: "bundles", sold: 23, rating: 4.7, isNew: false, isBundle: true },
  { id: "b4", name: "Winter Essentials Bundle", price: 1299, originalPrice: 1548, image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400", category: "Bundle", mainTab: "bundles", sold: 55, rating: 4.8, isNew: false, isBundle: true },
  { id: "d1", name: "Flash Deal: 20% Off All Hats", price: 0, image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400", category: "Deal", mainTab: "bundles", sold: 0, rating: 0, isNew: false, isDeal: true, dealText: "Use code SUNNY20" },
];
const dealOffer = allProducts.find(p => p.isDeal);

// ---------- Helper Components ----------
function MpesaModal({ onClose, amount, onSuccess }: { onClose: () => void; amount: number; onSuccess: () => void }) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const { simulateMpesa } = useCart();

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      const ok = simulateMpesa(phone);
      setLoading(false);
      if (ok) { onSuccess(); onClose(); }
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
        <h3 className="text-xl font-bold mb-2">M-Pesa Checkout</h3>
        <p className="text-gray-600 mb-4">Total: KSh {amount.toLocaleString()}</p>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="0712345678"
          className="w-full border rounded-xl p-3 mb-4 outline-none"
        />
        <button onClick={handlePay} disabled={loading} className="w-full bg-[#1db954] text-white py-3 rounded-full font-bold">
          {loading ? "Processing..." : "Confirm Payment"}
        </button>
        <button onClick={onClose} className="w-full mt-2 text-gray-400">Cancel</button>
      </div>
    </div>
  );
}

function MiniCart() {
  const { items, removeFromCart, updateQuantity, totalPrice, isCartOpen, closeCart, clearCart, setShowMpesaModal, showMpesaModal } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={closeCart} />
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl flex flex-col">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-bold">Cart</h2>
          <button onClick={closeCart}><X size={24} /></button>
        </div>
        <div className="flex-1 overflow-auto p-5 space-y-4">
          {items.length === 0 ? <p className="text-center">Empty</p> : 
            items.map((item: any) => (
              <div key={item.id} className="flex gap-4 items-center bg-gray-50 p-3 rounded-xl">
                <div className="w-16 h-16 relative bg-gray-100 rounded overflow-hidden">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold">{item.name}</h3>
                  <p className="text-sm text-orange-500">KSh {item.price}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="bg-gray-200 p-1 rounded"><Minus size={12}/></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="bg-gray-200 p-1 rounded"><Plus size={12}/></button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-400"><Trash2 size={16}/></button>
              </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="p-5 border-t space-y-3">
            <div className="flex justify-between font-bold"><span>Total:</span><span>KSh {totalPrice.toLocaleString()}</span></div>
            <button onClick={() => setShowMpesaModal(true)} className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold">Checkout (M-Pesa)</button>
            <button onClick={clearCart} className="w-full text-sm text-gray-400">Clear Cart</button>
          </div>
        )}
      </div>
      {showMpesaModal && (
        <MpesaModal amount={totalPrice} onClose={() => setShowMpesaModal(false)} onSuccess={() => { alert("Payment successful!"); clearCart(); closeCart(); }} />
      )}
    </div>
  );
}

function ProductCard({ product, addToCart }: { product: any; addToCart: (p: any) => void }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-3 flex flex-col">
      <div className="relative h-32 w-full bg-gray-100 rounded-lg overflow-hidden">
        <Image src={product.image} alt={product.name} fill className="object-cover" />
        {product.isNew && <span className="absolute top-1 left-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded">New</span>}
        {product.isBundle && <span className="absolute top-1 left-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded">Bundle</span>}
      </div>
      <div className="mt-2">
        <h3 className="text-sm font-semibold line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-1 mt-1">
          <Star size={14} fill="#FFB800" color="#FFB800" />
          <span className="text-xs">{product.rating}</span>
          <span className="text-xs text-gray-400">({product.sold}+ sold)</span>
        </div>
        <div className="flex items-baseline gap-2">
          <p className="text-orange-500 font-bold mt-1">KSh {product.price}</p>
          {product.originalPrice && <span className="text-xs line-through text-gray-400">KSh {product.originalPrice}</span>}
        </div>
        <button
          onClick={() => addToCart(product)}
          className="w-full mt-2 bg-gradient-to-r from-orange-600 to-amber-500 text-white py-1.5 rounded-full text-xs font-bold hover:shadow-md transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// ---------- Main Page ----------
function HomePage() {
  const { addToCart, totalItems, openCart } = useCart();
  const [activeTab, setActiveTab] = useState<"skincare" | "bags" | "hats" | "bundles">("skincare");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceSort, setPriceSort] = useState<"none" | "low-high" | "high-low">("none");
  const [showSortMenu, setShowSortMenu] = useState(false);

  const tabProducts = allProducts.filter(p => p.mainTab === activeTab && p.price > 0);
  const availableCategories = Array.from(new Set(tabProducts.map(p => p.category)));

  let filteredProducts = [...tabProducts];
  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
  }
  if (searchQuery) {
    filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }
  if (priceSort === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (priceSort === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // Hero carousel
  const [heroIndex, setHeroIndex] = useState(0);
  const heroSlides = [
    { title: "Get Your Glow Back!", subtitle: "Serum + Lotion Bundle KSh 1,499", image: "https://images.unsplash.com/photo-1620916566390-51b23567c2d8?w=800" },
    { title: "On the Move?", subtitle: "Stylish Waist Bags starting at KSh 949", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800" },
    { title: "Sun & Style", subtitle: "Sun Visor Hats only KSh 699", image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800" },
  ];
  const nextHero = () => setHeroIndex((heroIndex + 1) % heroSlides.length);
  const prevHero = () => setHeroIndex((heroIndex - 1 + heroSlides.length) % heroSlides.length);
  useEffect(() => {
    const timer = setInterval(nextHero, 5000);
    return () => clearInterval(timer);
  }, [heroIndex]);

  useEffect(() => {
    setSelectedCategory(null);
    setPriceSort("none");
    setSearchQuery("");
  }, [activeTab]);

  const gradientButtonClass = "px-6 py-2 rounded-full font-bold text-white shadow-md transition-all duration-200 hover:scale-105 bg-gradient-to-r from-orange-500 to-amber-600";

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-[#2D2A24]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-[#D35400]">GLOW & GO</h1>
          <div className="flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#D35400]"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          <div className="flex items-center gap-4">
            <button><Heart className="w-5 h-5 text-[#2D2A24]" /></button>
            <button><User className="w-5 h-5 text-[#2D2A24]" /></button>
            <button onClick={openCart} className="relative">
              <ShoppingBag className="w-5 h-5 text-[#2D2A24]" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="relative bg-gray-200 rounded-2xl overflow-hidden h-64 md:h-80">
          <div className="relative w-full h-full">
            <Image src={heroSlides[heroIndex].image} alt="hero" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/30 flex flex-col justify-center p-6 text-white">
              <h2 className="text-2xl md:text-3xl font-bold">{heroSlides[heroIndex].title}</h2>
              <p className="text-lg">{heroSlides[heroIndex].subtitle}</p>
              <button className="mt-4 bg-gradient-to-r from-orange-500 to-amber-500 w-fit px-6 py-2 rounded-full text-sm shadow-md">Shop Now</button>
            </div>
          </div>
          <button onClick={prevHero} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 p-1 rounded-full text-white"><ChevronLeft /></button>
          <button onClick={nextHero} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 p-1 rounded-full text-white"><ChevronRight /></button>
        </div>
      </section>

      {/* Flash Deals */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Clock className="text-red-500" />
            <h2 className="text-2xl font-bold">Flash Deals</h2>
            <div className="bg-red-500 text-white px-2 py-1 rounded text-sm">Ends in 02:45:10</div>
          </div>
          <a href="#" className="text-[#D35400] text-sm">View All →</a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {allProducts.filter(p => p.isBundle).slice(0,4).map(deal => (
            <div key={deal.id} className="bg-white rounded-xl shadow p-3">
              <div className="relative h-32 w-full bg-gray-100 rounded-lg overflow-hidden">
                <Image src={deal.image} alt={deal.name} fill className="object-cover" />
                <span className="absolute top-1 left-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded">Bundle</span>
              </div>
              <div className="mt-2">
                <h3 className="text-sm font-bold line-clamp-2">{deal.name}</h3>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-[#D35400] font-bold text-lg">KSh {deal.price}</span>
                  {deal.originalPrice && <span className="text-xs line-through text-gray-400">KSh {deal.originalPrice}</span>}
                </div>
                <div className="mt-2"><div className="bg-gray-200 rounded-full h-1.5"><div className="bg-[#D35400] h-1.5 rounded-full" style={{ width: `${deal.sold}%` }}></div></div><p className="text-xs text-gray-500 mt-1">{deal.sold}% sold</p></div>
                <button onClick={() => addToCart(deal)} className="w-full mt-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-1.5 rounded-full text-sm font-semibold">Add Bundle</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gradient Tab Buttons with emoji/text (no external icons) */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-wrap gap-3 justify-center md:justify-start">
          <button onClick={() => setActiveTab("skincare")} className={`${gradientButtonClass} ${activeTab === "skincare" ? "ring-2 ring-white ring-offset-2 ring-offset-orange-400" : "opacity-90 hover:opacity-100"}`}>
            💧 Skincare
          </button>
          <button onClick={() => setActiveTab("bags")} className={`${gradientButtonClass} ${activeTab === "bags" ? "ring-2 ring-white ring-offset-2 ring-offset-orange-400" : "opacity-90 hover:opacity-100"}`}>
            🎒 Bags
          </button>
          <button onClick={() => setActiveTab("hats")} className={`${gradientButtonClass} ${activeTab === "hats" ? "ring-2 ring-white ring-offset-2 ring-offset-orange-400" : "opacity-90 hover:opacity-100"}`}>
            🧢 Hats
          </button>
          <button onClick={() => setActiveTab("bundles")} className={`${gradientButtonClass} ${activeTab === "bundles" ? "ring-2 ring-white ring-offset-2 ring-offset-orange-400" : "opacity-90 hover:opacity-100"}`}>
            🎁 Bundles & Deals
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {availableCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                className={`px-3 py-1 rounded-full text-sm border transition ${selectedCategory === cat ? "bg-[#D35400] text-white border-[#D35400]" : "bg-white border-gray-300 text-gray-700 hover:border-[#D35400]"}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center gap-1 text-sm border px-3 py-1 rounded-full bg-white"
            >
              <Filter size={14} /> Sort
            </button>
            {showSortMenu && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-xl p-2 w-40 z-20">
                <button onClick={() => { setPriceSort("low-high"); setShowSortMenu(false); }} className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-lg">Price: Low to High</button>
                <button onClick={() => { setPriceSort("high-low"); setShowSortMenu(false); }} className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-lg">Price: High to Low</button>
                <button onClick={() => { setPriceSort("none"); setShowSortMenu(false); }} className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-lg text-gray-500">Reset</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-12">
        {activeTab === "bundles" && dealOffer && (
          <div className="mb-6 bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-4 flex flex-col md:flex-row justify-between items-center">
            <div><h3 className="font-bold text-lg">🔥 {dealOffer.name}</h3><p className="text-sm">{dealOffer.dealText}</p></div>
            <button className="mt-2 md:mt-0 bg-white text-orange-600 px-4 py-1 rounded-full text-sm font-semibold shadow">Shop Deal</button>
          </div>
        )}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12"><p className="text-gray-500">No products found. Try adjusting your filters.</p></div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </div>
        )}
      </section>

      <MiniCart />
    </main>
  );
}

export default function App() {
  return (
    <CartProvider>
      <HomePage />
    </CartProvider>
  );
}