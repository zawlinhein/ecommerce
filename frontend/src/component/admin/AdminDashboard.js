import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProducts, editProduct, setProduct } from "../slice/productSlice";
import "./admin.css";
import axios from "axios";
import { fetchToken } from "../Auth";
import ConfirmBox from "./ConfirmBox";

const AdminDashboard = () => {
  const [editId, setEditId] = useState(-1);
  const dispatch = useDispatch();
  const [isConfirmBoxOpen, setIsConfirmBoxOpen] = useState(0);
  const productList = useSelector(allProducts);

  const closeConfirmationBox = () => {
    setIsConfirmBoxOpen(0);
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
    setIsConfirmBoxOpen(0);
  };

  const handleEdit = (_id) => {
    setEditId(_id);
  };

  return (
    <div>
      <table className="product-table container mx-auto mt-5 rounded-lg shadow-lg shadow-gray-200">
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
              <tr key={item._id}>
                <td>{item.title}</td>
                <td className="input-column">{item.stock}</td>
                <td className="price-column">{item.price}</td>
                <td className="action-column">
                  <button
                    className="action-button"
                    onClick={() => handleEdit(item._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="action-button"
                    onClick={() => setIsConfirmBoxOpen(item._id)}
                  >
                    Delete
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
        console.log(res.data);
        dispatch(editProduct({ _id, editStock, editPrice }));
      })
      .catch((error) => {
        alert("Failed to update resource. Please try again.");
        console.log(error);
      });
    setId(-1);
  };

  return (
    <tr>
      <td>{title}</td>
      <td className="input-column">
        <input
          ref={stockRef}
          type="text"
          value={editStock}
          onChange={(e) => setEditStock(e.target.value)}
        />
      </td>
      <td className="price-column">
        <input
          type="text"
          value={editPrice}
          onChange={(e) => setEditPrice(e.target.value)}
        />
      </td>
      <td className="action-column">
        <button className="action-button" onClick={handleSave}>
          Save
        </button>
        <button className="action-button" onClick={() => setId(-1)}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default AdminDashboard;
