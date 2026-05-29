"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts";

export default function AuthModal() {
  const { setIsAuthModalOpen, login } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, name || email.split("@")[0]);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4">
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-3xl p-8 max-w-md w-full relative"
      >
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
        >
          <X size={28} />
        </button>
        <h2 className="text-3xl font-bold mb-6">
          {isLogin ? "Sign In" : "Create Account"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 border rounded-2xl"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 border rounded-2xl"
            required
          />
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-red-900 to-orange-600 text-white rounded-2xl font-bold"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="w-full mt-4 text-gray-600"
        >
          {isLogin ? "Need an account? Sign Up" : "Already have an account? Sign In"}
        </button>
      </motion.div>
    </div>
  );
}