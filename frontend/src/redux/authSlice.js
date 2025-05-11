import { createSlice } from "@reduxjs/toolkit";

const raw = localStorage.getItem("user");

const storedUser = raw && raw !== "undefined"
  ? JSON.parse(raw)
  : null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user:       storedUser,
    isLoggedIn: Boolean(storedUser),
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user       = action.payload;
      state.isLoggedIn = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user       = null;
      state.isLoggedIn = false;
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;