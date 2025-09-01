import React from 'react'
import { FaUtensils } from "react-icons/fa";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#ff4d2d] via-[#ff784d] to-[#ffb199] w-full text-white py-8 sm:py-10 mt-auto shadow-inner">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        
        {/* Logo & Tagline */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-white rounded-full p-2 shadow-lg">
              <FaUtensils className="w-7 h-7 text-[#ff4d2d]" />
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-wide drop-shadow-lg">Caviar</h3>
          </div>
          <span className="text-orange-50 text-xs sm:text-sm italic font-medium">
            Savor the Speed. Taste the Joy.
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap gap-4 justify-center">
          <a href="#" className="hover:text-[#fff4e6] transition font-semibold">Home</a>
          <a href="#" className="hover:text-[#fff4e6] transition font-semibold">Menu</a>
          <a href="#" className="hover:text-[#fff4e6] transition font-semibold">About</a>
          <a href="#" className="hover:text-[#fff4e6] transition font-semibold">Contact</a>
        </nav>

        {/* Socials & Copyright */}
        <div className="flex flex-col items-center md:items-end gap-2">
          <div className="flex gap-3 mb-1">
            <a href="#" aria-label="Instagram" className="hover:scale-110 transition">
              <FaInstagram className="w-5 h-5 text-white hover:text-[#ff4d2d]" />
            </a>
            <a href="#" aria-label="Facebook" className="hover:scale-110 transition">
              <FaFacebookF className="w-5 h-5 text-white hover:text-[#ff4d2d]" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:scale-110 transition">
              <FaTwitter className="w-5 h-5 text-white hover:text-[#ff4d2d]" />
            </a>
          </div>
          <p className="text-xs sm:text-sm text-orange-100">
            &copy; {new Date().getFullYear()} Caviar Food Delivery. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
