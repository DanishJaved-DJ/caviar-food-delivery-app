import React from 'react';

function CategoryCard({ image, name, onClick }) {
  return (
    <div
      className="group w-[130px] h-[130px] md:w-[200px] md:h-[200px] rounded-3xl border-2 border-[#ff4d2d] shrink-0 overflow-hidden bg-gradient-to-br from-[#fff7f0] to-[#ffe5db] shadow-2xl hover:shadow-orange-200 transition-shadow duration-300 cursor-pointer relative"
      onClick={() => onClick()}
    >
      <div className="relative w-full h-full flex flex-col justify-end">
        <img
          src={image}
          alt={name || 'Category'}
          className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-500 blur-[1px] group-hover:blur-0"
          style={{ zIndex: 1 }}
        />
        {/* Decorative food sparkle */}
        <div className="absolute top-3 right-3 z-10">
          <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
            <circle cx="14" cy="14" r="13" fill="#fff7f0" opacity="0.7"/>
            <path d="M14 7v4M14 17v4M7 14h4M17 14h4" stroke="#ff4d2d" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        {/* Glassmorphism label */}
        <div className="relative z-10 flex justify-center">
          <div className="w-[90%] mb-3 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-[#ff4d2d] group-hover:bg-[#ff4d2d]/90 group-hover:text-white transition-all duration-300 text-center text-base font-semibold tracking-wide">
            <span className="drop-shadow">{name}</span>
          </div>
        </div>
        {/* Decorative bottom wave */}
        <svg className="absolute bottom-0 left-0 w-full" height="24" viewBox="0 0 200 24" fill="none">
          <path d="M0 12 Q50 24 100 12 T200 12 V24 H0Z" fill="#ff4d2d" fillOpacity="0.12"/>
        </svg>
      </div>
    </div>
  );
}

export default CategoryCard;