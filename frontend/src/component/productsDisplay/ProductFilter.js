import React from "react";

const ProductFilter = ({
  category,
  setCategory,
  priceRange,
  setPriceRange,
}) => {
  const categoryList = ["furniture", "beauty", "fragrances"];
  return (
    <div className="w-full max-w-xs p-4">
      <h3 className="text-xl font-bold mb-4">Filters</h3>

      <div className="mb-4">
        <h4 className="text-lg font-semibold mb-2">Category</h4>
        <label className="block mb-2">
          <input
            type="radio"
            name="category"
            value=""
            checked={category === ""}
            onChange={() => setCategory("")}
            className="mr-2"
          />
          All
        </label>
        {categoryList.map((item) => (
          <label className="block mb-2" key={item}>
            <input
              type="radio"
              name="category"
              value={item}
              checked={category === item}
              onChange={() => setCategory(item)}
              className="mr-2"
            />
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </label>
        ))}
      </div>

      <div>
        <h4 className="text-lg font-semibold mb-2">Price Range</h4>
        <label className="block mb-2">
          <input
            type="radio"
            name="priceRange"
            value=""
            checked={priceRange === ""}
            onChange={() => setPriceRange("")}
            className="mr-2"
          />
          All
        </label>
        <label className="block mb-2">
          <input
            type="radio"
            name="priceRange"
            value="0-50"
            checked={priceRange === "0-50"}
            onChange={() => setPriceRange("0-50")}
            className="mr-2"
          />
          $0 - $50
        </label>
        <label className="block mb-2">
          <input
            type="radio"
            name="priceRange"
            value="51-100"
            checked={priceRange === "51-100"}
            onChange={() => setPriceRange("51-100")}
            className="mr-2"
          />
          $51 - $100
        </label>
        <label className="block mb-2">
          <input
            type="radio"
            name="priceRange"
            value="101-200"
            checked={priceRange === "101-200"}
            onChange={() => setPriceRange("101-200")}
            className="mr-2"
          />
          $101 - $200
        </label>
        <label className="block mb-2">
          <input
            type="radio"
            name="priceRange"
            value="200<"
            checked={priceRange === "200<"}
            onChange={() => setPriceRange("200<")}
            className="mr-2"
          />
          over $200
        </label>
      </div>
    </div>
  );
};

export default ProductFilter;
