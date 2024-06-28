import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../component/productSlice";
import userSlice from "../component/userSlice";

export const store = configureStore({
  reducer: {
    products: productSlice,
    users: userSlice,
  },
});
