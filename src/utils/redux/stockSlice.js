import { createSlice } from "@reduxjs/toolkit";

const stockSlice = createSlice({
  name: "stock",
  initialState: {
    items: [],
    total: 0,
  },
  reducers: {
    setStock: (state, action) => {
      state.items = action.payload.items;
      state.total = action.payload.total;
    },
    addStock: (state, action) => {
      state.items.push(action.payload);
    },
    removeStock: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setStock, addStock, removeStock } = stockSlice.actions;
export default stockSlice.reducer;
