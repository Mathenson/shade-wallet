"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Wallet, ShieldCheck, RefreshCw } from "lucide-react";

export default function Home() {
  const [message, setMessage] = useState("Connecting to backend...");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Test backend connection
  useEffect(() => {
    fetch("http://localhost:5000/api/test")
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Connection failed ❌"));
  }, []);

  // ✅ Function to create wallet
  const handleCreateWallet = async () => {
    if (!username || !password) {
      alert("Please enter a username and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/wallet/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.success) {
        setWallet(data.wallet);
      } else {
        alert("Wallet creation failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend.");
    } finally {
      setLoading(false);
    }
  };

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

        {/* 👇 New input fields for username and password */}
        <div className="flex flex-col gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 rounded-md bg-gray-900 border border-gray-700"
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded-md bg-gray-900 border border-gray-700"
          />
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleCreateWallet}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 py-2 px-4 rounded-xl transition-all"
          >
            <ShieldCheck size={18} />
            {loading ? "Creating..." : "Create Wallet"}
          </button>

          <button className="flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded-xl transition-all">
            <RefreshCw size={18} />
            Import Wallet
          </button>
        </div>

        {/* 👇 Show created wallet info */}
        {wallet && (
          <div className="mt-6 p-4 bg-gray-900 rounded-xl text-left">
            <h3 className="font-semibold text-emerald-400 mb-2">
              Wallet Created 🎉
            </h3>
            <p><strong>Username:</strong> {wallet.username}</p>
            <p><strong>Address:</strong> {wallet.address.slice(0, 10)}...</p>
          </div>
        )}
      </motion.div>

      <p className="text-xs text-gray-500 mt-6">© 2025 Shade Labs</p>
    </main>
  );
}
