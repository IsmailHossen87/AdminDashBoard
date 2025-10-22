import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice"; 
import { baseApi } from "./baseApi";  

export const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    [baseApi.reducerPath]: baseApi.reducer,  
  },
  // Adding the middleware for RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),  
});

// ✅ Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
