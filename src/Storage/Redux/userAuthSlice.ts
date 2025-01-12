import { createSlice } from "@reduxjs/toolkit";

export const emptyUserState = {
  firstName: "",
  lastName: "",
  email: "",
  role: "",
};

export const userAuthSlice = createSlice({
  name: "userAuth",
  initialState: emptyUserState,
  reducers: {
    setLoggedInUser: (state, action) => {
      state.firstName = action.payload.given_name;
      state.lastName = action.payload.family_name;
      state.email = action.payload.email;
    },
  },
});

export const { setLoggedInUser } = userAuthSlice.actions;
export const userAuthReducer = userAuthSlice.reducer;
