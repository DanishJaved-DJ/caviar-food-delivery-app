import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import UserDeliveryTracking from "../components/userDeliveryTracking.jsx";
import { MdKeyboardBackspace } from "react-icons/md";
import { FaUtensils, FaMapMarkerAlt, FaUserTie, FaPhoneAlt } from "react-icons/fa";
const PRIMARY = "#ff4d2d";
const BG_GRADIENT = "bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100";

export default function TrackOrderPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  const fetchOrder = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/order/${orderId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        setOrder(res.data.order);
      }
    } catch (err) {
      console.error("Error fetching order:", err);
    }
  };

  useEffect(() => {
    fetchOrder();
    const interval = setInterval(fetchOrder, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!order)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
          alt="Loading"
          className="w-24 h-24 animate-bounce mb-4"
        />
        <p className="text-xl font-semibold text-orange-400">Loading your delicious order...</p>
      </div>
    );

  return (
    <div className={`min-h-screen ${BG_GRADIENT} py-8`}>
      <div className="max-w-4xl mx-auto p-4 flex flex-col gap-8">
        <div className="flex gap-4 items-center mb-6 md:justify-center">
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer bg-white rounded-full shadow-md p-2 hover:bg-orange-100 transition"
            title="Back"
          >
            <MdKeyboardBackspace className="w-7 h-7 text-[#ff4d2d]" />
          </div>
          <h1 className="text-3xl font-extrabold text-orange-600 tracking-tight flex items-center gap-2">
            <FaUtensils className="inline-block text-orange-400" />
            Track Your Order
          </h1>
        </div>
        {order.shopOrders.map((shopOrder) => (
          <div
            key={shopOrder._id}
            className="bg-white p-6 rounded-3xl shadow-xl border-2 border-orange-100 space-y-6 relative overflow-hidden"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundBlendMode: "lighten",
            }}
          >
            <div className="absolute inset-0 bg-white/80 pointer-events-none rounded-3xl" />
            <div className="relative z-10">
              {/* Shop & Order Info */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold mb-1 flex items-center gap-2" style={{ color: PRIMARY }}>
                    <FaUtensils className="inline-block" />
                    {shopOrder.shop?.name || "Shop"}
                  </h2>
                  <p className="text-gray-700">
                    <span className="font-semibold">Items:</span>{" "}
                    <span className="italic text-orange-500">
                      {shopOrder.items.map((i) => i.name).join(", ")}
                    </span>
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Subtotal:</span>{" "}
                    <span className="text-green-600 font-bold">₹{shopOrder.subtotal}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <FaMapMarkerAlt className="text-orange-400" />
                  <span>
                    <span className="font-semibold">Address:</span>{" "}
                    {order.address.text}
                  </span>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="mt-4">
                {shopOrder.status === "delivered" ? (
                  <div className="flex items-center gap-2 text-green-600 font-bold text-lg">
                    <span className="animate-pulse">Delivered</span> ✅
                  </div>
                ) : (
                  <>
                    {/* Delivery Boy Info */}
                    <div className="flex items-center gap-4 bg-orange-50 rounded-xl p-4 shadow-inner mt-2">
                      <FaUserTie className="text-orange-400 text-2xl" />
                      {shopOrder.assignedDeliveryBoy ? (
                        <div className="text-sm text-gray-700">
                          <p>
                            <span className="font-semibold">Name:</span>{" "}
                            {shopOrder.assignedDeliveryBoy.fullName}
                          </p>
                          <p className="flex items-center gap-1">
                            <FaPhoneAlt className="inline-block text-green-500" />
                            <span className="font-semibold">Phone:</span>{" "}
                            <a
                              href={`tel:${shopOrder.assignedDeliveryBoy.mobile}`}
                              className="underline text-blue-600 hover:text-blue-800"
                            >
                              {shopOrder.assignedDeliveryBoy.mobile}
                            </a>
                          </p>
                        </div>
                      ) : (
                        <p className="text-gray-500 italic">
                          Delivery boy not assigned yet
                        </p>
                      )}
                    </div>

                    {/* Tracking Map */}
                    {shopOrder.assignedDeliveryBoy && (
                      <div className="h-[350px] w-full rounded-2xl overflow-hidden shadow-lg mt-6 border-2 border-orange-200">
                        <UserDeliveryTracking
                          orderId={order._id}
                          shopOrderId={shopOrder._id}
                          userLocation={{
                            lat: order.address.latitude,
                            lng: order.address.longitude,
                          }}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
