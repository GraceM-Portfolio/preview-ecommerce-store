"use client";

import Image from "next/image";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { useCart, useAuth, CartItem } from "@/contexts";
import MpesaModal from "./MpesaModal";

export default function MiniCart() {
  const {
    items, removeFromCart, updateQuantity, totalPrice,
    isCartOpen, setIsCartOpen, showMpesaModal, setShowMpesaModal,
  } = useCart();
  const { user } = useAuth();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={() => setIsCartOpen(false)} />
      <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Cart</h2>
          <button onClick={() => setIsCartOpen(false)}><X size={28} /></button>
        </div>
        <div className="flex-1 overflow-auto p-6 space-y-6">
          {items.length === 0 ? (
            <p className="text-center mt-20 text-gray-500">Your cart is empty</p>
          ) : (
            items.map((item: CartItem) => (
              <div key={item.id} className="flex gap-4 bg-gray-50 p-4 rounded-2xl">
                <Image src={item.image} alt="" width={70} height={70} className="rounded-xl object-cover" />
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-orange-600 font-semibold">KSh {item.price}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={18} /></button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={18} /></button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500"><Trash2 /></button>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="p-6 border-t">
            <div className="flex justify-between text-xl font-bold mb-6">
              <span>Total</span>
              <span>KSh {totalPrice.toLocaleString()}</span>
            </div>
            <button
              onClick={() => user ? setShowMpesaModal(true) : alert("Please sign in to checkout")}
              className="w-full py-4 bg-gradient-to-r from-red-900 to-orange-600 text-white rounded-2xl font-semibold"
            >
              Checkout with M-Pesa
            </button>
          </div>
        )}
        {showMpesaModal && <MpesaModal amount={totalPrice} onClose={() => setShowMpesaModal(false)} />}
      </motion.div>
    </div>
  );
}