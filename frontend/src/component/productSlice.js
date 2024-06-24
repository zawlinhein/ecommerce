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
          product.id === Number(productId)
            ? { ...product, stock: newStock }
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
        cart: state.cart.map((item) =>
          item.id === productId ? { ...item, qty: newQty } : item
        ),
      };
    },
  },
});

export default productSlice.reducer;

export const { setProduct, setStock, addToCart, updateCart, setQty } =
  productSlice.actions;

export const allProducts = (state) => state.products.products;
export const cartItems = (state) => state.products.cart;
