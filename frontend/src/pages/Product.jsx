import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import axios from "axios";

const Product = () => {
  const { productId } = useParams(); // Retrieve productId from URL params
  const { products, currency, addToCart, userId } = useContext(ShopContext); // Access data from context
  const [productData, setProductData] = useState(null); // State to store the product data
  const [image, setImage] = useState(""); // State for the product's image
  const [size, setSize] = useState(""); // State for the selected size
  const [isInWishlist, setIsInWishlist] = useState(false); // State to track if the product is in the wishlist

  // Fetch product data based on the productId
  const fetchProductData = async () => {
    const product = products.find(item => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]); // Set the default image for the product
    }
  };

  // Check if the product is already in the wishlist
  const fetchWishlistStatus = async () => {
    try {
      const response = await axios.get(`/api/wishlist/${userId}`); // Fetch the wishlist from the backend
      const wishlist = response.data;
      setIsInWishlist(wishlist.some((item) => item.productId === productId)); // Check if product is in wishlist
    } catch (error) {
      console.error("Error fetching wishlist status:", error);
    }
  };

  // Add or remove product from wishlist
 // Add product to wishlist
const toggleWishlist = async () => {
  try {
    if (isInWishlist) {
      // Remove product from wishlist
      const response = await axios.delete("/api/wishlist", {
        data: { userId, productId },
      });
      console.log("Product removed from wishlist:", response.data);
    } else {
      // Add product to wishlist
      const response = await axios.post("/api/wishlist", {
        userId,
        productId,
      });
      console.log("Product added to wishlist:", response.data);
    }
    setIsInWishlist(!isInWishlist); // Toggle wishlist state
  } catch (error) {
    console.error("Error updating wishlist:", error);
  }
};

  // Fetch product data and wishlist status when the component mounts or productId changes
  useEffect(() => {
    fetchProductData();
    fetchWishlistStatus();
    window.scrollTo(0, 0); // Scroll to top when component loads
  }, [productId]);

  return productData ? (
    <div className="pt-10 transition-opacity duration-500 ease-in border-t-2 opacity-100">
      {/* Product Images and Details */}
      <div className="flex flex-col gap-12 sm:gap-12 sm:flex-row">
        {/* Product Images */}
        <div className="flex flex-col-reverse flex-1 gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)} // Update the main image when thumbnail is clicked
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt={productData.name} />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h1 className="mt-2 text-2xl font-medium">{productData.name}</h1>
          </div>
          <div className="flex items-center gap-1 mt-2">
            {/* Ratings (add dynamic logic if you want to show actual ratings) */}
            <img src={assets.star_icon} alt="" className="w-4" />
            <img src={assets.star_icon} alt="" className="w-4" />
            <img src={assets.star_icon} alt="" className="w-4" />
            <img src={assets.star_icon} alt="" className="w-4" />
            <img src={assets.star_dull_icon} alt="" className="w-4" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

          {/* Size Selection */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)} // Set the selected size
                  className={`border py-2 px-4 bg-gray-100 ${item === size ? "border-orange-500" : ""}`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart and Wishlist Buttons */}
          <div className="flex gap-4 items-center">
            <button
              onClick={() => addToCart(productData._id, size)}
              className="px-8 py-3 text-sm text-white bg-black active:bg-gray-700"
            >
              ADD TO CART
            </button>
            <button onClick={toggleWishlist} className="text-2xl">
              {isInWishlist ? <FaHeart color="red" /> : <FaRegHeart />} {/* Heart icon toggles based on wishlist status */}
            </button>
          </div>
          <hr className="mt-8 sm:w-4/5" />
          <div className="flex flex-col gap-1 mt-5 text-sm text-gray-500">
            <p>100% Original Product</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Product Description and Reviews */}
      <div className="mt-20">
        <div className="flex">
          <p className="px-5 py-3 text-sm border">Description</p>
          <p className="px-5 py-3 text-sm border">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 px-6 py-6 text-sm text-gray-500 border">
          <p>{productData.detailedDescription}</p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className="opacity-0"></div> // Display nothing if product data is not loaded
  );
};

export default Product;
