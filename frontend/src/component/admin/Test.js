import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const products = [
  { id: 1, name: "Product 1", image: "https://via.placeholder.com/200" },
  { id: 2, name: "Product 2", image: "https://via.placeholder.com/200" },
  { id: 3, name: "Product 3", image: "https://via.placeholder.com/200" },
  { id: 4, name: "Product 4", image: "https://via.placeholder.com/200" },
  { id: 5, name: "Product 5", image: "https://via.placeholder.com/200" },
];

const App = () => {
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gray-200 h-screen flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our Shop</h1>
        <p className="text-lg mb-6">Find the best products for your needs</p>
        <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
          Shop Now
        </button>
      </div>

      {/* Product Carousel */}
      <div className="container mx-auto py-10">
        <h2 className="text-3xl font-bold text-center mb-8">Top Products</h2>
        <Slider {...carouselSettings}>
          {products.map((product) => (
            <div key={product.id} className="p-4">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover mb-4"
                />
                <h3 className="text-lg font-bold">{product.name}</h3>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>Contact me at: zawlinnheinn@gmail.com</p>
          <p>&copy; 2024 E-commerce. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
