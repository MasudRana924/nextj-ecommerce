// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // default localStorage
import { createLogger } from "redux-logger";
import { loginSlice } from "./slices/loginSlice";
import cartReducer from './slices/cartSlice';
// Redux Persist Configuration
const persistConfig = {
  key: "root", // The key under which the store is saved
  storage,     // Local storage
  whitelist: ["loggeduser", "token"], // Only persist necessary data
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, loginSlice.reducer);

// Setup logger middleware
const logger = createLogger();

// Configure the store with redux-persist and logger
export const store = configureStore({
  reducer: {
    login: persistedReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for redux-persist
    }).concat(logger), // Add logger for development
});

// Create a persistor
export const persistor = persistStore(store);
