"use client";

import { useState } from "react";
import { Phone, CreditCard, CheckCircle } from "lucide-react";

interface MpesaCheckoutProps {
  amount: number;
  onSuccess?: () => void;
}

export const MpesaCheckout = ({ amount, onSuccess }: MpesaCheckoutProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showStkPush, setShowStkPush] = useState(false);

  const handleOneClickPay = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      alert("Please enter a valid M-Pesa phone number (e.g., 0712345678)");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setShowStkPush(true);
      setTimeout(() => {
        setShowStkPush(false);
        onSuccess?.();
      }, 5000);
    }, 1500);
  };

  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-[#5D6D7E]/5 to-[#D4A373]/10 rounded-2xl p-5 border border-[#D4A373]/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-[#5D6D7E] p-2 rounded-full">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-serif text-xl text-slate-800">One-Click M-Pesa</h3>
        </div>
        <p className="text-sm text-slate-600 mb-4">
          Pay securely with M-Pesa. Enter your phone number to receive an STK Push.
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">M-Pesa Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="0712345678"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-[#D4A373]/30 focus:outline-none focus:border-[#5D6D7E] transition"
              />
            </div>
          </div>
          <button
            onClick={handleOneClickPay}
            disabled={isProcessing}
            className="w-full bg-[#5D6D7E] text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all hover:bg-[#4a5a6b] disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4" />
                Pay ${amount.toFixed(2)}
              </>
            )}
          </button>
        </div>
      </div>
      {showStkPush && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-[#2D2A26] text-white rounded-2xl shadow-2xl px-6 py-4 flex items-center gap-3 max-w-sm">
            <div className="bg-green-500 rounded-full p-1">
              <CheckCircle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold">STK Push Sent</p>
              <p className="text-sm text-white/70">Enter PIN on your phone to complete payment</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};