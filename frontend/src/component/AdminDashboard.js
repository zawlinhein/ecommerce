import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProducts, editProduct } from "./productSlice";
import "./admin.css";
import axios from "axios";
import { fetchToken } from "./Auth";

const AdminDashboard = () => {
  const [editId, setEditId] = useState(-1);
  const productList = useSelector(allProducts);

  const handleEdit = (id) => {
    setEditId(id);
  };

  return (
    <div>
      <table className="product-table">
        {productList.map((item) =>
          editId === item.id ? (
            <Edit
              title={item.title}
              stock={item.stock}
              price={item.price}
              setId={setEditId}
              id={item.id}
              _id={item._id}
              key={item.id}
            />
          ) : (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td className="input-column">{item.stock}</td>
              <td className="price-column">{item.price}</td>
              <td className="action-column">
                <button
                  className="action-button"
                  onClick={() => handleEdit(item.id)}
                >
                  Edit
                </button>
                <button className="action-button">Delete</button>
              </td>
            </tr>
          )
        )}
      </table>
    </div>
  );
};

const Edit = ({ title, stock, price, setId, id, _id }) => {
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
        dispatch(editProduct({ id, editStock, editPrice }));
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
