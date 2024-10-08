// App.js
import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="flex justify-center h-screen bg-gradient-to-br from-green-400 to-green-600 text-white">
      <div className="text-center mt-52 animate-fade-in">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce-in">
          <span className="text-green-500 text-5xl">✔</span>
        </div>
        
        {/* Success Message */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-slide-up">
          Order Placed Successfully!
        </h1>

        {/* Sub Message */}
        <p className="text-lg md:text-xl opacity-90 animate-slide-up delay-100">
          Thank you for your purchase. We’ll send a confirmation shortly!
        </p>

        {/* Back to Shop Button */}
        <Link to={"/"}>
        <button className="mt-8 px-6 py-3 bg-white text-green-500 rounded-full text-lg font-medium hover:bg-gray-100 transition duration-300 animate-fade-in">
          Continue Shopping
        </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
