import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "./stockSlice";

const appStore = configureStore({
  reducer: {
    stock: stockReducer,
  },
});

export default appStore;
