import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/firebase.js";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

// Food images for background
const foodImages = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80",
];

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ffd6c2";
  const accentColor = "#ffe5d0";

  const dispatch = useDispatch();

  const handleSignUp = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { fullName, email, mobile, password, role },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      let mobileNumber = mobile;
      if (!mobileNumber) {
        mobileNumber = prompt("Please enter your mobile number:");
        setMobile(mobileNumber);
      }
      const result = await signInWithPopup(auth, provider);
      if (result) {
        const { data } = await axios.post(
          `${serverUrl}/api/auth/googleauth`,
          {
            fullName: result.user.displayName,
            email: result.user.email,
            mobile: mobileNumber,
            role,
          },
          { withCredentials: true }
        );
        dispatch(setUserData(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        background: `linear-gradient(120deg, #fff9f6 60%, #fff0e6 100%)`,
        overflow: "hidden",
      }}
    >
      {/* Decorative food images */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {foodImages.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="food"
            style={{
              position: "absolute",
              width: 120,
              height: 120,
              objectFit: "cover",
              borderRadius: "50%",
              boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
              opacity: 0.18,
              top: i % 2 === 0 ? 30 + i * 60 : "unset",
              bottom: i % 2 !== 0 ? 30 + i * 60 : "unset",
              left: i < 2 ? 30 + i * 80 : "unset",
              right: i >= 2 ? 30 + (i - 2) * 80 : "unset",
              zIndex: 0,
              transition: "transform 0.3s",
            }}
          />
        ))}
      </div>
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10 relative z-10"
        style={{
          border: `2px solid ${borderColor}`,
          background: "rgba(255,255,255,0.95)",
          boxShadow: "0 8px 40px 0 rgba(255,77,45,0.08)",
        }}
      >
        <div className="flex flex-col items-center mb-8">
          <div
            className="rounded-full shadow-lg mb-2"
            style={{
              background: accentColor,
              width: 70,
              height: 70,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 38,
              fontWeight: "bold",
              color: primaryColor,
              letterSpacing: 2,
              border: `2px solid ${primaryColor}`,
              boxShadow: "0 4px 16px 0 rgba(255,77,45,0.10)",
            }}
          >
            🍕
          </div>
          <h1
            className="text-4xl font-extrabold mb-1 tracking-tight"
            style={{
              color: primaryColor,
              fontFamily: "cursive, 'Comic Sans MS', sans-serif",
              letterSpacing: 1,
            }}
          >
              Caviar
          </h1>
          <p className="text-gray-600 text-center text-lg font-medium">
            Create your account to get <span style={{ color: primaryColor }}>delicious</span> food delivered!
          </p>
        </div>

        {/* Full Name */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full border-2 rounded-xl px-4 py-2 focus:outline-none focus:border-orange-500 bg-[#fffaf7] font-medium text-gray-800 transition"
            style={{ borderColor: borderColor }}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border-2 rounded-xl px-4 py-2 focus:outline-none focus:border-orange-500 bg-[#fffaf7] font-medium text-gray-800 transition"
            style={{ borderColor: borderColor }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Mobile Number */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-1">
            Mobile Number
          </label>
          <input
            type="tel"
            placeholder="Enter your mobile number"
            className="w-full border-2 rounded-xl px-4 py-2 focus:outline-none focus:border-orange-500 bg-[#fffaf7] font-medium text-gray-800 transition"
            style={{ borderColor: borderColor }}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="block text-gray-700 font-semibold mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full border-2 rounded-xl px-4 py-2 pr-12 focus:outline-none focus:border-orange-500 bg-[#fffaf7] font-medium text-gray-800 transition"
              style={{ borderColor: borderColor }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-orange-500 transition"
              tabIndex={-1}
            >
              {showPassword ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
            </button>
          </div>
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-1">Role</label>
          <div className="flex gap-2">
            {[
              { r: "user", icon: "🍔" },
              { r: "owner", icon: "🍽️" },
              { r: "deliveryBoy", icon: "🛵" },
            ].map(({ r, icon }) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`flex-1 border-2 rounded-xl px-3 py-2 text-center font-semibold transition-colors flex items-center justify-center gap-1 ${
                  role === r
                    ? "shadow-lg scale-105"
                    : "hover:bg-orange-50"
                }`}
                style={
                  role === r
                    ? {
                        backgroundColor: primaryColor,
                        color: "white",
                        borderColor: primaryColor,
                      }
                    : { borderColor: borderColor, color: "#333" }
                }
              >
                <span>{icon}</span>
                {r === "deliveryBoy" ? "Delivery" : r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Sign Up Button */}
        <button
          className="w-full font-bold py-3 rounded-xl transition duration-200 shadow-md text-lg tracking-wide"
          style={{
            background: `linear-gradient(90deg, ${primaryColor} 60%, #ff7e5f 100%)`,
            color: "white",
            letterSpacing: 1,
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background = `linear-gradient(90deg, ${hoverColor} 60%, #ff9a7b 100%)`)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.background = `linear-gradient(90deg, ${primaryColor} 60%, #ff7e5f 100%)`)
          }
          onClick={handleSignUp}
        >
          Sign Up
        </button>

        {/* Google Auth */}
        <button
          className="w-full mt-4 flex items-center justify-center gap-3 border-2 rounded-xl px-4 py-3 transition duration-200 font-semibold text-lg bg-[#fffaf7] hover:bg-orange-50 shadow"
          style={{ borderColor: borderColor }}
          onClick={handleGoogleAuth}
        >
          <FcGoogle size={26} />
          <span className="font-semibold text-gray-700">
            Sign up with Google
          </span>
        </button>

        {/* Already have account */}
        <p className="mt-8 text-center text-gray-600 text-base">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="font-bold underline underline-offset-2"
            style={{ color: primaryColor }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
