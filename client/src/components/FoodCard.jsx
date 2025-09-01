import React, { useState } from "react";
import {
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaDrumstickBite,
  FaLeaf,
  FaStar,
  FaRegStar,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "../redux/userSlice";

function FoodCard({ data }) {
  const [quantity, setQuantity] = useState(0);
  const { cartItems } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleIncrease = () => {
    const newQty = quantity + 1;
    setQuantity(newQty);
    dispatch(updateQuantity({ id: data._id, quantity: newQty }));
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      const newQty = quantity - 1;
      setQuantity(newQty);
      dispatch(updateQuantity({ id: data._id, quantity: newQty }));
    }
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      dispatch(
        addToCart({
          id: data._id,
          name: data.name,
          shop: data.shop,
          price: data.price,
          quantity,
          image: data.image,
          type: data.type,
        })
      );
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-yellow-400" />
        ) : (
          <FaRegStar key={i} className="text-yellow-400" />
        )
      );
    }
    return stars;
  };

  return (
    <div className="w-[260px] rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-2 hover:border-[#ff4d2d]/60 transition-all duration-300 flex flex-col">
      {/* Image Section */}
      <div className="relative w-full h-[180px] flex justify-center items-center">
        <div className="absolute top-3 right-3 bg-white/90 rounded-full p-2 shadow-md">
          {data.type === "veg" ? (
            <FaLeaf className="text-green-600 text-lg" />
          ) : (
            <FaDrumstickBite className="text-red-600 text-lg" />
          )}
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />

        {/* Badges */}
        {data.isSpecial && (
          <div className="absolute top-3 left-3 z-20">
            <span className="bg-gradient-to-r from-[#ff4d2d] to-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse flex items-center gap-1">
              🍽️ Chef's Special
            </span>
          </div>
        )}
        {data.isNew && (
          <div className="absolute bottom-3 left-3 z-20">
            <span className="bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full shadow-md animate-bounce">
              ✨ New
            </span>
          </div>
        )}

        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-4">
        <h3 className="font-semibold text-gray-900 text-lg line-clamp-1">
          {data.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          {renderStars(Math.round(data.rating?.average || 0))}
          <span className="text-xs text-gray-500">
            ({data.rating?.count || 0})
          </span>
        </div>

        {/* Price & Controls */}
        <div className="flex items-center justify-between mt-auto pt-4">
          <span className="font-bold text-gray-900 text-xl">
            ₹{data.price}
          </span>

          <div className="flex items-center rounded-full bg-gray-100 shadow-inner overflow-hidden">
            <button
              onClick={handleDecrease}
              className="px-3 py-2 hover:bg-gray-200 transition"
            >
              <FaMinus size={12} />
            </button>
            <span className="px-3 text-sm font-medium">{quantity}</span>
            <button
              onClick={handleIncrease}
              className="px-3 py-2 hover:bg-gray-200 transition"
            >
              <FaPlus size={12} />
            </button>
            <button
              className={`${
                cartItems.some((i) => i.id === data._id)
                  ? "bg-gray-700"
                  : "bg-[#ff4d2d]"
              } text-white px-4 py-2 transition-colors flex items-center justify-center`}
              onClick={handleAddToCart}
            >
              <FaShoppingCart size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
