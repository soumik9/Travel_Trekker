import { apiSlice, tagTypes } from "../api/apiSlice";
import toast from 'react-hot-toast';

export const newsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // register room here
        createNews: builder.mutation({
            query: (data) => ({
                url: 'news',
                method: 'POST',
                body: data
            }),
            invalidatesTags: [tagTypes.NEWSES],
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    toast.success(result.data.message);
                } catch (error: any) {
                    toast.error(error.error.data.message);
                }
            }
        }),

        // all rooms endpoint here
        getNews: builder.query({
            query: () => `news`,
            keepUnusedDataFor: 600,
            providesTags: [tagTypes.NEWSES],
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (error: any) {
                    toast.error(error.error.data.message);
                }
            }
        }),

        deleteNews: builder.mutation({
            query: (newsId) => ({
                url: `news/${newsId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.NEWSES],
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    toast.success(result.data.message);
                } catch (error: any) {
                    toast.error(error.error.data.message);
                }
            }
        }),

    })
});

export const {
    useCreateNewsMutation,
    useDeleteNewsMutation,
    useGetNewsQuery
} = newsApi;