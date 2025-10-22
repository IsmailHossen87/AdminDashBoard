import { baseApi } from "../baseApi";


export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST request to add a division
    register: builder.mutation({
      query: (authData) => ({
        url: "/users",
        method: "POST",
        body: authData, 
      }),
      invalidatesTags: ["AUTH"], 
    }),
    Login: builder.mutation({
      query: (authData) => ({
        url: "/auth/login",
        method: "POST",
        body: authData, 
      }),
      invalidatesTags: ["AUTH"], 
    }),
    
    // GET request to fetch division data
    // loginData: builder.query({
    //   query: (params) => ({
    //     url: "/auth/login", 
    //     method: "GET",   
    //     params,           
    //   }),
    //   providesTags: ["AUTH"], 
    // }),
  }),
  overrideExisting: false, 
});

export const { useRegisterMutation, useLoginMutation } = authApi;
