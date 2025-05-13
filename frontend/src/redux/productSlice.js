import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    selectedProduct: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload.data;
    },
    addProduct: (state, action) => {
      state.items.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
});

export const {
  setProducts,
  addProduct,
  removeProduct,
  setSelectedProduct,
  clearSelectedProduct,
} = productSlice.actions;

export default productSlice.reducer;
