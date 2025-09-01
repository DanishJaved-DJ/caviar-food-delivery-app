import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import axios from "axios";
import { serverUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setShop } from "../redux/userSlice";

export default function EditItem() {
  const { shop } = useSelector((state) => state.user);
  const { itemId } = useParams();
  const [selectedItem, setSelectedItem] = useState(null);
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
        `${serverUrl}/api/item/edititem/${itemId}`,
        formData,
        { withCredentials: true }
      );
      const updatedItem = result.data;
      const updatedItems = shop.items.map((item) =>
        item._id == updatedItem._id ? updatedItem : item
      );
      dispatch(setShop({ ...shop, items: updatedItems }));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSelectedItem = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/item/getbyid/${itemId}`,
        { withCredentials: true }
      );
      setSelectedItem(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSelectedItem();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (selectedItem) {
      setName(selectedItem.name);
      setPrice(selectedItem.price);
      setFrontendImage(selectedItem.image);
      setCategory(selectedItem.category);
      setType(selectedItem.type);
    }
  }, [selectedItem]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#fff0ec] via-[#fff5e6] to-[#ffe0d2] p-6 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#ffb199] opacity-30 rounded-full blur-3xl z-0"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#ff4d2d] opacity-20 rounded-full blur-3xl z-0"></div>
      <div className="absolute top-[20px] left-[20px] z-[10] mb-[10px] cursor-pointer" onClick={() => navigate("/")}>
        <MdKeyboardBackspace className="w-[32px] h-[32px] text-[#ff4d2d] hover:scale-110 transition-transform duration-200" />
      </div>
      <form
        onSubmit={handleSubmit}
        className="relative bg-white/90 border border-[#ff4d2d33] shadow-2xl rounded-3xl p-10 max-w-lg w-full space-y-8 z-10 backdrop-blur-md"
        style={{
          boxShadow: "0 8px 32px 0 rgba(255, 77, 45, 0.15), 0 1.5px 8px 0 rgba(255, 177, 153, 0.10)",
        }}
      >
        <div className="flex flex-col items-center mb-2">
          <div className="bg-gradient-to-tr from-[#ff4d2d] to-[#ffb199] p-2 rounded-full shadow-lg mb-2">
            <FaPlus className="text-white text-2xl" />
          </div>
          <h2 className="text-3xl font-extrabold text-[#ff4d2d] text-center mb-1 drop-shadow">
            Edit Food Item
          </h2>
          <p className="text-gray-500 text-sm text-center">
            Make your food look irresistible!
          </p>
        </div>

        <div>
          <label className="block text-[#ff4d2d] font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Enter Food Name"
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border-2 border-[#ffb199] rounded-xl p-3 focus:ring-2 focus:ring-[#ff4d2d] focus:outline-none bg-[#fffaf7] text-gray-800 font-medium transition"
          />
        </div>

        <div>
          <label className="block text-[#ff4d2d] font-semibold mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            className="w-full border-2 border-[#ffb199] rounded-xl p-3 focus:ring-2 focus:ring-[#ff4d2d] focus:outline-none bg-[#fffaf7] text-gray-800 font-medium transition"
          />
        </div>

        <div>
          <label className="block text-[#ff4d2d] font-semibold mb-1">Category</label>
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border-2 border-[#ffb199] rounded-xl p-3 focus:ring-2 focus:ring-[#ff4d2d] focus:outline-none bg-[#fffaf7] text-gray-800 font-medium transition"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[#ff4d2d] font-semibold mb-1">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImage}
            className="w-full border-2 border-[#ffb199] rounded-xl p-3 focus:ring-2 focus:ring-[#ff4d2d] focus:outline-none bg-[#fffaf7] text-gray-800 font-medium transition"
          />
          {frontendImage && (
            <div className="relative mt-3 flex justify-center">
              <img
                src={frontendImage}
                alt="Preview"
                className="w-full h-48 object-cover rounded-2xl border-4 border-[#ffb199] shadow-lg transition-transform duration-300 hover:scale-105"
                style={{
                  boxShadow: "0 4px 16px 0 rgba(255, 77, 45, 0.10)",
                }}
              />
              <span className="absolute top-2 right-2 bg-[#ff4d2d] text-white text-xs px-2 py-1 rounded-full shadow">
                Preview
              </span>
            </div>
          )}
        </div>

        <div>
          <label className="block text-[#ff4d2d] font-semibold mb-1">Type</label>
          <select
            name="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="w-full border-2 border-[#ffb199] rounded-xl p-3 focus:ring-2 focus:ring-[#ff4d2d] focus:outline-none bg-[#fffaf7] text-gray-800 font-medium transition"
          >
            <option value="veg">Veg</option>
            <option value="non veg">Non Veg</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-tr from-[#ff4d2d] to-[#ffb199] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 hover:from-[#e64528] hover:to-[#ffb199] transition-all text-lg tracking-wide"
        >
          <FaPlus className="text-white" />
          Save Changes
        </button>
      </form>
    </div>
  );
}