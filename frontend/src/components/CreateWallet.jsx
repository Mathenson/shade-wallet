"use client";
import { useState } from "react";
import { createWallet } from "../api/wallet";

export default function CreateWallet() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCreateWallet = async () => {
    setLoading(true);
    try {
      const newWallet = await createWallet(username, password);
      setWallet(newWallet);
    } catch (err) {
      alert("Failed to create wallet. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-900 text-white rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-semibold mb-4">Create Your Shade Wallet</h2>

      <input
        className="w-full p-2 mb-3 bg-gray-800 rounded-md border border-gray-700"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        className="w-full p-2 mb-4 bg-gray-800 rounded-md border border-gray-700"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleCreateWallet}
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-md font-semibold"
      >
        {loading ? "Creating..." : "Create Wallet"}
      </button>

      {wallet && (
        <div className="mt-6 p-4 bg-gray-800 rounded-md">
          <h3 className="font-bold text-lg mb-2">Wallet Created 🎉</h3>
          <p><strong>Username:</strong> {wallet.username}</p>
          <p><strong>Address:</strong> {wallet.address.slice(0, 10)}...</p>
        </div>
      )}
    </div>
  );
}
