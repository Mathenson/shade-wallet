"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Wallet, ShieldCheck, RefreshCw } from "lucide-react";

export default function Home() {
  const [message, setMessage] = useState("Connecting to backend...");

  useEffect(() => {
    fetch("http://localhost:5000/api/test")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Connection failed ❌"));
  }, []);

  return (
    <main className="flex flex-col h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="p-8 rounded-3xl shadow-2xl bg-gray-800/60 backdrop-blur-md text-center max-w-sm w-full"
      >
        <div className="flex justify-center mb-4">
          <Wallet className="w-12 h-12 text-emerald-400" />
        </div>
        <h1 className="text-3xl font-bold mb-2 tracking-wide">Shade Wallet</h1>
        <p className="text-gray-300 mb-6 text-sm">
          A secure, privacy-first crypto wallet built on Seismic.
        </p>

        <div className="bg-gray-900 p-3 rounded-xl text-emerald-400 text-sm mb-4">
          {message}
        </div>

        <div className="flex flex-col gap-3">
          <button className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 py-2 px-4 rounded-xl transition-all">
            <ShieldCheck size={18} />
            Create Wallet
          </button>
          <button className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-xl transition-all">
            <RefreshCw size={18} />
            Import Wallet
          </button>
        </div>
      </motion.div>
      <p className="text-xs text-gray-500 mt-6">© 2025 Shade Labs</p>
    </main>
  );
}
