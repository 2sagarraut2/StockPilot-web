import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { persistReducer, persistStore } from "redux-persist";
import stockReducer from "./stockSlice";
import categoryReducer from "./categorySlice";
import userReducer from "./userSlice";
import productReducer from "./productSlice";
import { useReducer } from "react";

// 🔹 1. Create a persist config only for `user`
const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["user"], // only persist user data from userSlice
};

// 🔹 2. Wrap only `userReducer` with persistReducer
const rootReducer = combineReducers({
  stock: stockReducer,
  category: categoryReducer,
  user: persistReducer(userPersistConfig, userReducer),
  product: productReducer,
});

// 🔹 3. Configure store with combined reducers
const appStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist uses non-serializable values
    }),
});

// 🔹 4. Create persistor
export const persistor = persistStore(appStore);

export default appStore;
