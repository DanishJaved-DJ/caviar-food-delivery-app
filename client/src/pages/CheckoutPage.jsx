import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { MdDeliveryDining, MdKeyboardBackspace } from "react-icons/md";
import { FaMapMarkerAlt, FaCreditCard, FaMobileAlt, FaSearch, FaCrosshairs } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import useCurrentLocation from "../hooks/useCurrentLocation";

// 🍕 Add some food illustrations
const foodImages = [
  "https://cdn-icons-png.flaticon.com/512/1046/1046784.png",
  "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
  "https://cdn-icons-png.flaticon.com/512/135/135620.png",
  "https://cdn-icons-png.flaticon.com/512/2921/2921822.png"
];

const GEOAPIFY_API_KEY = "812d749999de462e9df7ca070383975b";

// Fix Leaflet default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
});

function Recenter({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], 20, { animate: true });
    }
  }, [lat, lng, map]);
  return null;
}

export default function CheckoutPage() {
  const { cartItems, userData } = useSelector((s) => s.user);
  const { location, address, loading, error, getCurrentLocation, setLocation, reverseGeocode } =
    useCurrentLocation();

  const [method, setMethod] = useState("cod");
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (address) setSearchText(address);
  }, [address]);

  const subtotal = cartItems.reduce((sum, i) => sum + Number(i.price) * Number(i.quantity), 0);
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const total = subtotal + deliveryFee;

  const forwardGeocode = async (addr) => {
    if (typeof addr !== "string" || !addr.trim()) return;
    try {
      const res = await fetch(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
          addr
        )}&apiKey=${GEOAPIFY_API_KEY}`
      );
      const data = await res.json();
      if (data.features && data.features.length > 0) {
        const { lat, lon } = data.features[0].properties;
        const display_name = data.features[0].properties.formatted;

        setLocation({ lat, lng: lon });
        reverseGeocode(lat, lon);
        setSearchText(display_name);
      }
    } catch (err) {
      console.error("Geoapify forward geocode failed:", err);
    }
  };

  const onDragEnd = (e) => {
    const { lat, lng } = e.target.getLatLng();
    setLocation({ lat, lng });
    reverseGeocode(lat, lng);
  };

  const handlePlaceOrder = async () => {
    try {
      const res = await axios.post(
        `${serverUrl}/api/order/placeorder`,
        {
          address: {
            text: address,
            latitude: location.lat,
            longitude: location.lng
          },
          paymentMethod: method,
          cartItems
        },
        { withCredentials: true }
      );

      const orderId = res.data.orderId;

      if (method === "cod") {
        navigate("/order-placed");
      } else {
        openRazorpay(orderId, res.data.razorOrder);
      }
    } catch (error) {
      console.error(error);
      alert("Order failed!");
    }
  };

  const openRazorpay = (orderId, razorpayOrder) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: razorpayOrder?.amount,
      currency: "INR",
      name: "Vingo",
      description: "Order Payment",
      order_id: razorpayOrder?.id,
      handler: async function (response) {
        try {
          const verifyRes = await axios.post(
            `${serverUrl}/api/order/verify-razorpay`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId
            },
            { withCredentials: true }
          );
          navigate("/order-placed");
        } catch (err) {
          console.error("Payment verify failed", err);
          alert("Payment verification failed!");
        }
      },
      prefill: {
        name: userData?.name,
        email: userData?.email,
        contact: userData?.phone
      },
      theme: {
        color: "#ff4d2d"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // 🍔 Fancy gradient background
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff0e6] via-[#ffe5ec] to-[#ffe6f7] flex items-center justify-center p-6 relative overflow-x-hidden">
      {/* Decorative food images */}
      <img src={foodImages[0]} alt="" className="absolute top-8 left-8 w-20 opacity-30 pointer-events-none animate-float" />
      <img src={foodImages[1]} alt="" className="absolute bottom-8 right-8 w-24 opacity-30 pointer-events-none animate-float2" />
      <img src={foodImages[2]} alt="" className="absolute top-1/2 right-0 w-16 opacity-20 pointer-events-none animate-float3" />
      <img src={foodImages[3]} alt="" className="absolute bottom-0 left-1/2 w-14 opacity-20 pointer-events-none animate-float4" />

      {/* Back Button */}
      <div className="absolute top-[20px] left-[20px] z-[10]">
        <button
          onClick={() => navigate("/")}
          className="bg-white/80 hover:bg-white shadow-lg rounded-full p-2 transition"
        >
          <MdKeyboardBackspace className="w-[25px] h-[25px] text-[#ff4d2d]" />
        </button>
      </div>

      <div className="w-full max-w-[950px] bg-white/90 rounded-3xl shadow-2xl p-8 space-y-8 border-4 border-[#ffb6b6] relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <img src={foodImages[0]} alt="logo" className="w-10 h-10" />
          <h1 className="text-3xl font-extrabold text-[#ff4d2d] drop-shadow">Checkout</h1>
        </div>

        {/* Location Section */}
        <section>
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2 text-gray-800">
            <FaMapMarkerAlt className="text-[#ff4d2d]" /> Delivery Location
          </h2>

          {/* Input + Search + Current Location */}
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="flex-1 border-2 border-[#ffb6b6] rounded-lg p-3 text-base focus:outline-none focus:ring-2 focus:ring-[#ff4d2d] bg-white/80 shadow"
              placeholder="Enter your delivery address"
            />
            <button
              onClick={() => forwardGeocode(searchText)}
              className="bg-[#ff4d2d] hover:bg-[#e64526] text-white px-4 py-3 rounded-lg flex items-center justify-center shadow transition"
            >
              <FaSearch />
            </button>
            <button
              onClick={getCurrentLocation}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg flex items-center justify-center shadow transition"
              title="Use my current location"
            >
              <FaCrosshairs />
            </button>
          </div>

          {/* Map */}
          <div className="rounded-2xl border-2 border-[#ffb6b6] overflow-hidden shadow-lg bg-white/70">
            <div className="h-64 w-full flex items-center justify-center">
              {loading ? (
                <p className="text-gray-500">Fetching current location...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : location.lat && location.lng ? (
                <MapContainer
                  className="h-full w-full"
                  center={[location.lat, location.lng]}
                  zoom={17}
                  scrollWheelZoom={false}
                  style={{ minHeight: "16rem", minWidth: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Recenter lat={location.lat} lng={location.lng} />
                  <Marker position={[location.lat, location.lng]} draggable eventHandlers={{ dragend: onDragEnd }}>
                    <Popup>Drag to adjust location</Popup>
                  </Marker>
                </MapContainer>
              ) : (
                <p className="text-gray-500">Location not available</p>
              )}
            </div>
          </div>
        </section>

        {/* Payment */}
        <section>
          <h2 className="text-xl font-bold mb-3 text-gray-800">Payment Method</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* COD */}
            <button
              type="button"
              onClick={() => setMethod("cod")}
              className={`flex items-center gap-4 rounded-2xl border-2 p-5 text-left transition shadow-lg bg-white/80 ${
                method === "cod"
                  ? "border-[#ff4d2d] bg-gradient-to-r from-[#fff0e6] to-[#ffe5ec] scale-105"
                  : "border-gray-200 hover:border-[#ffb6b6]"
              }`}
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 shadow">
                <MdDeliveryDining className="text-green-600 text-2xl" />
              </span>
              <div>
                <p className="font-bold text-gray-800">Cash on Delivery</p>
                <p className="text-xs text-gray-500">Pay when your food arrives</p>
              </div>
            </button>

            {/* UPI + Card */}
            <button
              type="button"
              onClick={() => setMethod("online")}
              className={`flex items-center gap-4 rounded-2xl border-2 p-5 text-left transition shadow-lg bg-white/80 ${
                method === "online"
                  ? "border-[#ff4d2d] bg-gradient-to-r from-[#ffe6f7] to-[#fff0e6] scale-105"
                  : "border-gray-200 hover:border-[#ffb6b6]"
              }`}
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 shadow">
                <FaMobileAlt className="text-purple-700 text-xl" />
              </span>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 shadow">
                <FaCreditCard className="text-blue-700 text-xl" />
              </span>
              <div>
                <p className="font-bold text-gray-800">UPI / Credit / Debit Card</p>
                <p className="text-xs text-gray-500">Pay securely online</p>
              </div>
            </button>
          </div>
        </section>

        {/* Order Summary */}
        <section>
          <h2 className="text-xl font-bold mb-3 text-gray-800">Order Summary</h2>
          <div className="rounded-2xl border-2 border-[#ffb6b6] bg-gradient-to-r from-[#fff0e6] to-[#ffe5ec] p-6 space-y-3 shadow-lg">
            {cartItems.map((it) => (
              <div key={it.id} className="flex justify-between text-base text-gray-700 font-medium">
                <span>
                  <span className="inline-block w-2 h-2 bg-[#ff4d2d] rounded-full mr-2"></span>
                  {it.name} × {it.quantity}
                </span>
                <span>₹{(it.price * it.quantity).toFixed(2)}</span>
              </div>
            ))}
            <hr className="border-[#ffb6b6] my-2" />
            <div className="flex justify-between font-bold text-gray-800">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Delivery Fee</span>
              <span>{deliveryFee === 0 ? <span className="text-green-600 font-semibold">Free</span> : `₹${deliveryFee}`}</span>
            </div>
            <div className="flex justify-between text-2xl font-extrabold text-[#ff4d2d] pt-2">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
          </div>
        </section>

        <button
          className="w-full bg-gradient-to-r from-[#ff4d2d] to-[#ffb6b6] hover:from-[#e64526] hover:to-[#ffb6b6] text-white py-4 rounded-2xl font-extrabold text-lg shadow-xl tracking-wide transition transform hover:scale-105"
          onClick={handlePlaceOrder}
        >
          {method === "cod" ? "Place Order" : "Pay & Place Order"}
        </button>
      </div>

      {/* Animations for floating food */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px);}
          50% { transform: translateY(-20px);}
          100% { transform: translateY(0px);}
        }
        @keyframes float2 {
          0% { transform: translateY(0px);}
          50% { transform: translateY(15px);}
          100% { transform: translateY(0px);}
        }
        @keyframes float3 {
          0% { transform: translateX(0px);}
          50% { transform: translateX(-15px);}
          100% { transform: translateX(0px);}
        }
        @keyframes float4 {
          0% { transform: translateY(0px);}
          50% { transform: translateY(-10px);}
          100% { transform: translateY(0px);}
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-float2 { animation: float2 5s ease-in-out infinite; }
        .animate-float3 { animation: float3 6s ease-in-out infinite; }
        .animate-float4 { animation: float4 7s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
