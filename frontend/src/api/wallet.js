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
