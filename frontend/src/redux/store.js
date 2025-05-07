import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productSlice";
export default configureStore({
  // reducre contain ojects thats i will bring them from Slices
  reducer: {
    products: productsReducer,
  },
});
