import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { GiKnifeFork, GiPartyPopper } from "react-icons/gi";

export default function OrderPlaced() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff9f6] via-[#ffe5d0] to-[#ffd6c0] flex flex-col justify-center items-center px-4 text-center relative overflow-hidden">
      {/* Decorative Food Icons */}
      <GiKnifeFork className="absolute top-8 left-8 text-[#ff4d2d] text-5xl opacity-20 rotate-[-20deg]" />
      <GiPartyPopper className="absolute bottom-8 right-8 text-yellow-400 text-5xl opacity-20 rotate-12" />

      {/* Animated Checkmark */}
      <div className="bg-white rounded-full shadow-lg p-6 mb-4 animate-bounce">
        <FaCheckCircle className="text-green-500 text-6xl" />
      </div>

      <h1 className="text-4xl font-extrabold text-[#ff4d2d] mb-2 drop-shadow-lg">
        Order Placed!
      </h1>
      <p className="text-gray-700 max-w-md mb-6 text-lg">
        <span className="font-semibold text-[#ff4d2d]">Thank you</span> for your purchase! <br />
        Your delicious meal is being prepared by our chefs. <br />
        Track your order status in <span className="font-semibold">My Orders</span>.
      </p>
      <button
        onClick={() => navigate("/my-orders")}
        className="bg-[#ff4d2d] hover:bg-[#e64526] shadow-lg text-white px-8 py-3 rounded-full text-lg font-bold transition transform hover:scale-105"
      >
        🍽️ Back to My Orders
      </button>

      {/* Decorative Food Images */}
      <img
        src="https://img.icons8.com/color/96/000000/pizza.png"
        alt="Pizza"
        className="absolute left-4 bottom-24 w-16 opacity-30 rotate-[-12deg] pointer-events-none"
      />
      <img
        src="https://img.icons8.com/color/96/000000/hamburger.png"
        alt="Burger"
        className="absolute right-4 top-24 w-16 opacity-30 rotate-12 pointer-events-none"
      />
    </div>
  );
}
