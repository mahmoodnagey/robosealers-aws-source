import { createSlice } from "@reduxjs/toolkit";

export interface MenuState {
  status: any;
}

const initialState: MenuState = {
  status: JSON.parse(localStorage.getItem("isUser") || "false"),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      localStorage.removeItem("isUser");
      state.status = JSON.parse(localStorage.getItem("isUser") || "false");
    },
    logIn: (state) => {
      localStorage.setItem("isUser", JSON.stringify(true));
      state.status = JSON.parse(localStorage.getItem("isUser") || "false");
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
});

// Action creators are generated for each case reducer function
export const { logIn, logOut } = userSlice.actions;

export default userSlice.reducer;
