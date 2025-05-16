import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import icon from "../assets/image/icon.jpg"; // Chemin correct
import React from "react";
export default function Footer() {
  return (
    <footer className="bg-[#201b21] text-white py-3">
      <div className="max-w-[1180px] mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <div className="relative h-8 w-8 mr-2 rounded-full overflow-hidden">
              <img src={icon} alt=""style={{ width: "100px", height: "auto" }}/>
            </div>
            <span className="text-[20px] font-semibold">SUN CO.</span>
          </div>
          <div className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2023 dot.cards text task. All rights reserved
          </div>
          <div className="flex space-x-4">
            <a href="#" aria-label="Instagram">
              <FaInstagram className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter className="h-5 w-5" />
            </a>
            <a href="#" aria-label="YouTube">
              <FaYoutube className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
