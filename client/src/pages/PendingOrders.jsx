import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { MdKeyboardBackspace } from "react-icons/md";
import {
  MdLocationOn,
  MdPhone,
  MdOutlineShoppingBag,
} from "react-icons/md";
import {
  setOwnerPendingOrders,
  setDeliveryBoys,
} from "../redux/userSlice";
import { useEffect } from "react";
import getOwnerPendingOrders from "../hooks/getOwnerPendingOrders";
import { useNavigate } from "react-router-dom";

const PRIMARY = "#ff4d2d";
const statusOptions = ["pending", "preparing", "out of delivery"];

export default function PendingOrders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ownerPendingOrders, deliveryBoys } = useSelector(
    (state) => state.user
  );

  // update local redux orders
  const updateLocalShopOrder = (orderId, shopId, updatedShopOrder) => {
    if (!ownerPendingOrders) return;
    const updated = ownerPendingOrders.map((order) => {
      if (order._id === orderId && order.shopOrder?.shop?._id === shopId) {
        return {
          ...order,
          shopOrder: updatedShopOrder,
        };
      }
      return order;
    });
    dispatch(setOwnerPendingOrders(updated));
  };

  // update order status API call
  const updateStatus = async (orderId, shopId, status) => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/order/update-order-status/${orderId}/${shopId}`,
        { status },
        { withCredentials: true }
      );

      if (!res?.data?.success) {
        console.error("Update failed:", res?.data);
        return;
      }

      if (res.data.shopOrder) {
        updateLocalShopOrder(orderId, shopId, res.data.shopOrder);
      }

      if (res.data.deliveryBoys) {
        dispatch(setDeliveryBoys(res.data.deliveryBoys));
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status. Check server logs.");
    }
  };

  // render no orders
  if (!ownerPendingOrders || ownerPendingOrders.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-center bg-gradient-to-br from-orange-50 to-yellow-100">
        <div>
          <div
            className="mx-auto mb-4 h-20 w-20 flex items-center justify-center rounded-full shadow-lg"
            style={{
              background:
                "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
              color: PRIMARY,
            }}
          >
            <MdOutlineShoppingBag size={36} />
          </div>
          <h2 className="text-xl font-bold text-orange-700">
            No Pending Orders
          </h2>
          <p className="text-gray-500 text-base">
            You're all caught up for now.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gradient-to-br from-orange-50 to-yellow-100 min-h-screen">
      <div className="flex gap-[20px] items-center mb-8 md:justify-center">
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer hover:scale-110 transition-transform"
        >
          <MdKeyboardBackspace className="w-[30px] h-[30px] text-[#ff4d2d]" />
        </div>
        <h1 className="text-3xl font-extrabold text-orange-800 drop-shadow-sm md:text-center tracking-tight">
          🍽️ My Orders
        </h1>
      </div>

      <div className="flex flex-col items-center gap-8">
        {ownerPendingOrders?.map((order) => {
          const orderId = order._id;
          const shopId = order.shopOrder?.shop?._id;

          return (
            <div
              key={orderId}
              className="w-full max-w-[800px] bg-white rounded-3xl border-2 border-orange-200 shadow-xl hover:shadow-2xl transition-all p-7 flex flex-col gap-5 relative overflow-hidden"
              style={{
                background:
                  "linear-gradient(120deg, #fff7ed 60%, #ffe0b2 100%)",
              }}
            >
              {/* Decorative Food Image */}
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80"
                alt="food"
                className="absolute right-4 top-4 w-20 h-20 object-cover rounded-full shadow-lg opacity-20 pointer-events-none select-none"
                loading="lazy"
              />

              {/* Customer Info */}
              <div className="flex items-center gap-4">
                <div className="bg-orange-100 rounded-full p-3 shadow">
                  <MdOutlineShoppingBag size={28} className="text-orange-500" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-orange-800">
                    {order.user?.fullName ||
                      order.user?.name ||
                      "Customer"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {order.user?.email}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <MdPhone size={16} className="text-orange-400" />
                    {order?.user?.mobile || "N/A"}
                  </div>
                </div>
              </div>

              {/* Address */}
              {order.address && (
                <div className="flex items-start gap-2 text-gray-700 text-sm bg-orange-50 rounded-lg px-3 py-2">
                  <MdLocationOn size={18} className="mt-[2px] text-orange-400" />
                  <div>
                    {order.address?.text}
                    {order.address?.latitude &&
                      order.address?.longitude && (
                        <p className="text-xs text-gray-500">
                          Lat: {order.address.latitude}, Lng:{" "}
                          {order.address.longitude}
                        </p>
                      )}
                  </div>
                </div>
              )}

              {/* Items */}
              <div>
                <p className="text-base font-semibold mb-2 text-orange-700">
                  Items:
                </p>
                <div className="space-y-2">
                  {order.shopOrder?.items?.map((item) => (
                    <div
                      key={item.item?._id || item.name}
                      className="flex justify-between text-sm text-gray-700 bg-orange-50 rounded-lg px-3 py-2"
                    >
                      <div>
                        <span className="font-semibold text-orange-800">
                          {item.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {" "}
                          × {item.quantity}
                        </span>
                      </div>
                      <div className="font-bold text-orange-600">
                        ₹{item.quantity * item.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-orange-100">
                <span className="text-base">
                  Status:{" "}
                  <span
                    className="font-bold capitalize px-2 py-1 rounded-lg"
                    style={{
                      color: "#fff",
                      background:
                        order.shopOrder?.status === "pending"
                          ? "#ffb347"
                          : order.shopOrder?.status === "preparing"
                          ? "#ff7043"
                          : order.shopOrder?.status === "out of delivery"
                          ? "#29b6f6"
                          : "#43a047",
                    }}
                  >
                    {order.shopOrder?.status}
                  </span>
                </span>

                {/* Hide select if already delivered */}
                {order.shopOrder?.status !== "delivered" && (
                  <select
                    className="rounded-lg border-2 border-orange-300 px-4 py-2 text-sm font-semibold text-orange-700 bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-200 transition"
                    onChange={(e) =>
                      updateStatus(orderId, shopId, e.target.value)
                    }
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Change Status
                    </option>
                    {statusOptions.map((st) => (
                      <option key={st} value={st} className="text-gray-700">
                        {st.charAt(0).toUpperCase() + st.slice(1)}
                      </option>
                    ))}
                  </select>
                )}
              </div>

              {/* Delivery Boys */}
              {order.shopOrder?.status === "out of delivery" && (
                <div className="mt-3 p-3 border border-orange-200 rounded-xl text-sm bg-orange-100 shadow-inner">
                  {order.shopOrder?.assignedDeliveryBoy ? (
                    <p className="font-semibold text-orange-700">
                      Assigned To:{" "}
                      {order.shopOrder.assignedDeliveryBoy.fullName ||
                        order.shopOrder.assignedDeliveryBoy.name}{" "}
                      ({order.shopOrder.assignedDeliveryBoy.mobile})
                    </p>
                  ) : (
                    <>
                      <p className="font-semibold text-orange-700 mb-2">
                        Available Delivery Boys:
                      </p>
                      {deliveryBoys?.length > 0 ? (
                        <ul className="list-disc list-inside text-gray-700">
                          {deliveryBoys.map((boy) => (
                            <li key={boy._id || boy.id}>
                              {boy.fullName || boy.name} ({boy.mobile})
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 italic">
                          Waiting for delivery boy to accept...
                        </p>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Total */}
              <div className="text-right font-extrabold text-orange-900 text-lg mt-2">
                Total: ₹{order.shopOrder?.subtotal}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
