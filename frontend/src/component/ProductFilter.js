import React from "react";

const ProductFilter = ({
  category,
  setCategory,
  priceRange,
  setPriceRange,
}) => {
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
        <label className="block mb-2">
          <input
            type="radio"
            name="category"
            value="furniture"
            checked={category === "furniture"}
            onChange={() => setCategory("furniture")}
            className="mr-2"
          />
          Furnitures
        </label>
        <label className="block mb-2">
          <input
            type="radio"
            name="category"
            value="beauty"
            checked={category === "beauty"}
            onChange={() => setCategory("beauty")}
            className="mr-2"
          />
          Beauty
        </label>
        <label className="block mb-2">
          <input
            type="radio"
            name="category"
            value="fragrances"
            checked={category === "fragrances"}
            onChange={() => setCategory("fragrances")}
            className="mr-2"
          />
          Fragrances
        </label>
        {/* Add more categories as needed */}
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
            value="1-50"
            checked={priceRange === "1-50"}
            onChange={() => setPriceRange("1-50")}
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
        {/* Add more price ranges as needed */}
      </div>
    </div>
  );
};

export default ProductFilter;
