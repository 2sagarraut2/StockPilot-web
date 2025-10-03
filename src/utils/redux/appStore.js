import { configureStore } from "@reduxjs/toolkit";
import stockReducer from "./stockSlice";
import categoryReducer from "./categorySlice";
import userReducer from "./userSlice";

const appStore = configureStore({
  reducer: {
    stock: stockReducer,
    category: categoryReducer,
    user: userReducer,
  },
});

export default appStore;
