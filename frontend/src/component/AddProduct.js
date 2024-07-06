import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const formData = new FormData();
  formData.append("id", 16);
  formData.append("title", "asdf");
  formData.append("description", "asdf");
  formData.append("price", 9.99);
  formData.append("stock", 100);
  formData.append("sku", "asdf");
  formData.append("category", "asdf");
  formData.append("brand", "asdf");
  formData.append("rating", 4.94);
  formData.append("file", selectedFile);

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/upload/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("File uploaded successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };
  return (
    <div>
      <h2>File Upload</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="image">Upload image</label>
        <input type="file" onChange={handleFileChange} id="image" required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default AddProduct;
