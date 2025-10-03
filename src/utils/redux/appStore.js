import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import { persistReducer, persistStore } from "redux-persist";
import stockReducer from "./stockSlice";
import categoryReducer from "./categorySlice";
import userReducer from "./userSlice";

// 1. Configure persist settings
const persistConfig = {
  key: "root", // key for localStorage
  storage, // storage engine (localStorage here)
};

// 2. Combine reducers (if you have multiple slices)
const rootReducer = combineReducers({
  stock: stockReducer,
  category: categoryReducer,
  user: userReducer,
});

// 3. Wrap with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Configure store
const appStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

// 5. Create persistor
export const persistor = persistStore(appStore);

export default appStore;
