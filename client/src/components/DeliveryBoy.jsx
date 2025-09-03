import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdLocationOn, MdOutlineCheckCircle, MdFastfood, MdDeliveryDining } from "react-icons/md";
import { FaRegClock, FaRegCheckCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import Nav from "./Nav.jsx";
import { serverUrl } from "../App.jsx";
import DeliveryBoyTracking from "../pages/DeliveryBoyTracking.jsx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const PRIMARY = "#ff4d2d";
const ACCENT = "#ffb347";
const BG_GRADIENT = "linear-gradient(135deg, #fff9f6 0%, #ffe5d0 100%)";
const CARD_GRADIENT = "linear-gradient(135deg, #fff 60%, #ffe5d0 100%)";

export default function DeliveryBoy() {
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [assignments, setAssignments] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [todayStats, setTodayStats] = useState([]);
  const { userData } = useSelector((state) => state.user);
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [otp, setOtp] = useState("");

  // 🔹 Track browser GPS and update backend
  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        async (pos) => {
          const newLoc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setLocation(newLoc);

          try {
            await axios.post(
              `${serverUrl}/api/order/update-location`,
              {
                latitude: newLoc.lat,
                longitude: newLoc.lng,
                orderId: currentOrder?._id,
                shopOrderId: currentOrder?.shopOrder?._id,
              },
              { withCredentials: true }
            );
          } catch (err) {
            console.error("Location update failed", err);
          }
        },
        (err) => console.error(err),
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, [currentOrder]);

  // 🔹 Fetch available assignments
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/order/getassignments`, {
          withCredentials: true,
        });
        if (res.data.success) setAssignments(res.data.assignments);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAssignments();
    const interval = setInterval(fetchAssignments, 2000);
    return () => clearInterval(interval);
  }, []);

  // 🔹 Fetch current order
  useEffect(() => {
    const fetchCurrent = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/order/current-order`, {
          withCredentials: true,
        });
        if (res.data.success) setCurrentOrder(res.data.order);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCurrent();
    const interval = setInterval(fetchCurrent, 2000);
    return () => clearInterval(interval);
  }, []);

  // 🔹 Fetch today’s stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/order/stats/today`, {
          withCredentials: true,
        });
        if (res.data.success) setTodayStats(res.data.stats);
      } catch (err) {
        console.error("Failed to fetch today stats", err);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  // 🔹 Accept assignment
  const acceptOrder = async (id) => {
    try {
      const res = await axios.get(
        `${serverUrl}/api/order/accept-assignment/${id}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setAssignments(assignments.filter((a) => a.assignmentId !== id));
        setCurrentOrder(res.data.order);
        alert("Order accepted successfully!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Send OTP request
  const sendOtp = async () => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/order/send-otp`,
        {
          orderId: currentOrder._id,
          shopOrderId: currentOrder.shopOrder._id,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        setShowOtpBox(true);
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP");
    }
  };

  // 🔹 Verify OTP
  const verifyOtp = async () => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/order/verify-otp`,
        {
          orderId: currentOrder._id,
          shopOrderId: currentOrder.shopOrder._id,
          otp,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        alert("Order delivered successfully!");
        setCurrentOrder(null);
        setShowOtpBox(false);
        setOtp("");
      } else {
        alert(res.data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      alert("OTP verification failed");
    }
  };

  return (
    <div
      className="w-screen min-h-screen flex flex-col items-center pb-10 overflow-y-auto"
      style={{
        background: BG_GRADIENT,
        fontFamily: "'Poppins', 'Segoe UI', Arial, sans-serif",
      }}
    >
      <Nav />

      <div className="w-full max-w-[800px] flex flex-col gap-7 items-center">
        {/* Header */}
        <div
          className="rounded-3xl shadow-lg p-6 flex justify-between items-center w-[92%] border border-orange-100"
          style={{
            background: CARD_GRADIENT,
            boxShadow: "0 8px 32px 0 rgba(255, 77, 45, 0.08)",
          }}
        >
          <div>
            <h1 className="text-2xl font-extrabold flex items-center gap-2" style={{ color: PRIMARY }}>
              <MdDeliveryDining size={32} color={ACCENT} />
              Welcome, {userData.fullName}
            </h1>
            {location.lat && (
              <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                <MdLocationOn size={18} color={PRIMARY} />
                <span className="font-semibold">Live Location:</span>
                <span>
                  {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </span>
              </p>
            )}
          </div>
          <div className="hidden md:flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
              alt="Delivery"
              className="w-16 h-16 drop-shadow-lg"
            />
          </div>
        </div>

        {/* Today's Delivery Chart */}
        <div
          className="rounded-3xl shadow-lg p-6 w-[92%] mb-6 border border-orange-100"
          style={{
            background: CARD_GRADIENT,
            boxShadow: "0 8px 32px 0 rgba(255, 179, 71, 0.08)",
          }}
        >
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2" style={{ color: PRIMARY }}>
            <MdFastfood size={24} color={ACCENT} /> Today's Deliveries
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={todayStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" tickFormatter={(h) => `${h}:00`} />
              <YAxis allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  background: "#fff9f6",
                  border: `1px solid ${ACCENT}`,
                  borderRadius: 10,
                  fontWeight: 500,
                }}
                formatter={(value) => [value, "Orders"]}
                labelFormatter={(label) => `${label}:00`}
              />
              <Bar dataKey="count" fill={PRIMARY} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Current Order */}
        {currentOrder && !currentOrder.shopOrder.deliveredAt && (
          <div
            className="rounded-3xl p-6 shadow-lg w-[92%] border border-orange-100"
            style={{
              background: CARD_GRADIENT,
              boxShadow: "0 8px 32px 0 rgba(255, 77, 45, 0.10)",
            }}
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: PRIMARY }}>
              <FaRegClock color={ACCENT} /> Current Order
            </h2>
            <div className="border rounded-xl p-4 mb-4 bg-[#fff6ee] flex items-center gap-4">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
                alt="Shop"
                className="w-12 h-12 rounded-full border-2 border-orange-200 bg-white"
              />
              <div>
                <p className="font-semibold text-base text-orange-700">
                  {currentOrder.shopOrder.shop?.name || "Shop"}
                </p>
                <p className="text-sm text-gray-500">{currentOrder.address?.text}</p>
                <p className="text-xs text-gray-400">
                  {currentOrder.shopOrder.items.length} items | ₹{currentOrder.shopOrder.subtotal}
                </p>
              </div>
            </div>

            <DeliveryBoyTracking currentOrder={currentOrder} />

            {!showOtpBox ? (
              <button
                className="mt-5 w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold py-3 px-4 rounded-2xl shadow-lg hover:from-orange-500 hover:to-orange-600 active:scale-95 transition-all duration-200 text-lg tracking-wide"
                onClick={sendOtp}
              >
                <FaRegCheckCircle className="inline mr-2 mb-1" size={20} />
                Mark As Delivered
              </button>
            ) : (
              <div className="mt-5 p-5 border rounded-2xl bg-[#fff6ee] shadow-inner">
                <p className="text-base font-semibold mb-3">
                  Enter OTP sent to{" "}
                  <span className="text-orange-500">{currentOrder.user?.fullName}</span>
                </p>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                  className="w-full border-2 border-orange-200 px-4 py-3 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-orange-400 text-lg"
                />
                <button
                  className="w-full bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 rounded-xl font-bold hover:from-orange-500 hover:to-orange-600 transition-all text-lg"
                  onClick={verifyOtp}
                >
                  Submit OTP
                </button>
              </div>
            )}
          </div>
        )}

        {/* Available Orders */}
        {!currentOrder && (
          <div
            className="rounded-3xl p-6 shadow-lg w-[92%] border border-orange-100"
            style={{
              background: CARD_GRADIENT,
              boxShadow: "0 8px 32px 0 rgba(255, 179, 71, 0.10)",
            }}
          >
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: PRIMARY }}>
              <MdOutlineCheckCircle color={ACCENT} /> Available Orders Nearby
            </h2>
            <div className="space-y-4">
              {assignments.length > 0 ? (
                assignments.map((order) => (
                  <div
                    key={order.assignmentId}
                    className="border rounded-xl p-4 flex justify-between items-center bg-[#fff6ee] hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
                        alt="Shop"
                        className="w-10 h-10 rounded-full border-2 border-orange-200 bg-white"
                      />
                      <div>
                        <p className="text-base font-semibold text-orange-700">{order.shopName}</p>
                        <p className="text-sm text-gray-500">{order.address?.street}</p>
                        <p className="text-xs text-gray-400">
                          {order.items.length} items | ₹{order.subtotal}
                        </p>
                      </div>
                    </div>
                    <button
                      className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-2 rounded-xl text-base font-bold hover:from-orange-500 hover:to-orange-600 shadow-md transition-all"
                      onClick={() => acceptOrder(order.assignmentId)}
                    >
                      Accept
                    </button>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center py-8">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
                    alt="No Orders"
                    className="w-16 h-16 mb-2 opacity-70"
                  />
                  <p className="text-gray-400 text-base">No new assignments</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
