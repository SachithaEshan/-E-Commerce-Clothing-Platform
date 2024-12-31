import express from "express";
import Wishlist from "../models/Wishlist.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Add to Wishlist
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { productId, productName, productImage } = req.body;
    const userId = req.user.id;

    // Check if item is already in wishlist
    const existingItem = await Wishlist.findOne({ userId, productId });
    if (existingItem) {
      return res.status(400).json({ message: "Item already in wishlist" });
    }

    const newWishlistItem = new Wishlist({
      userId,
      productId,
      productName,
      productImage,
    });

    await newWishlistItem.save();
    res
      .status(200)
      .json({ message: "Item added to wishlist successfully", newWishlistItem });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// Get Wishlist for a User
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const wishlist = await Wishlist.find({ userId });
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// Remove from Wishlist
router.delete("/remove", authMiddleware, async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    const deletedItem = await Wishlist.findOneAndDelete({ userId, productId });
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found in wishlist" });
    }

    res.status(200).json({ message: "Item removed from wishlist successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
});

// Export the router
export default router;
