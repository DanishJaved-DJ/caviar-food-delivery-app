import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch } from "react-redux";
import { setShop } from "../redux/userSlice";
import { GiKnifeFork } from "react-icons/gi";

export default function AddItem() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("veg");
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = [
    "Snacks",
    "Main Course",
    "Desserts",
    "Pizza",
    "Burgers",
    "Sandwiches",
    "South Indian",
    "North Indian",
    "Chinese",
    "Fast Food",
    "Others",
  ];

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("type", type);
      formData.append("category", category);
      formData.append("image", backendImage);

      const result = await axios.post(
        `${serverUrl}/api/item/additem`,
        formData,
        { withCredentials: true }
      );
      dispatch(setShop(result.data.shop));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-6"
      style={{
        background:
          "linear-gradient(135deg, #fff0ec 60%, #ffe5b4 100%), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1500&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute top-[20px] left-[20px] z-[10] mb-[10px] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <MdKeyboardBackspace className="w-[30px] h-[30px] text-[#ff4d2d] hover:text-[#e64528] transition-colors" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="relative bg-white/70 backdrop-blur-lg border border-[#ff4d2d33] shadow-2xl rounded-3xl p-10 max-w-lg w-full space-y-7 flex flex-col items-center"
        style={{
          boxShadow:
            "0 8px 32px 0 rgba(255,77,45,0.15), 0 1.5px 6px 0 rgba(0,0,0,0.10)",
        }}
      >
        <div className="flex flex-col items-center mb-2">
          <div className="bg-[#ff4d2d] rounded-full p-4 shadow-lg mb-2">
            <GiKnifeFork className="text-white text-4xl" />
          </div>
          <h2
            className="text-3xl font-extrabold text-[#ff4d2d] text-center mb-1"
            style={{ fontFamily: "'Pacifico', cursive" }}
          >
            Add New Food Item
          </h2>
          <p className="text-gray-500 text-center text-sm">
            Make your menu more delicious!
          </p>
        </div>

        <div className="w-full">
          <label className="block text-gray-700 font-semibold mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Enter Food Name"
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#ff4d2d] focus:outline-none bg-white/80 shadow-sm transition"
          />
        </div>

        <div className="w-full">
          <label className="block text-gray-700 font-semibold mb-1">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#ff4d2d] focus:outline-none bg-white/80 shadow-sm transition"
          />
        </div>

        <div className="w-full">
          <label className="block text-gray-700 font-semibold mb-1">
            Category
          </label>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#ff4d2d] focus:outline-none bg-white/80 shadow-sm transition"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="w-full">
          <label className="block text-gray-700 font-semibold mb-1">
            Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImage}
            className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#ff4d2d] focus:outline-none bg-white/80 shadow-sm transition"
          />
          {frontendImage && (
            <img
              src={frontendImage}
              alt="Preview"
              className="mt-3 w-full h-48 object-cover rounded-xl border border-gray-200 shadow-md"
            />
          )}
        </div>

        <div className="w-full">
          <label className="block text-gray-700 font-semibold mb-1">
            Type
          </label>
          <select
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-[#ff4d2d] focus:outline-none bg-white/80 shadow-sm transition"
          >
            <option value="veg">Veg</option>
            <option value="non veg">Non Veg</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#ff4d2d] to-[#ffb347] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 hover:from-[#e64528] hover:to-[#ffb347] transition-all duration-200 text-lg"
        >
          <FaPlus /> Add Item
        </button>
      </form>
      {/* Google Fonts for Pacifico */}
      <link
        href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
        rel="stylesheet"
      />
    </div>
  );
}