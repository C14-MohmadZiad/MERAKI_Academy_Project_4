import { createSlice } from "@reduxjs/toolkit";
export const productSlice = createSlice({
  name: "products",
  initialState: { items: [] },
  reducers: {
    // meanu Of Products
    setProducts: (state, action) => {
      console.log("payload setProducts", action.payload);
      state.items = action.payload;
    },
    // add Product
    addProduct: (state, action) => {
      console.log("payload addProduct", action.payload);
      state.items.push(action.payload);
    },
    //delete product by id 
    removeProduct: (state, action) => {
      console.log("payload removeProduct", action.payload);
      state.items = state.items.filter((p) => p.id !== action.payload);
    },
  },
});

export const { setProducts, addProducts,removeProduct } = productSlice.actions;
export default productSlice.reducer;
