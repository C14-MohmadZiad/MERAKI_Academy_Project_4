import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

import productsReducer from "./productSlice";
import cartReducer from "./cartSlice";
export default configureStore({
  // reducre contain ojects thats i will bring them from Slices
  reducer: {
    auth: authReducer,

    products: productsReducer,
    cart: cartReducer,
  },
});
