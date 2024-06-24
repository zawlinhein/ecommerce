import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../component/productSlice";

export const store = configureStore({
  reducer: {
    products: productSlice,
  },
});
