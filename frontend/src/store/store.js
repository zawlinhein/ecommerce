import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../component/slice/productSlice";
import userSlice from "../component/slice/userSlice";

export const store = configureStore({
  reducer: {
    products: productSlice,
    users: userSlice,
  },
});
