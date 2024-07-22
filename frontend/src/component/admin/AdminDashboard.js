import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProducts, editProduct, setProduct } from "../slice/productSlice";
import axios from "axios";
import { fetchToken } from "../Auth";
import ConfirmBox from "./ConfirmBox";
import EditProducts from "./EditProducts";

const AdminDashboard = () => {
  const [editId, setEditId] = useState(-1);
  const dispatch = useDispatch();
  const [editDetails, setEditDetails] = useState(null);
  const [isConfirmBoxOpen, setIsConfirmBoxOpen] = useState(null);
  const productList = useSelector(allProducts);

  const closeConfirmationBox = () => {
    setIsConfirmBoxOpen(null);
  };

  const handleConfirm = () => {
    axios
      .delete(`http://localhost:8000/delete/${isConfirmBoxOpen}`)
      .then((res) => {
        console.log(res);
        const newProductList = productList.filter(
          (item) => item._id !== isConfirmBoxOpen
        );
        dispatch(setProduct(newProductList));
      });
    setIsConfirmBoxOpen(null);
  };

  const handleEdit = (_id) => {
    setEditId(_id);
  };

  return (
    <div className="container w-2/3 mx-auto mt-5">
      <table className="min-w-full bg-white shadow-lg rounded-lg">
        <tbody>
          {productList.map((item) =>
            editId === item._id ? (
              <Edit
                title={item.title}
                stock={item.stock}
                price={item.price}
                setId={setEditId}
                _id={item._id}
                key={item._id}
              />
            ) : (
              <tr key={item._id} className="border-b">
                <td className="px-4 py-2">{item.title}</td>
                <td className="px-4 py-2 w-28">{item.stock}</td>
                <td className="px-4 py-2 w-40">{item.price}</td>
                <td className="px-4 py-2 flex justify-evenly">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={() => handleEdit(item._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={() => setIsConfirmBoxOpen(item._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                    onClick={() => setEditDetails(item._id)}
                  >
                    Edit Details
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      {isConfirmBoxOpen && (
        <ConfirmBox
          closeConfirmationBox={closeConfirmationBox}
          handleConfirm={handleConfirm}
        />
      )}
      {editDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <EditProducts _id={editDetails} setEditDetails={setEditDetails} />
          </div>
        </div>
      )}
    </div>
  );
};

const Edit = ({ title, stock, price, setId, _id }) => {
  const [editStock, setEditStock] = useState(stock);
  const [editPrice, setEditPrice] = useState(price);
  const stockRef = useRef();
  const dispatch = useDispatch();
  const token = fetchToken();

  useEffect(() => {
    stockRef.current.focus();
  }, []);

  const handleSave = () => {
    axios
      .put(
        `http://localhost:8000/edit-product/${_id}`,
        {
          stock: editStock,
          price: editPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        dispatch(editProduct({ _id, editStock, editPrice }));
      })
      .catch((error) => {
        alert("Failed to update resource. Please try again.");
        console.log(error);
      });
    setId(-1);
  };

  return (
    <tr className="border-b">
      <td className="px-4 py-2">{title}</td>
      <td className="px-4 py-2">
        <input
          ref={stockRef}
          type="text"
          value={editStock}
          onChange={(e) => setEditStock(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </td>
      <td className="px-4 py-2">
        <input
          type="text"
          value={editPrice}
          onChange={(e) => setEditPrice(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </td>
      <td className="px-4 py-2 flex justify-evenly">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={() => setId(-1)}
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default AdminDashboard;
