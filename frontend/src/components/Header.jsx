// frontend/src/components/Header.jsx
import { Lock } from "lucide-react";
import icon from "../assets/image/icon.jpg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const navigate = useNavigate();
  const uniqueCount = useSelector((state) => state.cart.uniqueCount);

  return (
    <header className="w-full px-4 sm:px-6 lg:px-8 py-3 bg-white shadow">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Logo + Title */}
        <div className="flex items-center space-x-3 lg:ml-[90px]">
          <div className="relative h-10 w-10 rounded-full overflow-hidden">
            <img src={icon} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-lg sm:text-xl font-semibold">SUN CO.</span>
        </div>
        <button 
          onClick={() => navigate("/panier")} 
          className="flex items-center gap-2 rounded-lg border-2 px-4 py-2 text-sm hover:bg-[#e0e0e0] transition lg:mr-[80px] relative"
        >
          <Lock size={20} className="text-[#201b21]" />
          <span>View Cart</span>
          {uniqueCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {uniqueCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}