import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setProduct } from "../slice/productSlice";
import { useNavigate } from "react-router-dom";
import InputBox from "./InputBox";

const AddProduct = () => {
  const [values, setValues] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    sku: "",
    category: "",
    brand: "",
    selectedFile: null,
  });

  const inputs = [
    { id: "title", name: "title", placeholder: "Title", type: "text" },
    {
      id: "description",
      name: "description",
      placeholder: "Description ",
      type: "text",
    },
    {
      id: "price",
      name: "price",
      placeholder: "Price ",
      type: "text",
      regex: /^\d+(\.\d+)?$/,
    },
    {
      id: "stock",
      name: "stock",
      placeholder: "Stock ",
      type: "text",
      regex: /^\d+$/,
    },
    {
      id: "sku",
      name: "sku",
      placeholder: "Sku ",
      type: "text",
      regex: /^(?:[A-Z]{8}|\d{8}|(?=.*[A-Z])(?=.*\d)[A-Z\d]{8})$/,
    },
    {
      id: "category",
      name: "category",
      placeholder: "Category ",
      categoryList: ["furniture", "beauty", "fragrances"],
    },
    { id: "brand", name: "brand", placeholder: "Brand ", type: "text" },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errMsg, setErrMsg] = useState("");

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (event) => {
    setValues({
      ...values,
      selectedFile: event.target.files[0],
    });
  };

  const getCurrentDate = () => {
    const date = new Date();
    return date.toISOString();
  };

  const formData = new FormData();
  formData.append("title", values.title);
  formData.append("description", values.description);
  formData.append("price", values.price);
  formData.append("stock", values.stock);
  formData.append("sku", values.sku);
  formData.append("category", values.category);
  formData.append("brand", values.brand);
  formData.append("createdAt", getCurrentDate());
  formData.append("file", values.selectedFile);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post("http://localhost:8000/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const fetchData = async () => {
          try {
            const respone = await axios.get(
              "http://localhost:8000/get/allproducts"
            );
            dispatch(setProduct(respone.data));
          } catch (err) {
            console.log(err);
          }
        };

        fetchData();
        alert("Product added successfully!");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setErrMsg("Failed to add product. Please try again.");
      });
  };
  return (
    <div className="container mx-auto w-1/3 p-4">
      <h1 className="text-3xl font-bold mb-4">Add New Product</h1>
      <p className="text-2xl text-red-400">{errMsg}</p>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        {inputs.map((input) => (
          <InputBox
            {...input}
            key={input.id}
            value={values[input.name]}
            handleChange={handleChange}
          />
        ))}
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Image
          </label>
          <input
            id="image"
            type="file"
            onChange={handleFileChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
