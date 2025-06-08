import { useParams } from "react-router-dom";
import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";
import { motion, useInView } from "framer-motion";
import { addToCart } from '../store/cartSlice';
import { useDispatch } from "react-redux";


function ProductPage() {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  
  // Get product from Redux store
  const product = useSelector((state) => 
    state.products.items.find(item => item.ID.toString() === id)
  );

  if (!product) return <div className="p-6">Produit introuvable</div>;

  const handlePrev = () => {
    setCurrentImage((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const dispatch = useDispatch();


  const handleNext = () => {
    setCurrentImage((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  // Refs for animations
  const refTopLeft = useRef(null);
  const refTopRight = useRef(null);
  const refBottom = useRef(null);

  // Visibility detection
  const isInViewTopLeft = useInView(refTopLeft, { once: true, margin: "-100px" });
  const isInViewTopRight = useInView(refTopRight, { once: true, margin: "-100px" });
  const isInViewBottom = useInView(refBottom, { once: true, margin: "-100px" });

  // Animation variants
  const variantsTopLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const variantsTopRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.4 } },
  };

  const variantsBottom = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.8 } },
  };

  return (
    <div className="m-5 lg:w-3/4 lg:mx-auto py-8 space-y-16">
      {/* --- Main Section --- */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left side: image + navigation */}
        <motion.div
          ref={refTopLeft}
          className="lg:w-1/2 flex flex-col items-center"
          variants={variantsTopLeft}
          initial="hidden"
          animate={isInViewTopLeft ? "visible" : "hidden"}
        >
          <div className="w-full bg-gray-100 rounded-xl overflow-hidden shadow-md mb-4">
            <img
              src={product.images[currentImage]?.url}
              alt={product.name}
              className="w-full h-[400px] object-contain p-4"
            />
          </div>

          {/* Dots */}
          <div className="flex justify-center space-x-2 mb-4">
            {product.images.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`h-2 w-2 rounded-full cursor-pointer transition ${
                  index === currentImage ? "bg-black scale-125" : "bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex justify-between w-full px-8">
            <button
              onClick={handlePrev}
              className="bg-gray-100 p-2 rounded-full hover:bg-gray-200"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="bg-gray-100 p-2 rounded-full hover:bg-gray-200"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </motion.div>

        {/* Right side: product details */}
        <motion.div
          ref={refTopRight}
          className="lg:w-1/2 flex flex-col justify-between gap-6 shadow-2xl p-4 lg:p-10 rounded-2xl"
          variants={variantsTopRight}
          initial="hidden"
          animate={isInViewTopRight ? "visible" : "hidden"}
        >
          <div>
            <h2 className="text-2xl lg:p-6 font-bold">{product.marque}</h2>
            <p className="text-gray-600 text-xl mt-1 lg:p-3 lg:px-6">
              {product.name}
            </p>
            <p className="text-2xl font-semibold lg:px-6 text-black mt-2 lg:p-3">
              {product.price} €
            </p>
            <hr className="opacity-8" />
          </div>

          {/* Quantity control */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-10 h-10 text-xl bg-gray-200 rounded hover:bg-gray-300"
            >
              -
            </button>
            <span className="text-xl font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-10 h-10 text-xl bg-gray-200 rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>

          {/* Button */}
          <button 
          onClick={() => dispatch(addToCart({
    id: product.ID,
    name: product.name,
    price: product.price,
    image: product.images[0]?.url,
    quantity: quantity
  }))} 
          className="bg-black text-white text-center py-3 rounded-lg hover:bg-gray-800 transition w-3/4 mx-auto">
            Ajouter au panier
          </button>
        </motion.div>
      </div>

      {/* --- Bottom section --- */}
      <motion.div
        ref={refBottom}
        className="flex flex-col lg:flex-row gap-10"
        variants={variantsBottom}
        initial="hidden"
        animate={isInViewBottom ? "visible" : "hidden"}
      >
        {/* Description */}
        <div className="lg:w-1/2 flex flex-col justify-center text-xl p-6 text-gray-700 text-md leading-relaxed">
          <h3 className="text-2xl font-bold mb-4">Déscription</h3>
          <hr className="opacity-8 pt-2" />
          <p>{product.description}</p>
        </div>

        {/* Additional image */}
        <div className="lg:w-1/2">
          <div className="rounded-xl overflow-hidden shadow-lg bg-gray-100 p-4 h-full">
            {product.images[1]?.url && (
              <img
                src={product.images[1].url}
                alt="Zoom"
                className="w-full h-[350px] object-contain"
              />
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ProductPage;