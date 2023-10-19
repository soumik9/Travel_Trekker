import { apiSlice, tagTypes } from "../api/apiSlice";
import toast from 'react-hot-toast';

export const reviewApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // register hotel here
        createReview: builder.mutation({
            query: (data) => ({
                url: 'review',
                method: 'POST',
                body: data
            }),
            invalidatesTags: [tagTypes.REVIEWS],
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    toast.success(result.data.message);
                } catch (error: any) {
                    toast.error(error.error.data.message);
                }
            }
        }),

        // all hotels endpoint here
        getReviews: builder.query({
            query: () => `review`,
            keepUnusedDataFor: 600,
            providesTags: [tagTypes.REVIEWS],
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (error: any) {
                    toast.error(error.error.data.message);
                }
            }
        }),

    })
});

export const {
    useCreateReviewMutation,
    useGetReviewsQuery
} = reviewApi;