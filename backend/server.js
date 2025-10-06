import express from "express";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config();

const app = express();

// ✅ Enable CORS for your frontend
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());

// ✅ Simple test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend connected successfully ✅" });
});

// ✅ Wallet route example
// app.post("/api/wallet/create", (req, res) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ success: false, message: "Missing fields" });
//   }

//   const wallet = {
//     username,
//     address: "0x" + Math.random().toString(16).slice(2, 10),
//     balance: "0.00"
//   };

//   res.json({ success: true, wallet });
// });


//new routes for ether
import { Wallet } from "ethers";

// ✅ Wallet creation route
app.post("/api/wallet/create", async (req, res) => {
  try {
    const { password } = req.body || {};

    // Generate a random new wallet
    const wallet = Wallet.createRandom();

    const result = {
      address: wallet.address,
    };

    // If a password is provided, return an encrypted JSON keystore
    if (password) {
      result.encryptedJson = await wallet.encrypt(password);
    } else {
      // For development only — do NOT expose in production
      result.mnemonic = wallet.mnemonic?.phrase;
      result.privateKey = wallet.privateKey;
    }

    res.json({ success: true, wallet: result });
  } catch (error) {
    console.error("Error creating wallet:", error);
    res.status(500).json({ success: false, message: "Wallet creation failed" });
  }
});




// ✅ Run server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
