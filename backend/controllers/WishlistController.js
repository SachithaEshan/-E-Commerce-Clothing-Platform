// backend/controllers/wishlistController.js

import Wishlist from '../models/Wishlist';


exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ userId: req.params.userId });
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch wishlist" });
  }
};

// Add a product to the wishlist
exports.addToWishlist = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    // Check if product already exists in wishlist
    const existingWishlistItem = await Wishlist.findOne({ userId, productId });
    if (existingWishlistItem) {
      return res.status(400).json({ message: "Product is already in your wishlist" });
    }

    const newWishlistItem = new Wishlist({ userId, productId });
    await newWishlistItem.save();
    res.status(201).json({ message: "Product added to wishlist" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add to wishlist" });
  }
};

// Remove a product from the wishlist
exports.removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    await Wishlist.findOneAndDelete({ userId, productId });
    res.status(200).json({ message: "Product removed from wishlist" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove from wishlist" });
  }
};
