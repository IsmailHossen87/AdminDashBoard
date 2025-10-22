import { baseApi } from "../baseApi";


export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST request to add a division
    register: builder.mutation({
      query: (authData) => ({
        url: "/auth/register",
        method: "POST",
        body: authData, 
      }),
      invalidatesTags: ["DIVISION"], 
    }),
    
    // GET request to fetch division data
    divisionData: builder.query({
      query: (params) => ({
        url: "/division", 
        method: "GET",    // GET method
        params,           
      }),
      providesTags: ["DIVISION"], 
    }),
  }),
  overrideExisting: false, 
});

export const { useRegisterMutation, useDivisionDataQuery } = authApi;
