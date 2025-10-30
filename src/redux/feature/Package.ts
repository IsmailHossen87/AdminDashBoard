import { baseApi } from "../baseApi";

export const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPackage: builder.mutation({
      query: (data) => ({
        url: "/packages",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PACKAGE"],
    }),
// get All Package
    getAllPackage: builder.query({
      query: () => ({
        url: "/packages",
        method: "GET",
      }),
      providesTags: ["PACKAGE"],
    }),
    // subscription
    getAllSubscription: builder.query({
      query: ({ search }) => ({
        url: `/subscription?searchTerm=${search || ""}`,
        method: "GET",
      }),
      providesTags: ["SUBSCRIPTION"],
    }),
    
    updateSubscription: builder.mutation({
      query: ({ id, data }) => ({
        url: `subscription/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["SUBSCRIPTION"],
    }),
    // Delete
    deletePackage: builder.mutation({
      query: (id: string) => ({
        url: `/packages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PACKAGE"],
    }),
    // Delete
    deleteSubscription: builder.mutation({
      query: (id: string) => ({
        url: `/subscription/cancel/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SUBSCRIPTION"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreatePackageMutation,
  useDeletePackageMutation,
  useGetAllSubscriptionQuery,
  useGetAllPackageQuery,
  useUpdateSubscriptionMutation,
  useDeleteSubscriptionMutation,
} = settingApi;
