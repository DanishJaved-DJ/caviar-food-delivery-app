import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { updateQuantity, removeFromCart } from "../redux/userSlice.js";
import { MdKeyboardBackspace } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalAmount } = useSelector((state) => state.user);

  const handleIncrease = (id, currentQty) => {
    dispatch(updateQuantity({ id, quantity: currentQty + 1 }));
  };

  const handleDecrease = (id, currentQty) => {
    if (currentQty > 1) {
      dispatch(updateQuantity({ id, quantity: currentQty - 1 }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff0e6] via-[#fff9f6] to-[#ffe5d0] flex justify-center p-6">
      <div className="w-full max-w-[850px]">
        <div className="flex items-center gap-5 mb-8">
          <button
            className="bg-white shadow-lg rounded-full p-2 hover:bg-[#ffe5d0] transition"
            onClick={() => navigate("/")}
          >
            <MdKeyboardBackspace className="w-7 h-7 text-[#ff4d2d]" />
          </button>
          <h1 className="text-3xl font-extrabold text-[#ff4d2d] drop-shadow-lg tracking-wide">
            Your Cart
          </h1>
        </div>
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-24">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
              alt="Empty Cart"
              className="w-32 h-32 opacity-70 mb-4"
            />
            <p className="text-gray-500 text-xl font-medium text-center">
              Your cart is empty.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white p-5 rounded-2xl shadow-xl border border-[#ffe5d0] hover:scale-[1.02] transition"
                >
                  {/* Left Side: Image & Info */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-xl border-4 border-[#ffecd2] shadow"
                      />
                      <span className="absolute -top-2 -right-2 bg-[#ff4d2d] text-white text-xs px-2 py-1 rounded-full font-bold shadow">
                        {item.quantity}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#ff4d2d] mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-1">
                        ₹{item.price} each
                      </p>
                      <p className="font-bold text-gray-900 text-lg">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Right Side: Qty Controls & Remove */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleDecrease(item.id, item.quantity)}
                      className="p-2 bg-[#fff0e6] rounded-full hover:bg-[#ffecd2] border border-[#ffe5d0] shadow"
                    >
                      <FaMinus size={14} className="text-[#ff4d2d]" />
                    </button>
                    <span className="font-semibold text-lg text-[#ff4d2d]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncrease(item.id, item.quantity)}
                      className="p-2 bg-[#fff0e6] rounded-full hover:bg-[#ffecd2] border border-[#ffe5d0] shadow"
                    >
                      <FaPlus size={14} className="text-[#ff4d2d]" />
                    </button>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="p-2 bg-[#ffe5d0] text-[#ff4d2d] rounded-full hover:bg-[#ffbfa3] border border-[#ffbfa3] shadow"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total & Checkout */}
            <div className="mt-8 bg-gradient-to-r from-[#ffecd2] to-[#ffe5d0] p-6 rounded-2xl shadow-lg flex justify-between items-center border border-[#ffe5d0]">
              <h3 className="text-xl font-bold text-[#ff4d2d] flex items-center gap-2">
                <span role="img" aria-label="money">
                  💰
                </span>
                Total Amount
              </h3>
              <span className="text-2xl font-extrabold text-[#ff4d2d] drop-shadow">
                ₹{totalAmount.toFixed(2)}
              </span>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                className="bg-gradient-to-r from-[#ff4d2d] to-[#ffbfa3] text-white px-8 py-4 rounded-xl text-xl font-bold shadow-lg hover:scale-105 hover:from-[#e64526] hover:to-[#ffbfa3] transition"
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
