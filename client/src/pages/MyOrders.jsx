import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setMyOrders } from "../redux/userSlice";
import { MdKeyboardBackspace } from "react-icons/md";
import { FaUtensils, FaCheckCircle, FaRegClock } from "react-icons/fa";

export default function MyOrders() {
  const { myOrders, socket } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/order/getmy`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setMyOrders(res.data.orders));
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [dispatch]);

  // socket listener
  useEffect(() => {
    if (!socket) return;
    socket.on("orders:statusUpdated", (data) => {
      dispatch(
        setMyOrders(
          myOrders.map((order) => {
            if (order._id === data.orderId) {
              return {
                ...order,
                shopOrders: order.shopOrders.map((so) =>
                  so._id === data.shopOrder._id
                    ? { ...so, status: data.shopOrder.status }
                    : so
                ),
              };
            }
            return order;
          })
        )
      );
    });
  }, [socket, myOrders, dispatch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (!loading && myOrders?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gradient-to-br from-[#fff0e6] to-[#ffe5d0] rounded-xl shadow-lg p-10">
        <img src="/empty-plate.svg" alt="No Orders" className="w-32 mb-6" />
        <p className="text-gray-700 text-lg mb-4 font-semibold">
          You have no orders yet.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] hover:from-[#ff4d2d] hover:to-[#ff7e5f] text-white px-8 py-3 rounded-full font-bold shadow-lg transition-all"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#fff0e6] to-[#ffe5d0] flex justify-center px-4 py-8">
      <div className="w-full max-w-[900px] p-4">
        {/* Header */}
        <div className="flex gap-4 items-center mb-8">
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer bg-white rounded-full shadow p-2 hover:bg-[#ffede3] transition"
          >
            <MdKeyboardBackspace className="w-7 h-7 text-[#ff4d2d]" />
          </div>
          <h1 className="text-3xl font-extrabold text-[#ff4d2d] flex items-center gap-2">
            <FaUtensils className="inline-block mb-1" /> My Orders
          </h1>
        </div>

        <div className="space-y-8">
          {myOrders?.map((order) => (
            <div
              key={order?._id}
              className="bg-white rounded-3xl shadow-xl p-6 space-y-5 border-4 border-[#fff3e6] hover:shadow-2xl transition-all"
            >
              {/* Order Info */}
              <div className="flex justify-between items-center border-b pb-3">
                <div>
                  <p className="font-bold text-lg text-[#ff4d2d]">
                    Order #{order?._id?.slice(-6)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Date: {formatDate(order?.createdAt)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    Payment:{" "}
                    <span className="font-semibold text-[#ff7e5f]">
                      {order?.paymentMethod?.toUpperCase()}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Status:{" "}
                    <span
                      className={`font-bold ${
                        order?.shopOrders?.[0]?.status === "delivered"
                          ? "text-green-600"
                          : "text-blue-600"
                      }`}
                    >
                      {order?.shopOrders?.[0]?.status}
                    </span>
                  </p>
                </div>
              </div>

              {/* Shop-wise Orders */}
              <div className="grid gap-5 md:grid-cols-2">
                {order?.shopOrders?.map((shopOrder, idx) => (
                  <div
                    key={idx}
                    className="border-2 border-[#ffe5d0] rounded-2xl p-4 bg-[#fffaf7] space-y-3 shadow hover:shadow-lg transition"
                  >
                    {/* Shop Name */}
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={shopOrder?.shop?.image || "/shop-placeholder.png"}
                        alt={shopOrder?.shop?.name}
                        className="w-10 h-10 rounded-full object-cover border-2 border-[#ffb88c]"
                      />
                      <p className="font-semibold text-[#ff7e5f] text-lg">
                        {shopOrder?.shop?.name || "N/A"}
                      </p>
                    </div>

                    {/* Items */}
                    <div className="flex space-x-4 overflow-x-auto pb-2">
                      {shopOrder.items.map((item) => (
                        <div
                          key={item?._id}
                          className="flex-shrink-0 w-36 border rounded-xl p-2 bg-white shadow-sm"
                        >
                          <img
                            src={item?.item?.image || "/placeholder.png"}
                            alt={item?.name}
                            className="w-full h-20 object-cover rounded-lg"
                          />
                          <p className="text-sm font-semibold mt-1 text-[#ff4d2d]">
                            {item?.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Qty: {item?.quantity} × ₹{item?.price}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Shop Subtotal */}
                    <div className="flex justify-between items-center border-t pt-2">
                      <p className="font-semibold text-[#ff7e5f]">
                        Subtotal: ₹{shopOrder?.subtotal}
                      </p>
                      <span
                        className={`text-sm font-bold flex items-center gap-1 ${
                          shopOrder?.status === "delivered"
                            ? "text-green-600"
                            : "text-blue-600"
                        }`}
                      >
                        {shopOrder?.status === "delivered" ? (
                          <FaCheckCircle />
                        ) : (
                          <FaRegClock />
                        )}
                        {shopOrder?.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Overall Order Total */}
              <div className="flex justify-between items-center border-t pt-4 mt-2">
                <p className="font-bold text-xl text-[#ff4d2d]">
                  Total: ₹{order?.totalAmount}
                </p>

                {order?.shopOrders?.[0]?.status === "delivered" ? (
                  <span className="text-green-600 font-bold flex items-center gap-2 text-lg">
                    Delivered <FaCheckCircle />
                  </span>
                ) : (
                  <button
                    onClick={() => navigate(`/track-order/${order._id}`)}
                    className="bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] hover:from-[#ff4d2d] hover:to-[#ff7e5f] text-white px-6 py-2 rounded-full font-bold shadow-lg text-sm transition-all"
                  >
                    Track Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
