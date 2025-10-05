import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "stock",
  initialState: {
    products: [],
  },
  reducers: {
    insertProduct: (state, action) => {
      state.products = [...state.products, action.payload];
    },
  },
});

export const { insertProduct } = productSlice.actions;
export default productSlice.reducer;
