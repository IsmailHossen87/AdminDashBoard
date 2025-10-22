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
    

    
  }),
  overrideExisting: false, 
});

export const { useRegisterMutation, useLoginMutation } = authApi;
