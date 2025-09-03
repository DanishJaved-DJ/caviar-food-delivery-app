import axios from "axios";
import { useState } from "react";
import { FaUtensils } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { serverUrl } from "../App.jsx";
import { setShop } from "../redux/userSlice.js";
import { useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";

export default function EditShop() {
    const { shop } = useSelector(state => state.user);
    const [name, setName] = useState(shop?.name || "");
    const [city, setCity] = useState(shop?.city || "");
    const [state, setState] = useState(shop?.state || "");
    const [address, setAddress] = useState(shop?.address || "");
    const [frontendImage, setFrontendImage] = useState(shop?.image || "");
    const [backendImage, setBackendImage] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setBackendImage(file);
        setFrontendImage(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("city", city);
            formData.append("state", state);
            if (backendImage) {
                formData.append("image", backendImage);
            }
            formData.append("address", address);
            const result = await axios.post(`${serverUrl}/api/shop/editshop`, formData, { withCredentials: true });
            dispatch(setShop(result.data));
            navigate('/')
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#fff7e6] via-[#ffe0b2] to-[#ffb347] relative overflow-hidden">
            {/* Decorative food shapes */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-[#ff4d2d]/20 rounded-full blur-2xl z-0 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#ffb347]/30 rounded-full blur-3xl z-0 animate-pulse"></div>
            <div className="absolute top-10 right-10 w-24 h-24 bg-[#ff4d2d]/10 rounded-full blur-xl z-0"></div>
            <div className="max-w-lg w-full bg-white/90 shadow-2xl rounded-3xl p-10 border border-orange-200 z-10 backdrop-blur-md">
                <div className="flex flex-col items-center mb-8">
                    <div className="bg-gradient-to-tr from-[#ff4d2d] to-[#ffb347] p-5 rounded-full mb-4 shadow-lg animate-bounce">
                        <FaUtensils className="text-white w-16 h-16 drop-shadow-xl" />
                    </div>
                    <h2 className="text-4xl font-extrabold text-[#ff4d2d] drop-shadow-sm tracking-tight mb-2">
                        {shop ? "Edit Shop" : "Add Shop"}
                    </h2>
                    <p className="text-lg text-gray-500 font-medium">Make your shop stand out with a delicious look!</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-base font-semibold text-[#ff4d2d] mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            placeholder="Enter Shop Name"
                            className="w-full px-5 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffb347] bg-orange-50/40 text-lg font-medium transition"
                        />
                    </div>
                    <div>
                        <label className="block text-base font-semibold text-[#ff4d2d] mb-2">Shop Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full px-5 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffb347] bg-orange-50/40 text-lg font-medium transition"
                        />
                        {frontendImage && (
                            <div className="mt-4 flex justify-center">
                                <img
                                    src={frontendImage}
                                    alt="Shop Preview"
                                    className="w-60 h-40 object-cover rounded-2xl border-4 border-[#ffb347] shadow-lg"
                                />
                            </div>
                        )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-base font-semibold text-[#ff4d2d] mb-2">City</label>
                            <input
                                type="text"
                                name="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                                placeholder="Enter city"
                                className="w-full px-5 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffb347] bg-orange-50/40 text-lg font-medium transition"
                            />
                        </div>
                        <div>
                            <label className="block text-base font-semibold text-[#ff4d2d] mb-2">State</label>
                            <input
                                type="text"
                                name="state"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                                placeholder="Enter state"
                                className="w-full px-5 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffb347] bg-orange-50/40 text-lg font-medium transition"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-base font-semibold text-[#ff4d2d] mb-2">Address</label>
                        <textarea
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            placeholder="Enter address"
                            rows="3"
                            className="w-full px-5 py-3 border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ffb347] bg-orange-50/40 text-lg font-medium transition"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-tr from-[#ff4d2d] to-[#ffb347] text-white px-8 py-4 rounded-xl font-bold text-xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-200 tracking-wide"
                    >
                        Save
                    </button>
                </form>
            </div>
            <div
                className="absolute top-6 left-6 z-20 cursor-pointer bg-white/80 rounded-full p-2 shadow-lg hover:bg-orange-100 transition"
                onClick={() => navigate("/")}
                title="Back"
            >
                <MdKeyboardBackspace className="w-7 h-7 text-[#ff4d2d]" />
            </div>
        </div>
    );
}