import React, { useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { allProducts, setProduct } from "../slice/productSlice";
import InputBox from "./InputBox";

const EditProducts = ({ _id, setEditDetails }) => {
  const inputRef = useRef();

  const products = useSelector(allProducts);
  const filterProduct = products.filter((product) => product._id === _id);
  const product = filterProduct[0];
  const [values, setValues] = useState({
    title: product.title,
    description: product.description,
    sku: product.sku,
    category: product.category,
    brand: product.brand,
    selectedFile: product.thumbnail,
  });

  const [img, setImg] = useState(product.thumbnail);

  const inputs = [
    { id: "title", name: "title", placeholder: "Title", type: "text" },
    {
      id: "description",
      name: "description",
      placeholder: "Description ",
      type: "text",
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
    setImg(URL.createObjectURL(event.target.files[0]));
  };

  const fileData =
    values.selectedFile === product.thumbnail ? "" : values.selectedFile;

  const formData = new FormData();
  formData.append("title", values.title);
  formData.append("description", values.description);
  formData.append("sku", values.sku);
  formData.append("category", values.category);
  formData.append("brand", values.brand);
  formData.append("file", fileData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    axios
      .put(`http://localhost:8000/edit-product/${_id}`, formData, {
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
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container mx-auto w-full p-4">
      <h1 className="text-3xl font-bold mb-4">Edit Product</h1>
      <p className="text-2xl text-red-400">{errMsg}</p>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Image
          </label>
          <input
            id="image"
            type="file"
            ref={inputRef}
            onChange={handleFileChange}
            required
            className="hidden"
          />
          <img
            src={img}
            onClick={() => inputRef.current.click()}
            className="w-28 h-28 object-cover cursor-pointer border border-indigo-500 rounded-full shadow-sm "
          />
        </div>
        {inputs.map((input) => (
          <InputBox
            {...input}
            key={input.id}
            value={values[input.name]}
            handleChange={handleChange}
          />
        ))}

        <div className="flex space-x-10">
          <button
            onClick={() => setEditDetails(null)}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Edit Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProducts;
