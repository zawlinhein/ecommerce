import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserInfo(state, action) {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    addPurchasedItems(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          purchased_history: [
            ...state.currentUser.purchased_history,
            action.payload,
          ],
        },
      };
    },
  },
});

export default userSlice.reducer;

export const { setUserInfo, addPurchasedItems } = userSlice.actions;

export const currentUser = (state) => state.users.currentUser;
