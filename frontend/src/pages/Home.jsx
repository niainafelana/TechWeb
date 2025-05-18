import nikesbvert from "../assets/image/nike.png";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import rectangle1 from "../assets/image/Rectangle1.png";
import { useRef } from "react";
import ProductCard from "../components/ProductCard";

export default function MainContent() {
  const scrollRef = useRef(null);

  const scroll = (offset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  const products = [
    {
      image: rectangle1,
      brand: "Off-White",
      description: 'Out Of Office "Ooo" sneakers',
      price: "$775",
    },
    {
      image: rectangle1,
      brand: "Nike",
      description: "Air Force 1 Low",
      price: "$120",
    },
    {
      image: rectangle1,
      brand: "Adidas",
      description: "Yeezy Boost 350",
      price: "$220",
    },
    {
      image: rectangle1,
      brand: "Puma",
      description: "RS-X3 Puzzle",
      price: "$95",
    },
  ];

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
                className="object-contain w-full h-full"
              />
            </div>
          </div>

          <div className="space-y-4 text-center md:text-left md:order-1">
            <p className="text-orange-500 font-bold text-[36px] md:text-[60px] leading-tight">
              25% OFF
            </p>
            <p className="text-black font-bold text-[40px] md:text-[64px] leading-tight">
              Summer Sale
            </p>
            <p className="text-gray-600 text-[16px] md:text-[20px] leading-snug">
              Discover our summer styles with discount
            </p>
            <button className="bg-black mt-6 text-white hover:bg-black/90 rounded-[10px] w-[220px] h-[50px] font-bold flex items-center justify-center gap-2 mx-auto md:mx-0">
              Shop Now
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Products Section */}
        <div className="w-full max-w-[1400px] mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center md:text-left">
            Explore our latest drops
          </h1>

          {/* Carousel mobile */}
          <div className="relative block md:hidden">
            <div className="flex overflow-hidden gap-4" ref={scrollRef}>
              {products.map((product, index) => (
                <ProductCard
                  key={index}
                  {...product}
                  className="min-w-[240px] flex-shrink-0"
                />
              ))}
            </div>

            {/* Carousel buttons */}
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

          {/* Grid desktop */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} className="h-[350px]" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
