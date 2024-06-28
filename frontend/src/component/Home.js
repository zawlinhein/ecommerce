import React, { useState } from "react";
import { useSelector } from "react-redux";
import { allProducts } from "./productSlice";
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
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            padding: "20px",
          }}
        >
          {filterItems.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
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
