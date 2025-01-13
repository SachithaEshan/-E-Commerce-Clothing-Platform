import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      <img className="w-full sm:w-full" src={assets.hero_img} alt="" />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-black text-sm sm:text-base  absolute -translate-x-[-75%] translate-y-[90px] max-w-lg ">
          Gear up for success. Discover high-performance apparel designed to
          move with you, whether you're training hard or pushing limits. Shop
          the latest styles now and get ready to conquer every challenge.
        </p>
      </div>
      <div className="relative flex flex-col ">
        <button
          className="absolute right-1/2 transform -translate-x-[80%] translate-y-[-40px] bottom-40 bg-black text-white text-sm sm:text-base py-2 px-4 rounded hover:bg-gray-800 transition whitespace-nowrap w-64"
          onClick={() => navigate("/collection")} // Navigates to /collection page
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
