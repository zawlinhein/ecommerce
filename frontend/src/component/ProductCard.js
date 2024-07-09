import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const availability = product.stock ? "text-green-600" : "text-red-600";

  const handleBuyNow = () => {
    navigate(`/products/${product._id}`);
  };

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg bg-gray-100">
      <img
        src={product.images[0]}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-800">
          {product.title}
        </div>
        <p className="text-gray-700 text-base">${product.price}</p>
        <p className={`text-sm ${availability}`}>
          {product.stock ? "In Stock" : "Out of Stock"}
        </p>
        <button
          onClick={handleBuyNow}
          disabled={!product.stock}
          className={`mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ${
            !product.stock && "opacity-50 cursor-not-allowed"
          }`}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
