import express from "express";
import crypto from "crypto";
import { encryptPrivateKey } from "../utils/encryption.js";

const router = express.Router();

// POST /api/wallet/create
router.post("/create", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Generate a dummy wallet for now
    const privateKey = crypto.randomBytes(32).toString("hex");
    const publicAddress = crypto.createHash("sha256").update(privateKey).digest("hex");

    // Encrypt private key using password
    const encryptedKey = encryptPrivateKey(privateKey, password);

    // Return wallet data
    res.json({
      success: true,
      wallet: {
        username,
        address: publicAddress,
        encryptedKey,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Wallet creation failed" });
  }
});

export default router;
