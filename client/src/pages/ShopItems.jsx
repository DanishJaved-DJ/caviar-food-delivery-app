import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../App.jsx";
import FoodCard from "../components/FoodCard.jsx";
import {
  FaMapMarkerAlt,
  FaUtensils,
  FaStoreAlt,
  FaArrowLeft,
  FaStar,
  FaClock,
} from "react-icons/fa";

function ShopItems() {
  const { shopId } = useParams();
  const [items, setItems] = useState([]);
  const [shop, setShop] = useState(null);
  const navigate = useNavigate();

  const handleGetShopItems = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/item/getitemsbyshop/${shopId}`,
        { withCredentials: true }
      );
      setItems(result.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetShop = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/shop/getshopbyid/${shopId}`,
        { withCredentials: true }
      );
      setShop(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetShopItems();
    handleGetShop();
  }, [shopId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-orange-100">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white px-4 py-2 rounded-full shadow-lg transition"
      >
        <FaArrowLeft className="text-lg" />
        <span className="hidden md:inline font-semibold">Back</span>
      </button>

      {/* Shop Hero Section */}
      {shop && (
        <div className="relative w-full h-72 md:h-96 lg:h-[32rem] rounded-b-3xl overflow-hidden shadow-xl">
          <img
            src={shop.image || "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"}
            alt={shop.name}
            className="w-full h-full object-cover object-center scale-105 blur-[1px] brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30 flex flex-col justify-center items-center text-center px-4">
            <div className="bg-white/20 p-4 rounded-full mb-4 shadow-lg">
              <FaStoreAlt className="text-white text-5xl drop-shadow-md" />
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg tracking-tight">
              {shop.name}
            </h1>
            {shop.description && (
              <p className="text-gray-100 text-base md:text-xl mt-4 max-w-2xl font-medium drop-shadow">
                {shop.description}
              </p>
            )}
            <div className="flex gap-4 justify-center mt-6">
              <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-yellow-300 font-semibold text-lg shadow">
                <FaStar className="text-yellow-400" /> {shop.rating || "4.8"}
              </span>
              <span className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full text-white font-semibold text-lg shadow">
                <FaClock className="text-pink-200" />{" "}
                {shop.openingHours || "9am - 10pm"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Shop Info */}
      {shop && (
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <div className="flex items-center justify-center gap-3 text-gray-700">
            <FaMapMarkerAlt className="w-6 h-6 text-pink-500" />
            <p className="text-lg md:text-xl font-semibold">
              {shop.address || "Address not available"}
            </p>
          </div>
        </div>
      )}

      {/* Items Section */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="flex items-center justify-center gap-3 text-4xl font-extrabold mb-12 text-gray-800 tracking-tight">
          <FaUtensils className="text-orange-500" />
          <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
            Our Menu
          </span>
        </h2>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {items.map((item, index) => (
              <div
                key={index}
                className="transform transition duration-300 hover:scale-105"
              >
                <FoodCard
                  data={item}
                  className="rounded-3xl shadow-xl border border-orange-100 bg-white/80 hover:bg-white/100 transition"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center mt-16">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
              alt="No items"
              className="w-24 h-24 opacity-60 mb-4"
            />
            <p className="text-center text-gray-500 text-xl font-medium">
              No items available
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShopItems;
