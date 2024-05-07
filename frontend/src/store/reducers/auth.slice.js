import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    setUser: (state, action) => {
      console.log(state.user, "comes here");
      state.user.user = action.payload;
    },
  },
});

export const { setLogin, setLogout, setUser } = authSlice.actions;

export default authSlice.reducer;
