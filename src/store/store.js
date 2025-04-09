// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import dataReducer from "./data/dataSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    data:dataReducer
  },
});
export default store;
