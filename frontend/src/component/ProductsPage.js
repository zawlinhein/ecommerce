import React, { useState } from "react";
import { useSelector } from "react-redux";
import { allProducts } from "./slice/productSlice";
import SearchBar from "./productsDisplay/SearchBar";
import ProductCard from "./productsDisplay/ProductCard";
import ProductFilter from "./productsDisplay/ProductFilter";

const ProductsPage = () => {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const productList = useSelector(allProducts);

  const sortedProductList = productList
    .slice()
    .sort((a, b) => new Date(b.meta.createdAt) - new Date(a.meta.createdAt));

  const filterItems = sortedProductList.filter((item) => {
    const textFilter = item.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const categoryFilter = category ? item.category === category : true;
    const priceFilter = priceRange
      ? (priceRange === "0-50" && item.price > 0 && item.price <= 50) ||
        (priceRange === "51-100" && item.price > 50 && item.price <= 100) ||
        (priceRange === "101-200" && item.price > 100 && item.price <= 200) ||
        (priceRange === "200<" && item.price > 200)
      : true;
    return textFilter && categoryFilter && priceFilter;
  });

  const RenderProducts = () => {
    return (
      <>
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
      <SearchBar setSearchText={setSearchText} searchText={searchText} />
      <div className="flex h-screen">
        <div className="w-1/6 border-r-2 bg-gray-200">
          <ProductFilter
            category={category}
            setCategory={setCategory}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
        </div>
        <div className="w-5/6 ">
          <RenderProducts />
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
