import React from 'react'
import Nav from './Nav'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaUtensils, FaPen, FaPlus } from "react-icons/fa";
import Footer from './Footer'
import OwnerFoodCard from './OwnerFoodCard'
import { useEffect } from 'react';
import { setPendingOrdersCount } from '../redux/userSlice';

function OwnerDashboard() {
  const { shop, ownerPendingOrders } = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    const pending = ownerPendingOrders.filter(order => order.shopOrder.status === "pending");
    dispatch(setPendingOrdersCount(pending.length));
  }, [ownerPendingOrders])

  // Gradient backgrounds and glassmorphism styles
  const gradientBg = "bg-gradient-to-br from-orange-50 via-white to-orange-100";
  const glassCard = "backdrop-blur-md bg-white/70 border border-orange-100 shadow-2xl";

  return (
    <div className={`w-full min-h-screen ${gradientBg} flex flex-col items-center`}>
      <Nav />

      {/* If no shop */}
      {!shop && (
        <div className="flex justify-center items-center p-4 sm:p-6 min-h-[60vh]">
          <div className={`w-full max-w-md ${glassCard} rounded-3xl p-8 border-2 border-orange-200 hover:shadow-2xl transition-shadow duration-300`}>
            <div className="flex flex-col items-center text-center">
              <FaUtensils className="text-[#ff4d2d] w-20 h-20 mb-6 drop-shadow-lg animate-bounce" />
              <h2 className="text-3xl font-extrabold text-gray-800 mb-2 tracking-tight">
                Add Your Restaurant
              </h2>
              <p className="text-gray-600 mb-6 text-base">
                Join our food delivery platform and reach thousands of hungry customers every day.
              </p>
              <button
                className="bg-gradient-to-r from-[#ff4d2d] to-orange-400 text-white px-7 py-3 rounded-full font-bold shadow-lg hover:scale-105 hover:from-orange-500 transition-all duration-200"
                onClick={() => navigate("/editshop")}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}

      {/* If shop exists but no items */}
      {shop && shop?.items?.length === 0 && (
        <div className='w-full flex flex-col items-center gap-8 px-4 sm:px-6'>
          <h1 className="text-3xl text-gray-900 flex items-center gap-3 mt-10 text-center font-extrabold drop-shadow">
            <FaUtensils className="text-[#ff4d2d] animate-pulse" /> Welcome to <span className="text-orange-500">{shop.name}</span>
          </h1>

          {/* Shop Card */}
          <div className={`${glassCard} rounded-2xl overflow-hidden border-2 border-orange-200 hover:shadow-2xl transition-all duration-300 w-full max-w-3xl relative`}>
            <button
              onClick={() => navigate("/editshop")}
              className="absolute top-4 right-4 bg-gradient-to-tr from-[#ff4d2d] to-orange-400 text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
              title="Edit Shop"
            >
              <FaPen />
            </button>
            <img
              src={shop.image}
              alt={shop.name}
              className="w-full h-56 sm:h-72 object-cover object-center border-b-4 border-orange-200"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{shop.name}</h2>
              <p className="text-gray-500 mb-2">{shop.city}, {shop.state}</p>
              <p className="text-gray-700 mb-4">{shop.address}</p>
              <div className="text-xs text-gray-400 flex gap-6">
                <p>Created: <span className="font-semibold">{new Date(shop.createdAt).toLocaleString()}</span></p>
                <p>Last Updated: <span className="font-semibold">{new Date(shop.updatedAt).toLocaleString()}</span></p>
              </div>
            </div>
          </div>

          {/* Add Item Section */}
          <div className="flex items-center justify-center w-full">
            <div className={`${glassCard} border-2 border-orange-200 rounded-2xl p-8 w-full max-w-xl text-center hover:shadow-2xl transition-all duration-300`}>
              <FaUtensils className="text-orange-500 text-5xl mx-auto mb-4 drop-shadow-lg" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Add Your Food Items</h2>
              <p className="text-gray-600 mb-6 text-base">
                Share your delicious creations with our customers by adding them to the menu.
              </p>
              <button
                className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-400 to-[#ff4d2d] text-white px-7 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition-all"
                onClick={() => navigate("/additem")}
              >
                <FaPlus /> Add Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* If shop and items exist */}
      {shop && shop?.items.length > 0 && (
        <div className='w-full flex flex-col gap-8 items-center px-4 sm:px-6 mb-10'>
          <h1 className="text-3xl text-gray-900 flex items-center gap-3 mt-10 text-center font-extrabold drop-shadow">
            <FaUtensils className="text-[#ff4d2d] animate-pulse" /> Welcome to <span className="text-orange-500">{shop.name}</span>
          </h1>

          {/* Shop Card */}
          <div className={`${glassCard} rounded-2xl overflow-hidden border-2 border-orange-200 hover:shadow-2xl transition-all duration-300 w-full max-w-3xl relative`}>
            <button
              onClick={() => navigate("/editshop")}
              className="absolute top-4 right-4 bg-gradient-to-tr from-[#ff4d2d] to-orange-400 text-white p-3 rounded-full shadow-lg hover:scale-110 transition"
              title="Edit Shop"
            >
              <FaPen />
            </button>
            <img
              src={shop.image}
              alt={shop.name}
              className="w-full h-56 sm:h-72 object-cover object-center border-b-4 border-orange-200"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{shop.name}</h2>
              <p className="text-gray-500 mb-2">{shop.city}, {shop.state}</p>
              <p className="text-gray-700 mb-4">{shop.address}</p>
              <div className="text-xs text-gray-400 flex gap-6">
                <p>Created: <span className="font-semibold">{new Date(shop.createdAt).toLocaleString()}</span></p>
                <p>Last Updated: <span className="font-semibold">{new Date(shop.updatedAt).toLocaleString()}</span></p>
              </div>
            </div>
          </div>

          {/* Food Items - one per row */}
          <div className="flex flex-col items-center gap-6 w-full max-w-3xl">
            {shop?.items.map((item, index) => (
              <div
                key={index}
                className="w-full"
                style={{
                  background: "linear-gradient(90deg, #fff7f0 0%, #ffe0c3 100%)",
                  borderRadius: "1.5rem",
                  boxShadow: "0 6px 24px 0 rgba(255, 77, 45, 0.08)",
                  padding: "0.5rem"
                }}
              >
                <OwnerFoodCard item={item} />
              </div>
            ))}
          </div>

          {/* Add Item Floating Button */}
          <button
            className="fixed bottom-8 right-8 z-50 bg-gradient-to-br from-orange-400 to-[#ff4d2d] text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center gap-2 font-bold text-lg"
            onClick={() => navigate("/additem")}
            title="Add New Food Item"
          >
            <FaPlus className="text-2xl" /> Add Item
          </button>
        </div>
      )}

    </div>
  )
}

export default OwnerDashboard
