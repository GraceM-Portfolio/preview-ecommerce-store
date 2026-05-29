"use client";

import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts";

export default function AccountPanel() {
  const { user, logout, setShowAccount } = useAuth();
  if (!user) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/40"
      onClick={() => setShowAccount(false)}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        className="bg-white w-full max-w-md rounded-t-3xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Account</h2>
          <button onClick={() => setShowAccount(false)}>
            <X size={28} />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-gray-500">Name</p>
            <p className="text-xl font-semibold">{user.name}</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p className="text-xl font-semibold">{user.email}</p>
          </div>
          <button
            onClick={logout}
            className="w-full mt-6 py-4 bg-red-500 text-white rounded-2xl font-bold"
          >
            Sign Out
          </button>
        </div>
      </motion.div>
    </div>
  );
}