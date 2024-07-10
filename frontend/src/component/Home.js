import React, { useState } from "react";
import { useSelector } from "react-redux";
import { allProducts } from "./slice/productSlice";
import SearchBar from "./SearchBar";
import ProductCard from "./ProductCard";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const productList = useSelector(allProducts);

  const filterItems = productList.filter((item) => {
    return item.title.toLowerCase().includes(searchText.toLowerCase());
  });

  const RenderProducts = () => {
    return (
      <>
        <SearchBar setSearchText={setSearchText} searchText={searchText} />
        <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-4 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Products List
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {filterItems.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </div>
      </>
    );
  };
  return (
    <div>
      <RenderProducts />
    </div>
  );
};

export default Home;
