import { createContext, useState, useEffect } from "react";
import { products } from "../assets/assets"; // Ensure products is defined in assets
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Create context for shop
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;

  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  
  // Initialize cartItems state, consider loading from localStorage if needed
  const [cartItems, setCartItems] = useState(() => {
    // Optionally load cart items from localStorage
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  // New state for managing userId
  const [userId, setUserId] = useState(null);

  const navigate = useNavigate();

  // Add to Cart Functionality
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select a size to continue.");
    }
    
    // Clone the cartItems object to avoid direct mutation
    let cartData = structuredClone(cartItems); // or use JSON.parse(JSON.stringify(cartItems)) for compatibility

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    // Update cartItems state and localStorage
    setCartItems(cartData);
    localStorage.setItem("cartItems", JSON.stringify(cartData)); // Save cartItems in localStorage
  };

  // Get Cart Count
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalCount;
  };

  // Update Cart Quantity
  const updateQuantity = async (itemID, size, quantity) => {
    let cartData = structuredClone(cartItems); // or use JSON.parse(JSON.stringify(cartItems)) for compatibility
    cartData[itemID][size] = quantity;

    // Update cartItems state and localStorage
    setCartItems(cartData);
    localStorage.setItem("cartItems", JSON.stringify(cartData)); // Save updated cartItems to localStorage
  };

  // Get Cart Amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {}
      }
    }
    return totalAmount;
  };

  // Update userId (e.g., after login)
  const setUser = (id) => {
    setUserId(id);
  };

  // Value object to pass down through context
  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    userId,      // Add userId here
    setUser      // Add setUser function here
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
