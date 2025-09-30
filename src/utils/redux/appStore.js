import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "./stockSlice";
import categoryReducer from "./categorySlice";

const appStore = configureStore({
  reducer: {
    stock: stockReducer,
    category: categoryReducer,
  },
});

export default appStore;
