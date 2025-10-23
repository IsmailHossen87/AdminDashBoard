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

    // // ✅ Create Car Brand
    // createCarBrand: builder.mutation({
    //   query: (body) => ({
    //     url: "/image",
    //     method: "POST",
    //     body,
    //   }),
    //   invalidatesTags: ["ADMIN"],
    // }),
    // ✅ Create Car Brand
    createCarBrand: builder.mutation({
      query: (body) => ({
        url: "/car-brands",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ADMIN"],
    }),

    // ✅ Create Car Model
    createCarModel: builder.mutation({
      query: (body) => ({
        url: "/car-models",
        method: "POST",
        body,
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

    // ✅ All Workshops
    allWorkShop: builder.query({
      query: () => ({
        url: "/workshops",
        method: "GET",
      }),
      providesTags: ["WORKSHOP"],
    }),

    // ✅ All Brands
    allBrand: builder.query({
      query: () => ({
        url: "/car-brands",
        method: "GET",
      }),
      providesTags: ["ADMIN"],
    }),

    // ✅ All Car Models
    allCarModel: builder.query({
      query: () => ({
        url: "car-models/unpaginated",
        method: "GET",
      }),
      providesTags: ["CARS"],
    }),

    // ✅ All Cars
    allCar: builder.query({
      query: () => ({
        url: "cars",
        method: "GET",
      }),
      providesTags: ["CAR"],
    }),
    // ✅ All Country
    allCountry: builder.query({
      query: () => ({
        url: "car-brand-countries/unpaginated",
        method: "GET",
      }),
      providesTags: ["COUNTRY"],
    }),

// ---------------------------------------
    // ✅ Single Brand Fetch
    getBrandById: builder.query({
      query: (brandId: string) => ({
        url: `/car-brand-countries/${brandId}`,
        method: "GET",
      }),
      providesTags: ["ADMIN"],
    }),

    // ✅ Single Workshop Fetch
    getSingleWorkShop: builder.query({
      query: (workShopId: string) => ({
        url: `/workshops/${workShopId}`,
        method: "GET",
      }),
      providesTags: ["WORKSHOP"],
    }),

    // ✅ Single Car Fetch
    getSingleCar: builder.query({
      query: (carId: string) => ({
        url: `/cars/${carId}`,
        method: "GET",
      }),
      providesTags: ["CAR"],
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
      query: (brandId: string) => ({
        url: `/car-brands/${brandId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ADMIN"],
    }),

    // ✅ Delete Car Model
    deletecarModel: builder.mutation({
      query: (modelId: string) => ({
        url: `/car-models/${modelId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CARS"],
    }),

    // ✅ Delete Workshop
    deleteWorkShop: builder.mutation({
      query: (id: string) => ({
        url: `/workshops/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["WORKSHOP"],
    }),

    // ✅ Delete Car
    deleteCar: builder.mutation({
      query: (id: string) => ({
        url: `/cars/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CAR"],
    }),

    // ✅ Update Workshop
    updateWorkShop: builder.mutation({
      query: ({ id, payload }: { id: string; payload: any }) => ({
        url: `/workshops/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["WORKSHOP"],
    }),
  }),

  overrideExisting: false,
});

export const {
  // ✅ Create
  useCreateAdminMutation,
  useCreateCarBrandMutation,
  useCreateCarModelMutation,

  // ✅ Get All
  useGetDashBoardQuery,
  useAllBrandQuery,
  useAllCarModelQuery,
  useAllWorkShopQuery,
  useAllMessageQuery,
  useAllCarQuery,
  useAllCountryQuery,

  // ✅ Get Single
  useGetBrandByIdQuery,
  useGetSingleWorkShopQuery,
  useGetSingleCarQuery,

  // ✅ Delete
  useDeleteMessageMutation,
  useDeleteBrandMutation,
  useDeletecarModelMutation,
  useDeleteWorkShopMutation,
  useDeleteCarMutation,

  // ✅ Update
  useUpdateWorkShopMutation,
} = adminAPI;
