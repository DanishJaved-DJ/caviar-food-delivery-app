import React, { useRef, useState, useEffect } from 'react';
import Nav from './Nav';
import { categories } from '../category';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import CategoryCard from './categoryCard';
import FoodCard from './FoodCard';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const { city, shopsOfCity, itemsOfCity, searchItems } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();
  const cateScrollRef = useRef(null);
  const shopScrollRef = useRef(null);
  const [updatedItemsList, setUpdatedItemslist] = useState([]);
  const [showCateLeft, setShowCateLeft] = useState(false);
  const [showCateRight, setShowCateRight] = useState(false);
  const [showShopLeft, setShowShopLeft] = useState(false);
  const [showShopRight, setShowShopRight] = useState(false);

  const handleFilter = (category) => {
    if (category === 'All') {
      setUpdatedItemslist(itemsOfCity);
    } else {
      const filteredList = itemsOfCity?.filter((i) => i.category === category);
      setUpdatedItemslist(filteredList);
    }
  };

  const updateButtons = (ref, setLeft, setRight) => {
    const el = ref.current;
    if (!el) return;
    setLeft(el.scrollLeft > 0);
    setRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  const scrollHandler = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const cateEl = cateScrollRef.current;
    const shopEl = shopScrollRef.current;

    const cateScrollListener = () =>
      updateButtons(cateScrollRef, setShowCateLeft, setShowCateRight);
    const shopScrollListener = () =>
      updateButtons(shopScrollRef, setShowShopLeft, setShowShopRight);

    if (cateEl) {
      updateButtons(cateScrollRef, setShowCateLeft, setShowCateRight);
      cateEl.addEventListener('scroll', cateScrollListener);
    }
    if (shopEl) {
      updateButtons(shopScrollRef, setShowShopLeft, setShowShopRight);
      shopEl.addEventListener('scroll', shopScrollListener);
    }

    return () => {
      if (cateEl) cateEl.removeEventListener('scroll', cateScrollListener);
      if (shopEl) shopEl.removeEventListener('scroll', shopScrollListener);
    };
  }, [categories, shopsOfCity]);

  useEffect(() => {
    setUpdatedItemslist(itemsOfCity);
  }, [itemsOfCity]);

  return (
    <div className="w-screen min-h-screen flex flex-col gap-8 items-center bg-gradient-to-br from-[#fff9f6] via-[#fff0e6] to-[#ffe5d0] overflow-y-auto font-sans">
      <Nav />

      {/* 🔎 Search Results Section on Top */}
      {searchItems && searchItems.length > 0 && (
        <div className="w-full max-w-6xl flex flex-col gap-5 items-start p-8 bg-white/90 shadow-2xl rounded-3xl mt-8 border border-[#ffb88c] backdrop-blur-md animate-fade-in">
          <h1 className="text-[#ff4d2d] text-3xl sm:text-4xl font-extrabold border-b-2 border-[#ffb88c] pb-2 tracking-wide">
            🍽️ Search Results
          </h1>
          <div className="w-full h-auto flex flex-wrap gap-8 justify-center">
            {searchItems.map((item, index) => (
              <FoodCard data={item} key={index} />
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="w-full max-w-6xl flex flex-col gap-6 items-start p-4">
        <h1 className="text-[#ff4d2d] text-3xl sm:text-4xl font-bold drop-shadow-lg mb-2">
          🍕 Inspiration for your first order
        </h1>
        <div className="relative w-full">
          {showCateLeft && (
            <button
              onClick={() => scrollHandler(cateScrollRef, 'left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-br from-[#ff4d2d] to-[#ffb88c] text-white p-3 rounded-full shadow-xl hover:scale-110 transition z-10"
            >
              <FaChevronLeft size={22} />
            </button>
          )}
          <div
            ref={cateScrollRef}
            className="w-full flex overflow-x-auto gap-6 pb-3 scrollbar-thin scrollbar-thumb-[#ffb88c] scrollbar-track-transparent scroll-smooth"
          >
            {categories?.map((cate, index) => (
              <div className="hover:scale-105 transition-transform duration-200" key={index}>
                <CategoryCard
                  name={cate.category}
                  image={cate.image}
                  onClick={() => handleFilter(cate.category)}
                  className="shadow-lg border-2 border-[#ffb88c] rounded-xl bg-white/80 hover:bg-[#fff0e6] transition"
                />
              </div>
            ))}
          </div>
          {showCateRight && (
            <button
              onClick={() => scrollHandler(cateScrollRef, 'right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-br from-[#ff4d2d] to-[#ffb88c] text-white p-3 rounded-full shadow-xl hover:scale-110 transition z-10"
            >
              <FaChevronRight size={22} />
            </button>
          )}
        </div>
      </div>

      {/* Shops */}
      <div className="w-full max-w-6xl flex flex-col gap-6 items-start p-4">
        <h1 className="text-[#ff4d2d] text-3xl sm:text-4xl font-bold drop-shadow-lg mb-2">
          🏪 Best shops in <span className="text-[#ffb88c]">{city}</span>
        </h1>
        <div className="relative max-w-full">
          {showShopLeft && (
            <button
              onClick={() => scrollHandler(shopScrollRef, 'left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-br from-[#ff4d2d] to-[#ffb88c] text-white p-3 rounded-full shadow-xl hover:scale-110 transition z-10"
            >
              <FaChevronLeft size={22} />
            </button>
          )}
          <div
            ref={shopScrollRef}
            className="w-full flex overflow-x-auto gap-6 pb-3 scrollbar-thin scrollbar-thumb-[#ffb88c] scrollbar-track-transparent scroll-smooth"
          >
            {shopsOfCity?.map((shop, index) => (
              <div className="hover:scale-105 transition-transform duration-200" key={index}>
                <CategoryCard
                  name={shop.name}
                  image={shop.image}
                  onClick={() => navigate(`/shop-items/${shop._id}`)}
                  className="shadow-lg border-2 border-[#ffb88c] rounded-xl bg-white/80 hover:bg-[#fff0e6] transition"
                />
              </div>
            ))}
          </div>
          {showShopRight && (
            <button
              onClick={() => scrollHandler(shopScrollRef, 'right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-br from-[#ff4d2d] to-[#ffb88c] text-white p-3 rounded-full shadow-xl hover:scale-110 transition z-10"
            >
              <FaChevronRight size={22} />
            </button>
          )}
        </div>
      </div>

      {/* Food Items */}
      <div className="w-full max-w-6xl flex flex-col gap-6 items-start p-4">
        <h1 className="text-[#ff4d2d] text-3xl sm:text-4xl font-bold drop-shadow-lg mb-2">
          🥗 Suggested items
        </h1>
        {updatedItemsList?.length > 0 && (
          <div className="w-full h-auto flex flex-wrap gap-8 justify-center">
            {updatedItemsList?.map((item, index) => (
              <div className="hover:scale-105 transition-transform duration-200" key={index}>
                <FoodCard data={item} />
              </div>
            ))}
          </div>
        )}
        {updatedItemsList?.length === 0 && (
          <div className="text-center font-bold text-[#ff4d2d] p-6 w-full text-2xl bg-white/80 rounded-xl shadow-lg border-2 border-[#ffb88c] animate-pulse">
            No Items Found
          </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
