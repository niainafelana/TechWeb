import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import des images (utilise ton propre chemin si besoin)
import img1 from "../assets/image/nike.png";
import img2 from "../assets/image/adidas.png";
import img3 from "../assets/image/nike1.png";

const dummyProducts = [
  {
    id: "1",
    name: "Adidas Daily 3.0",
    price: "98.99",
    description: "Heritage Style Sneaker avec un design moderne et confortable.",
    images: [img1, img2, img3],
  },
  {
    id: "2",
    name: "Adidas Skate Black",
    price: "89.50",
    description: "Chaussures de skate classiques avec semelle vulcanisée.",
    images: [img2, img3, img1],
  },
];

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = dummyProducts.find((p) => p.id === id);
  const [currentImage, setCurrentImage] = useState(0);

  if (!product) return <div className="p-6">Produit introuvable</div>;

  const handlePrev = () => {
    setCurrentImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Carrousel */}
        <div className="w-full lg:w-1/2">
          <div className="relative">
            <img
              src={product.images[currentImage]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-xl shadow-md"
            />
          </div>

          {/* Dots d'indicateur */}
          <div className="flex justify-center mt-4 space-x-2">
            {product.images.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`h-2 w-2 rounded-full cursor-pointer ${
                  index === currentImage ? "bg-black" : "bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* Boutons de navigation en dessous des dots */}
          <div className="flex justify-between mt-4 px-4">
            <button
              onClick={handlePrev}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="bg-white p-2 rounded-full shadow-md hover:bg-gray-200"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Détails produit */}
        <div className="flex-1 flex flex-col justify-between gap-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">{product.name}</h1>
            <p className="text-xl text-gray-700 mb-4">{product.price} €</p>
            <p className="text-gray-600 mb-6 leading-relaxed">{product.description}</p>
          </div>
          <button
            onClick={() => navigate("/panier")}
            className="w-full sm:w-auto bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
