import { baseApi } from "../baseApi";


export const workApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

createWork: builder.mutation({
      query: (body) => ({
        url: "/works",
        method: "POST",
        body,
      }),
      invalidatesTags: ["WORK"],
    }),
createSpare: builder.mutation({
      query: (body) => ({
        url: "/spare-parts",
        method: "POST",
        body,
      }),
      invalidatesTags: ["SPARE"],
    }),
 
    // ✅ All Messages
    workList: builder.query({
      query: () => ({
        url: "/WORKS",
        method: "GET",
      }),
      providesTags: ["SPARE"],
    }),
      
    
  }),
  overrideExisting: false, 
});

export const {useCreateWorkMutation,useCreateSpareMutation ,useWorkListQuery} = workApi;
