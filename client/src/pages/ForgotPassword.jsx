import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  // Food theme colors
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ffd6c2";
  const accentColor = "#ffe5d0";
  const shadow = "0 8px 32px 0 rgba(255,77,45,0.15)";
  const foodImages = [
    "https://img.icons8.com/color/96/burger.png",
    "https://img.icons8.com/color/96/pizza.png",
    "https://img.icons8.com/color/96/salad.png",
    "https://img.icons8.com/color/96/sushi.png",
    "https://img.icons8.com/color/96/donut.png",
  ];

  const handleSendOtp = async () => {
    try {
      await axios.post(`${serverUrl}/api/auth/sendotp`, { email }, { withCredentials: true });
      setStep(2);
    } catch (error) {
      console.log(error);
    }
  };
  const handleVerifyOtp = async () => {
    try {
      await axios.post(`${serverUrl}/api/auth/verifyotp`, { email, otp }, { withCredentials: true });
      setStep(3);
    } catch (error) {
      console.log(error);
    }
  };
  const handleResetPassword = async () => {
    if (newPassword === confirmPassword) {
      try {
        await axios.post(`${serverUrl}/api/auth/resetpassword`, { email, password: newPassword }, { withCredentials: true });
        navigate("/signin");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Both passwords must match.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4"
      style={{
        background: `linear-gradient(135deg, ${bgColor} 60%, #fff3e6 100%)`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative food images */}
      <div
        style={{
          position: "absolute",
          top: 30,
          left: 30,
          opacity: 0.15,
          zIndex: 0,
        }}
      >
        <img src={foodImages[0]} alt="" style={{ width: 80 }} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          opacity: 0.13,
          zIndex: 0,
        }}
      >
        <img src={foodImages[1]} alt="" style={{ width: 90 }} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 120,
          right: 60,
          opacity: 0.11,
          zIndex: 0,
        }}
      >
        <img src={foodImages[2]} alt="" style={{ width: 60 }} />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 60,
          opacity: 0.12,
          zIndex: 0,
        }}
      >
        <img src={foodImages[3]} alt="" style={{ width: 70 }} />
      </div>

      <div
        className="bg-white rounded-3xl shadow-lg w-full max-w-md p-10 relative"
        style={{
          border: `2px solid ${borderColor}`,
          boxShadow: shadow,
          zIndex: 1,
        }}
      >
        {/* Food Icon */}
        <div className="flex justify-center mb-4">
          <img
            src={foodImages[step - 1]}
            alt="food"
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: accentColor,
              border: `2px solid ${primaryColor}`,
              boxShadow: "0 2px 12px 0 rgba(255,77,45,0.10)",
              padding: 8,
            }}
          />
        </div>
        {/* Heading */}
        <h1
          className="text-3xl font-extrabold mb-2 text-center"
          style={{
            color: primaryColor,
            fontFamily: "'Baloo 2', cursive",
            letterSpacing: 1,
          }}
        >
          Forgot Password
        </h1>
        <p className="text-gray-600 text-center mb-8" style={{ fontSize: 17 }}>
          Reset your password and get back to delicious food!
        </p>

        {/* Step 1: Email */}
        {step === 1 && (
          <>
            <label className="block text-gray-700 font-semibold mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-orange-500 bg-[#fffaf7]"
              style={{
                borderColor: borderColor,
                fontSize: 16,
                transition: "box-shadow 0.2s",
                boxShadow: "0 1px 4px 0 #ffe5d0",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="w-full font-bold py-3 rounded-xl transition duration-200 shadow-md"
              style={{
                background: `linear-gradient(90deg, ${primaryColor} 80%, #ff7e5f 100%)`,
                color: "white",
                fontSize: 17,
                letterSpacing: 1,
                boxShadow: "0 2px 8px 0 #ffd6c2",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = hoverColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = `linear-gradient(90deg, ${primaryColor} 80%, #ff7e5f 100%)`)
              }
              onClick={handleSendOtp}
            >
              Send OTP
            </button>
          </>
        )}

        {/* Step 2: OTP */}
        {step === 2 && (
          <>
            <label className="block text-gray-700 font-semibold mb-1">
              Enter OTP
            </label>
            <input
              type="text"
              placeholder="Enter the OTP sent to your email"
              className="w-full border rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-orange-500 bg-[#fffaf7]"
              style={{
                borderColor: borderColor,
                fontSize: 16,
                transition: "box-shadow 0.2s",
                boxShadow: "0 1px 4px 0 #ffe5d0",
              }}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              className="w-full font-bold py-3 rounded-xl transition duration-200 shadow-md"
              style={{
                background: `linear-gradient(90deg, ${primaryColor} 80%, #ff7e5f 100%)`,
                color: "white",
                fontSize: 17,
                letterSpacing: 1,
                boxShadow: "0 2px 8px 0 #ffd6c2",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = hoverColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = `linear-gradient(90deg, ${primaryColor} 80%, #ff7e5f 100%)`)
              }
              onClick={handleVerifyOtp}
            >
              Verify OTP
            </button>
          </>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <>
            <label className="block text-gray-700 font-semibold mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full border rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-orange-500 bg-[#fffaf7]"
              style={{
                borderColor: borderColor,
                fontSize: 16,
                transition: "box-shadow 0.2s",
                boxShadow: "0 1px 4px 0 #ffe5d0",
              }}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label className="block text-gray-700 font-semibold mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full border rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-orange-500 bg-[#fffaf7]"
              style={{
                borderColor: borderColor,
                fontSize: 16,
                transition: "box-shadow 0.2s",
                boxShadow: "0 1px 4px 0 #ffe5d0",
              }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              className="w-full font-bold py-3 rounded-xl transition duration-200 shadow-md"
              style={{
                background: `linear-gradient(90deg, ${primaryColor} 80%, #ff7e5f 100%)`,
                color: "white",
                fontSize: 17,
                letterSpacing: 1,
                boxShadow: "0 2px 8px 0 #ffd6c2",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = hoverColor)
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = `linear-gradient(90deg, ${primaryColor} 80%, #ff7e5f 100%)`)
              }
              onClick={handleResetPassword}
            >
              Reset Password
            </button>
          </>
        )}

        {/* Back to Login */}
        <p className="mt-8 text-center text-gray-600" style={{ fontSize: 16 }}>
          Remember your password?{" "}
          <Link
            to="/signin"
            className="font-semibold"
            style={{
              color: primaryColor,
              textDecoration: "underline",
              transition: "color 0.2s",
            }}
          >
            Back to Login
          </Link>
        </p>
      </div>
      {/* Google Fonts for food style */}
      <link
        href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@700&display=swap"
        rel="stylesheet"
      />
    </div>
  );
}
