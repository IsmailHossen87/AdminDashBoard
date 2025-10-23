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
    // CREATE BRAND
    createCarBrand: builder.mutation({
      query: (authData) => ({
        url: "/images",
        method: "POST",
        body: authData,
      }),
      invalidatesTags: ["ADMIN"],
    }),
    // CREATE MODEL
    createCarModel: builder.mutation({
      query: (body) => ({
        url: "/car-models",
        method: "POST",
        body
      }),
       invalidatesTags: ["CARS"],
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
    // ✅ All Brand - Contries
    allBrand: builder.query({
      query: () => ({
        url: "/car-brands",
        method: "GET",
      }),
      providesTags: ["ADMIN"],
    }),
    // ✅ All CarModel
    allCarModel: builder.query({
      query: () => ({
        url: "car-models/unpaginated",
        method: "GET",
      }),
      providesTags: ["CARS"],
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
    // ✅ Delete Car Brand
    deleteBrand: builder.mutation({
      query: (messageId: string) => ({
        url: `/car-brands/${messageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ADMIN"],
    }),
    // ✅ Delete Car Model
    deletecarModel: builder.mutation({
      query: (messageId: string) => ({
        url: `/car-models/${messageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CARS"],
    }),

  }),


  overrideExisting: false,
});

// ✅ Export Hooks
export const {
  useGetDashBoardQuery,
  useCreateCarBrandMutation,
  useCreateCarModelMutation,
  useCreateAdminMutation,
  useAllCarModelQuery,
  useDeleteBrandMutation,
  useAllMessageQuery,
  useDeleteMessageMutation,
  useDeletecarModelMutation,
  useAllBrandQuery,
  useGetBrandByIdQuery,
} = adminAPI;
