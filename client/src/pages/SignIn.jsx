import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../utils/firebase";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice.js";

// Fancy food illustrations (SVG as background)
const foodBg =
  "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80')";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  // Fancy Food Delivery Theme
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const accentColor = "#ffb347";
  const bgColor = "#fff9f6";
  const borderColor = "#f3e1d8";
  const shadow =
    "0 8px 32px 0 rgba(255, 77, 45, 0.15), 0 1.5px 4px 0 rgba(255, 179, 71, 0.08)";

  const handleSignIn = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (result) {
        const { data } = await axios.post(
          `${serverUrl}/api/auth/googleauth`,
          {
            email: result.user.email,
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
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: `${bgColor} ${foodBg}`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      {/* Overlay for better contrast */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(120deg, rgba(255,77,45,0.08) 0%, rgba(255,179,71,0.10) 100%)",
          zIndex: 0,
        }}
      />
      <div
        className="relative bg-white rounded-3xl shadow-lg w-full max-w-md p-10"
        style={{
          border: `2px solid ${borderColor}`,
          boxShadow: shadow,
          zIndex: 1,
          backdropFilter: "blur(2px)",
        }}
      >
        {/* Brand Heading with food icon */}
        <div className="flex items-center gap-2 mb-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
            alt="food"
            style={{ width: 40, height: 40 }}
          />
          <h1
            className="text-4xl font-extrabold tracking-tight"
            style={{
              color: primaryColor,
              letterSpacing: "1px",
              textShadow: "0 2px 8px #ffb34744",
            }}
          >
            Vingo
          </h1>
        </div>
        <p className="text-gray-700 mb-8 text-lg font-medium">
          Welcome back! <span style={{ color: accentColor }}>Craving</span> something delicious?
          <br />
          <span className="text-sm text-gray-500">
            Sign in to order your favorite food!
          </span>
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full border-2 rounded-xl px-4 py-2 focus:outline-none focus:border-orange-400 bg-[#fffaf7] transition"
            style={{
              borderColor: borderColor,
              fontSize: "1rem",
              boxShadow: "0 1px 4px 0 #ffb34722",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-2">
          <label className="block text-gray-700 font-semibold mb-1">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full border-2 rounded-xl px-4 py-2 pr-12 focus:outline-none focus:border-orange-400 bg-[#fffaf7] transition"
              style={{
                borderColor: borderColor,
                fontSize: "1rem",
                boxShadow: "0 1px 4px 0 #ffb34722",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-orange-400 transition"
              tabIndex={-1}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </button>
          </div>
        </div>

        {/* Forgot Password Link */}
        <div className="text-right mb-4">
          <Link
            to="/forgot-password"
            style={{ color: accentColor }}
            className="text-sm font-semibold hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Sign In Button */}
        <button
          className="w-full font-bold py-3 rounded-xl transition duration-200 shadow-md"
          style={{
            background: `linear-gradient(90deg, ${primaryColor} 60%, ${accentColor} 100%)`,
            color: "white",
            fontSize: "1.1rem",
            letterSpacing: "0.5px",
            boxShadow: "0 2px 8px 0 #ff4d2d33",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background =
              `linear-gradient(90deg, ${hoverColor} 60%, ${accentColor} 100%)`)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.background =
              `linear-gradient(90deg, ${primaryColor} 60%, ${accentColor} 100%)`)
          }
          onClick={handleSignIn}
        >
          🍔 Sign In
        </button>

        {/* Google Auth */}
        <button
          className="w-full mt-4 flex items-center justify-center gap-2 border-2 rounded-xl px-4 py-3 transition duration-200 bg-[#fffaf7] font-semibold shadow-sm hover:shadow-lg"
          style={{
            borderColor: accentColor,
            color: "#444",
            fontSize: "1.05rem",
          }}
          onClick={handleGoogleAuth}
        >
          <FcGoogle size={22} />
          <span>Sign in with Google</span>
        </button>

        {/* No account yet */}
        <p className="mt-8 text-center text-gray-700 text-base">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="font-bold"
            style={{ color: primaryColor }}
          >
            Sign Up
          </Link>
        </p>
        {/* Decorative food emoji row */}
        <div className="flex justify-center gap-2 mt-6 text-2xl opacity-80 select-none pointer-events-none">
          <span role="img" aria-label="pizza">
            🍕
          </span>
          <span role="img" aria-label="burger">
            🍔
          </span>
          <span role="img" aria-label="sushi">
            🍣
          </span>
          <span role="img" aria-label="fries">
            🍟
          </span>
          <span role="img" aria-label="boba">
            🧋
          </span>
        </div>
      </div>
    </div>
  );
}
