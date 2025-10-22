// src/redux/baseApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'baseApi', 
  baseQuery: fetchBaseQuery({ baseUrl: 'http://10.10.7.77:8002/api/v1' }), 
  tagTypes: ['DIVISION','AUTH'], 
  endpoints: () => ({}), 
});
