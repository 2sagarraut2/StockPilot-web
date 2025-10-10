import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "stock",
  initialState: {
    products: [],
    loading: false,
  },
  reducers: {
    insertProduct: (state, action) => {
      state.products = [...state.products, action.payload];
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { insertProduct, setLoading } = productSlice.actions;
export default productSlice.reducer;
