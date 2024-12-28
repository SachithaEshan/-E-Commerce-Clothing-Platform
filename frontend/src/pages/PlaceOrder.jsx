import React, { useState, useContext } from "react";
import Title from "../components/Title";
import CartTotal from "../components/cartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");

  const { navigate } = useContext(ShopContext);

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
      {/* Delivery Information Section */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>

        <div className="space-y-4 text-left">
          <div className="flex gap-3">
            <input
              className="border border-gray-300 rounded px-4 py-2 h-10 w-full text-sm"
              type="text"
              placeholder="First name"
            />
            <input
              className="border border-gray-300 rounded px-4 py-2 h-10 w-full text-sm"
              type="text"
              placeholder="Last name"
            />
          </div>
          <input
            className="border border-gray-300 rounded px-4 py-2 h-10 w-full text-sm"
            type="email"
            placeholder="Email address"
          />
          <input
            className="border border-gray-300 rounded px-4 py-2 h-10 w-full text-sm"
            type="text"
            placeholder="Street"
          />
          <div className="flex gap-3">
            <input
              className="border border-gray-300 rounded px-4 py-2 h-10 w-full text-sm"
              type="text"
              placeholder="City"
            />
            <input
              className="border border-gray-300 rounded px-4 py-2 h-10 w-full text-sm"
              type="text"
              placeholder="State"
            />
          </div>
          <div className="flex gap-3">
            <input
              className="border border-gray-300 rounded px-4 py-2 h-10 w-full text-sm"
              type="number"
              placeholder="Zipcode"
            />
            <input
              className="border border-gray-300 rounded px-4 py-2 h-10 w-full text-sm"
              type="text"
              placeholder="Country"
            />
          </div>
          <input
            className="border border-gray-300 rounded px-4 py-2 h-10 w-full text-sm"
            type="number"
            placeholder="Phone"
          />
        </div>

        {/* Cart Total Section */}
        <div className="mt-8">
          <CartTotal />
        </div>
      </div>

      {/* Payment Method Section */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
        </div>

        <div className="flex flex-col gap-4">
          <div
            onClick={() => setMethod("stripe")}
            className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${
              method === "stripe" ? "border-green-400" : ""
            }`}
          >
            <p
              className={`min-w-[14px] h-[14px] border rounded-full ${
                method === "stripe" ? "bg-green-400" : ""
              }`}
            ></p>
            <img className="h-5 mx-4" src={assets.stripe_logo} alt="Stripe" />
          </div>

          <div
            onClick={() => setMethod("razorpay")}
            className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${
              method === "razorpay" ? "border-green-400" : ""
            }`}
          >
            <p
              className={`min-w-[14px] h-[14px] border rounded-full ${
                method === "razorpay" ? "bg-green-400" : ""
              }`}
            ></p>
            <img
              className="h-5 mx-4"
              src={assets.razorpay_logo}
              alt="Razorpay"
            />
          </div>

          <div
            onClick={() => setMethod("cod")}
            className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${
              method === "cod" ? "border-green-400" : ""
            }`}
          >
            <p
              className={`min-w-[14px] h-[14px] border rounded-full ${
                method === "cod" ? "bg-green-400" : ""
              }`}
            ></p>
            <p className="text-gray-500 text-sm font-medium mx-4">
              CASH ON DELIVERY
            </p>
          </div>
        </div>

        <div className="w-full text-end mt-8">
          <button
            onClick={() => navigate("/orders")}
            className="bg-black text-white px-16 py-3 text-sm"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
