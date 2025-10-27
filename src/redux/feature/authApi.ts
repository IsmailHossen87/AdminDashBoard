import { baseApi } from "../baseApi";


export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createAdmin: builder.mutation({
      query: (authData) => ({
        url: "/admin/create-admin",
        method: "POST",
        body: authData, 
      }),
      invalidatesTags: ["ADMIN"], 
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
    // ✅ Personal admin data
    getProfile: builder.query({
      query: (params) => ({
        url: "/users/profile",
        method: "GET",
        params,
      }),
      providesTags: ["AUTH"],
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

export const { useCreateAdminMutation,useGetAllAdminQuery,useGetProfileQuery, useLoginMutation,useDeleteAdminMutation } = authApi;
