import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
  name: history,
  initialState: {
    items: null,
    loading: false,
  },
  reducers: {
    addHistory: (state, action) => {
      state.items = action.payload;
    },
  },
  setLoading: (state, action) => {
    state.loading = action.payload;
  },
});

export const { addHistory, setLoading } = historySlice.actions;

export default historySlice.reducer;
