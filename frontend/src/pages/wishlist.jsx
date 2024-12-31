import React, { useState, useEffect, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Wishlist = () => {
  const { userId, wishlist, removeFromWishlist } = useContext(ShopContext); // Access wishlist data from context
  const [wishlistItems, setWishlistItems] = useState([]); // Local state for wishlist items

  // Fetch wishlist items from the backend
  const fetchWishlist = async () => {
    try {
      const response = await axios.get(`/api/wishlist/${userId}`); // Fetch wishlist from backend
      setWishlistItems(response.data); // Set state with fetched data
    } catch (error) {
      console.error("Error fetching wishlist:", error); // Log error if fetching fails
    }
  };

  // Remove product from wishlist by calling removeFromWishlist from context
  const handleRemoveFromWishlist = async (productId) => {
    try {
      await axios.delete(`/api/wishlist/${userId}/${productId}`); // Call backend to remove product
      removeFromWishlist(productId); // Remove from context state
      fetchWishlist(); // Re-fetch updated wishlist
    } catch (error) {
      console.error("Error removing from wishlist:", error); // Log error if removal fails
    }
  };

  // Fetch the wishlist when the userId changes
  useEffect(() => {
    if (userId) {
      fetchWishlist();
    }
  }, [userId]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Your Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p className="text-lg text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.productId} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-56 object-cover rounded-t-lg mb-4"
              />
              <h2 className="text-xl font-medium text-gray-800">{item.name}</h2>
              <p className="text-lg text-gray-600 mt-2">{item.price}</p>
              <button
                onClick={() => handleRemoveFromWishlist(item.productId)} // Trigger removal from wishlist
                className="mt-4 w-full py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
              >
                Remove from Wishlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
