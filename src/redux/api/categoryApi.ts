import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query({
      query: (data) => {
        return {
          url: "/category",
          method: "GET",
          params: data,
        };
      },
      providesTags: ["product"],
    }),
    addCategory: builder.mutation({
      query: (data) => {
        return {
          url: "/category",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["product"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => {
        return {
          url: `/category/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["product"],
    }),
    updateCategory: builder.mutation({
      query: (options) => {
        return {
          url: `/category/${options._id}`,
          method: "PUT",
          body: options,
        };
      },
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
