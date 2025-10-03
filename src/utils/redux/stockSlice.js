import { createSlice } from "@reduxjs/toolkit";

const stockSlice = createSlice({
  name: "stock",
  initialState: {
    items: [],
    displayedStocks: [],
    total: 0,
    loading: false,
  },
  reducers: {
    setStock: (state, action) => {
      state.items = action.payload.items;
      state.displayedStocks = action.payload.items;
      state.total = action.payload.total;
      state.loading = false;
    },
    filterStocks: (state, action) => {
      state.displayedStocks = action.payload.items;
      state.total = action.payload.total;
      state.loading = false;
    },
    resetFilter: (state, action) => {
      state.displayedStocks = state.items;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setStock, filterStocks, resetFilter, setLoading } =
  stockSlice.actions;
export default stockSlice.reducer;
