import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function MyDeliveredOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeliveredOrders = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/order/my-delivered-orders`,
          { withCredentials: true }
        );
        if (res.data.success) {
          setOrders(res.data.orders);
        }
      } catch (err) {
        console.error("Error fetching delivered orders:", err);
      }
    };

    fetchDeliveredOrders();
  }, []);

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-gray-500 bg-gradient-to-br from-orange-50 to-yellow-100">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
          alt="No orders"
          className="w-32 mb-4 opacity-80 drop-shadow-lg"
        />
        <p className="text-xl font-semibold">No delivered orders yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gradient-to-br from-orange-50 to-yellow-100 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-8 text-gray-900 flex items-center gap-3 drop-shadow">
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer bg-white rounded-full p-2 shadow hover:bg-orange-100 transition"
        >
          <MdKeyboardBackspace className="w-[28px] h-[28px] text-[#ff4d2d]" />
        </div>
        <span className="text-3xl animate-bounce">🍔</span>
        <span style={{ color: "#ff4d2d" }}>My Delivered Orders</span>
      </h2>
      <div className="grid gap-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-3xl shadow-xl border border-orange-100 p-7 transition hover:scale-[1.02] hover:shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -top-8 -right-8 opacity-10 text-[8rem] pointer-events-none select-none">
              🍕
            </div>
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <p className="text-base text-gray-500 font-medium">
                Order ID: <span className="font-mono">{order._id}</span>
              </p>
              <span className="text-xs px-4 py-1 rounded-full font-bold bg-green-100 text-green-700 border border-green-200 shadow-sm flex items-center gap-1">
                <span className="text-lg">✅</span> Delivered
              </span>
            </div>

            {order.shopOrders
              .filter((so) => so.status === "delivered")
              .map((so) => (
                <div
                  key={so._id}
                  className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-2xl p-5 mb-4 border border-orange-100 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={so.shop?.image || "https://cdn-icons-png.flaticon.com/512/3075/3075977.png"}
                      alt={so.shop?.name}
                      className="w-10 h-10 rounded-full border-2 border-orange-200 shadow"
                    />
                    <p
                      className="font-bold text-xl"
                      style={{ color: "#ff4d2d" }}
                    >
                      {so.shop?.name}
                    </p>
                  </div>
                  <ul className="mt-2 space-y-2 text-base text-gray-700">
                    {so.items.map((it) => (
                      <li
                        key={it._id}
                        className="flex justify-between items-center border-b last:border-0 pb-2"
                      >
                        <span className="flex items-center gap-2">
                          <img
                            src={it.image || "https://cdn-icons-png.flaticon.com/512/1046/1046784.png"}
                            alt={it.name}
                            className="w-7 h-7 rounded-full border border-orange-100"
                          />
                          <span>
                            {it.name} <span className="text-orange-400 font-semibold">× {it.quantity}</span>
                          </span>
                        </span>
                        <span
                          className="font-bold text-lg"
                          style={{ color: "#ff4d2d" }}
                        >
                          ₹{it.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex justify-between items-center mt-4 text-base font-medium">
                    <span className="text-gray-500">
                      Total Items: <span className="font-bold text-orange-500">{so.items.length}</span>
                    </span>
                    <span
                      className="font-extrabold text-xl"
                      style={{ color: "#ff4d2d" }}
                    >
                      Subtotal: ₹{so.subtotal}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
