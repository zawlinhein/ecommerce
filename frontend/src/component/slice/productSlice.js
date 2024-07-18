import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  cart: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProduct(state, action) {
      return {
        ...state,
        products: action.payload,
      };
    },
    setStock(state, action) {
      const { newStock, productId } = action.payload;
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === productId ? { ...product, stock: newStock } : product
        ),
      };
    },
    editProduct(state, action) {
      const { _id, editStock, editPrice } = action.payload;
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === _id
            ? { ...product, stock: editStock, price: editPrice }
            : product
        ),
      };
    },
    addReview(state, action) {
      const { _id, reviewData } = action.payload;
      return {
        ...state,
        products: state.products.map((product) =>
          product._id === _id
            ? { ...product, reviews: [...product.reviews, reviewData] }
            : product
        ),
      };
    },
    addToCart: {
      reducer(state, action) {
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      },
      prepare(item) {
        return {
          payload: {
            ...item,
            qty: 1,
          },
        };
      },
    },
    updateCart(state, action) {
      return {
        ...state,
        cart: action.payload,
      };
    },
    setQty(state, action) {
      const { newQty, productId } = action.payload;
      return {
        ...state,
        cart: state.cart.map((item) => {
          return item._id === productId ? { ...item, qty: newQty } : item;
        }),
      };
    },
  },
});

export default productSlice.reducer;

export const {
  setProduct,
  setStock,
  addToCart,
  updateCart,
  setQty,
  editProduct,
  addReview,
} = productSlice.actions;

export const allProducts = (state) => state.products.products;
export const cartItems = (state) => state.products.cart;
