import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    purchaseProucts(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
  },
});

export default userSlice.reducer;

export const {} = userSlice.actions;

export const currentUser = (state) => state.users.currentUser;
