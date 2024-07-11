import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: {},
  allUsers: [],
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
    setAllUsersInfo(state, action) {
      return {
        ...state,
        allUsers: action.payload,
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

export const { setUserInfo, addPurchasedItems, setAllUsersInfo } =
  userSlice.actions;

export const currentUser = (state) => state.users.currentUser;
export const allUsers = (state) => state.users.allUsers;
