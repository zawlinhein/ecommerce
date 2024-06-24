import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const availability = product.stock ? "green" : "red";
  const handleBuyNow = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div style={styles.card}>
      <img src={product.images[0]} alt={product.title} style={styles.image} />
      <h2 style={styles.title}>{product.title}</h2>
      <p style={styles.price}>${product.price}</p>
      <p style={{ fontSize: "1em", color: availability }}>
        {product.stock ? "In Stock" : "Out of Stock"}
      </p>
      <button
        style={
          product.stock
            ? styles.button
            : { ...styles.button, ...styles.buttonDisabled }
        }
        onClick={handleBuyNow}
        disabled={!product.stock}
      >
        Buy Now
      </button>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    textAlign: "center",
    width: "200px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "auto",
    borderRadius: "8px",
  },
  title: {
    fontSize: "1.25em",
    margin: "16px 0 8px",
  },
  price: {
    fontSize: "1.1em",
    color: "#333",
    margin: "8px 0",
  },
  button: {
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "10px 20px",
    fontSize: "1em",
    cursor: "pointer",
    marginTop: "10px",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
    cursor: "not-allowed",
  },
};

export default ProductCard;
