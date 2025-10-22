// src/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice"; 
import apiReducer from "./apiSlice";  

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    api: apiReducer,  
  },
});

// ✅ Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
