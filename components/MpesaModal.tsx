"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/contexts";

export default function MpesaModal({ onClose, amount }: { onClose: () => void; amount: number }) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const { simulateMpesa, clearCart, setIsCartOpen } = useCart();

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      if (simulateMpesa(phone)) {
        alert("✅ Payment Successful! Thank you for shopping with Glow & Go.");
        clearCart();
        setIsCartOpen(false);
        onClose();
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl p-8 max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold">M-Pesa Checkout</h3>
          <button onClick={onClose}><X size={28} /></button>
        </div>
        <p className="text-3xl font-bold text-orange-600 mb-6">KSh {amount.toLocaleString()}</p>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0712345678" className="w-full p-4 border rounded-2xl" />
        <button onClick={handlePay} disabled={loading} className="w-full mt-6 bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 rounded-2xl font-bold">
          {loading ? "Processing..." : "Confirm Payment"}
        </button>
        <button onClick={onClose} className="w-full mt-3 text-gray-500">Cancel</button>
      </motion.div>
    </div>
  );
}