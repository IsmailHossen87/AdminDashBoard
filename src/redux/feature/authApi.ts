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
    
    // ✅ Personal admin data
    getAllAdmin: builder.query({
      query: (params) => ({
        url: "/admin/get-admin",
        method: "GET",
        params,
      }),
      providesTags: ["ADMIN"],
    }),
    // DELETE ADMIN
     deleteAdmin: builder.mutation({
      query: (adminId) => ({
        url: `/admin/${adminId}`, 
        method: "DELETE",
      }),
      invalidatesTags: ['ADMIN'] 
    }),
    
  }),
  overrideExisting: false, 
});

export const { useRegisterMutation,useGetAllAdminQuery, useLoginMutation,useDeleteAdminMutation } = authApi;
