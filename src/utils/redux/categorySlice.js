import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    items: [],
    total: 0,
    loading: false,
  },
  reducers: {
    setCategory: (state, action) => {
      state.items = action.payload.items;
      state.total = action.payload.total;
      state.loading = false;
    },
    removeCategory: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    addCategoryPage: (state, action) => {
      state.items = [...state.items, ...action.payload.items];
      state.total = action.payload.total;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setCategory, addCategoryPage, removeCategory, setLoading } =
  categorySlice.actions;
export default categorySlice.reducer;
