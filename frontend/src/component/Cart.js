import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cartItems,
  updateCart,
  setQty,
  setStock,
  loginFlag,
  toggleLoginFlag,
} from "./productSlice";
import axios from "axios";
import "./cart.css";
import { useNavigate } from "react-router-dom";
import { validateToken } from "./Auth";

const Cart = () => {
  useEffect(() => {
    const checkToken = async () => {
      const data = await validateToken();
      if (data) {
        dispatch(toggleLoginFlag(true));
      } else dispatch(toggleLoginFlag(false));
    };
    checkToken();
  }, []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemsInCart = useSelector(cartItems);
  const flag = useSelector(loginFlag);

  const changeQty = (sign, qty, productId) => {
    if (sign === "+") {
      const newQty = qty + 1;
      dispatch(setQty({ newQty, productId }));
    } else if (sign === "-") {
      const newQty = qty - 1;
      dispatch(setQty({ newQty, productId }));
    }
  };
  ///////////

  const calculateTotalPrice = () => {
    const totalPrice = itemsInCart.reduce(
      (total, item) => total + item.price * item.qty,
      0
    );
    return totalPrice;
  };

  const handleCheckout = (e) => {
    itemsInCart.map((item) => {
      const newStock = item.stock - item.qty;
      const productId = item.id;
      axios
        .put(`http://localhost:8000/put/${item._id}`, { stock: newStock })
        .then((res) => dispatch(setStock({ newStock, productId })))
        .catch((error) => {
          alert("Failed to update resource. Please try again.");
          console.log(error);
        });
    });
    dispatch(updateCart([]));
    navigate("/");
  };

  const removeItem = (itemId) => {
    const newItemsInCart = itemsInCart.filter((item) => item.id !== itemId);
    dispatch(updateCart(newItemsInCart));
  };
  return (
    <div className="cart-container">
      {itemsInCart.map((item) => (
        <div className="cart-item" key={item.id}>
          <div className="item-details">
            <h3>{item.title}</h3>
            <p>Price: ${item.price}</p>
          </div>
          <div>
            <p>Remaining Quantity: {item.stock - item.qty}</p>
          </div>
          <div className="quantity-control">
            <button
              onClick={() => changeQty("-", item.qty, item.id)}
              disabled={item.qty <= 1}
            >
              -
            </button>
            <span>{item.qty}</span>
            <button
              onClick={() => changeQty("+", item.qty, item.id)}
              disabled={item.qty >= item.stock}
            >
              +
            </button>
          </div>
          <p>Total: ${(item.price * item.qty).toFixed(2)}</p>
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <div className="total-price">
        Total Price: ${calculateTotalPrice().toFixed(2)}
      </div>
      <div className="checkout-buttons">
        {flag ? (
          <button onClick={handleCheckout}>Checkout</button>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}
        <button onClick={() => navigate("/")}>Continue Shopping</button>
      </div>
    </div>
  );
};

export default Cart;
