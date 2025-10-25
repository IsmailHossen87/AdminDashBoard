import { baseApi } from "../baseApi";


export const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

 updateSetting: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `/settings/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["SETTING"], 
    }),
      
    getSetting: builder.query({
      query: (params) => ({
        url: "/settings",
        method: "GET",
        params,
      }),
      providesTags: ["SETTING"],
    }),
  }),
  overrideExisting: false, 
});

export const { useGetSettingQuery,useUpdateSettingMutation} = settingApi;
