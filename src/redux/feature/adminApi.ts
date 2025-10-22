import { baseApi } from "../baseApi";

export const adminAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Create Admin
    createAdmin: builder.mutation({
      query: (authData) => ({
        url: "/admin/create-admin",
        method: "POST",
        body: authData,
      }),
      invalidatesTags: ["ADMIN"],
    }),
    createCarBrand: builder.mutation({
      query: (authData) => ({
        url: "/car-brand-countries",
        method: "POST",
        body: authData,
      }),
      invalidatesTags: ["ADMIN"],
    }),

    // ✅ Dashboard data
    getDashBoard: builder.query({
      query: () => ({
        url: "admin/dashboard",
        method: "GET",
      }),
      providesTags: ["ADMIN"],
    }),

    // ✅ All Messages
    allMessage: builder.query({
      query: () => ({
        url: "/message",
        method: "GET",
      }),
      providesTags: ["ADMIN"],
    }),
    // ✅ All Brand
    allBrand: builder.query({
      query: () => ({
        url: "/car-brand-countries/unpaginated",
        method: "GET",
      }),
      providesTags: ["ADMIN"],
    }),
    // Brand
    // ✅ Single Brand fetch
    getBrandById: builder.query({
      query: (brandId: string) => ({
        url: `/car-brand-countries/${brandId}`,
        method: "GET",
      }),
      providesTags: ["ADMIN"],
    }),

    // ✅ Delete Message
    deleteMessage: builder.mutation({
      query: (messageId: string) => ({
        url: `/message/${messageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ADMIN"], 
    }),
    // ✅ Delete Message
    deleteBrand: builder.mutation({
      query: (messageId: string) => ({
        url: `/brand/${messageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ADMIN"], 
    }),

    // ✅ Personal admin data
    personalData: builder.query({
      query: (params) => ({
        url: "/admin/get-admin",
        method: "GET",
        params,
      }),
      providesTags: ["ADMIN"],
    }),
  }),
  // CreateCar
  

  overrideExisting: false,
});

// ✅ Export Hooks
export const {
  useGetDashBoardQuery,
  useCreateCarBrandMutation,
  useCreateAdminMutation,
  useDeleteBrandMutation,
  usePersonalDataQuery,
  useAllMessageQuery,
  useDeleteMessageMutation,
  useAllBrandQuery,
  useGetBrandByIdQuery
} = adminAPI;
