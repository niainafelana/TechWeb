// src/components/ProductCard.jsx
import PropTypes from "prop-types";

export default function ProductCard({ image, brand, description, price, className }) {
  return (
    <div className={`bg-transparent rounded-lg p-2 flex flex-col gap-2 ${className}`}>
      <div className="h-[200px] bg-gray-50 rounded-[18px] p-2">
        <img
          src={image}
          alt={brand}
          className="object-contain w-full h-full"
        />
      </div>
      <div>
        <p className="font-medium">{brand}</p>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="font-medium mt-1">{price}</p>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  className: PropTypes.string,
};
