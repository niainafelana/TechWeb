import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../store/productsSlice";
import nikesbvert from "../assets/image/nike.png";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "../components/ProductCard";

export default function MainContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: products, status, error } = useSelector((state) => state.products);
  const scrollRef = useRef(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="flex space-x-2">
          <span className="dot bounce delay-0"></span>
          <span className="dot bounce delay-1"></span>
          <span className="dot bounce delay-2"></span>
        </div>

        <style>{`
          .dot {
            width: 16px;
            height: 16px;
            background-color: #3498db;
            border-radius: 50%;
            display: inline-block;
            animation: bounce 1.4s infinite ease-in-out;
          }
          .delay-0 { animation-delay: 0s; }
          .delay-1 { animation-delay: 0.2s; }
          .delay-2 { animation-delay: 0.4s; }

          @keyframes bounce {
            0%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-20px); }
          }
        `}</style>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <p className="text-red-500 text-xl">Error: {error}</p>
      </div>
    );
  }

  return (
    <main className="flex-1 flex items-center justify-center px-4 md:px-10">
      <div className="container pb-8 space-y-8 w-full">
        {/* Hero Section */}
        <div className="max-w-[1400px] mx-auto mt-4 rounded-[40px] bg-gray-100 p-6 md:p-12 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4 min-h-[400px] md:min-h-[520px]">
          <div className="w-full flex justify-center md:order-2">
            <div className="relative w-[250px] h-[180px] sm:w-[300px] sm:h-[220px] md:w-[400px] md:h-[300px]">
              <img
                src={nikesbvert}
                alt="Green and white sneaker"
                loading="lazy"
                className="object-contain w-full h-full opacity-0 animate-fadeIn animation-delay-300"
                onLoad={(e) => e.currentTarget.classList.remove("opacity-0")}
              />
            </div>
          </div>

          <div className="space-y-4 text-center md:text-left md:order-1">
            <p className="text-orange-500 font-bold text-[36px] md:text-[60px] leading-tight animate-fadeIn animation-delay-500">
              25% OFF
            </p>
            <p className="text-black font-bold text-[40px] md:text-[64px] leading-tight animate-fadeIn animation-delay-700">
              Summer Sale
            </p>
            <p className="text-gray-600 text-[16px] md:text-[20px] leading-snug animate-fadeIn animation-delay-900">
              Discover our summer styles with discount
            </p>
            <button className="bg-black mt-6 text-white hover:bg-black/90 rounded-[10px] w-[220px] h-[50px] font-bold flex items-center justify-center gap-2 mx-auto md:mx-0 animate-fadeIn animation-delay-1100">
              Shop Now
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Products Section */}
        <div className="w-full max-w-[1400px] mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left animate-fadeIn animation-delay-1300">
            Explore our latest drops
          </h1>

          {/* Carousel - mobile */}
          <div className="relative block md:hidden">
            <div className="flex overflow-x-auto gap-4 scroll-smooth" ref={scrollRef}>
              {products.map((product, index) => (
                <div 
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  className="cursor-pointer min-w-[240px] flex-shrink-0"
                >
                  <ProductCard
                    {...product}
                    className="animate-fadeIn"
                    style={{ animationDelay: `${1400 + index * 100}ms` }}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-4 px-4">
              <button
                onClick={() => scroll(-300)}
                className="bg-white p-2 rounded-full shadow-md"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => scroll(300)}
                className="bg-white p-2 rounded-full shadow-md"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Grid - desktop */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product, index) => (
              <div
                key={product.ID}
                onClick={() => handleProductClick(product.ID)}
                className="cursor-pointer"
              >
                <ProductCard
                  {...product}
                  className="h-[350px] animate-fadeIn"
                  style={{ animationDelay: `${1400 + index * 100}ms` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation-name: fadeIn;
          animation-duration: 0.6s;
          animation-fill-mode: forwards;
          opacity: 0;
        }
        .animation-delay-300 { animation-delay: 300ms; }
        .animation-delay-500 { animation-delay: 500ms; }
        .animation-delay-700 { animation-delay: 700ms; }
        .animation-delay-900 { animation-delay: 900ms; }
        .animation-delay-1100 { animation-delay: 1100ms; }
        .animation-delay-1300 { animation-delay: 1300ms; }
      `}</style>
    </main>
  );
}