import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
import { allProducts } from "../slice/productSlice";
import ProductCard from "../productsDisplay/ProductCard";
import { useNavigate } from "react-router-dom";
import bg from "../bg2.png";

const App = () => {
  const navigate = useNavigate();
  const products = useSelector(allProducts);
  const productsWithAverageRating = products.map((product) => ({
    ...product,
    averageRating:
      product.reviews.length > 0
        ? (
            product.reviews.reduce((sum, review) => sum + review.rating, 0) /
            product.reviews.length
          ).toFixed(1)
        : 0,
  }));
  productsWithAverageRating.sort((a, b) => b.averageRating - a.averageRating);
  const topFiveProducts = productsWithAverageRating.slice(0, 5);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div>
      <div
        className="bg-gray-200 h-96 flex flex-col items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <h1 className="text-5xl font-bold mb-4">Welcome to Our Shop</h1>
        <p className="text-lg mb-6">Find the best products for your needs</p>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          onClick={() => navigate("/products")}
        >
          Shop Now
        </button>
      </div>

      <div className="container mx-auto py-10">
        <h2 className="text-3xl font-bold text-center mb-8">
          Top Rated Products
        </h2>
        <Slider {...carouselSettings}>
          {topFiveProducts.map((product) => (
            <div key={product._id} className="p-4">
              <ProductCard product={product} />
            </div>
          ))}
        </Slider>
      </div>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>Contact me at: zawlin.hein@frontiir.net</p>
          <p>&copy; 2024 E-commerce. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
