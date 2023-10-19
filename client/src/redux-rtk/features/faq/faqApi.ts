import { apiSlice, tagTypes } from "../api/apiSlice";
import toast from 'react-hot-toast';

export const faqApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // register faq here
        createFaq: builder.mutation({
            query: (data) => ({
                url: 'faq',
                method: 'POST',
                body: data
            }),
            invalidatesTags: [tagTypes.FAQS],
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    toast.success(result.data.message);
                } catch (error: any) {
                    toast.error(error.error.data.message);
                }
            }
        }),

        // all endpoint here
        getFaqs: builder.query({
            query: () => `faq`,
            keepUnusedDataFor: 600,
            providesTags: [tagTypes.FAQS],
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (error: any) {
                    toast.error(error.error.data.message);
                }
            }
        }),

        // get faq endpoint here
        getFaq: builder.query({
            query: (faqId) => `faq/${faqId}`,
            providesTags: (result, error, arg) => [{
                type: tagTypes.FAQ, id: arg
            }],
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (error: any) {
                    console.log(error?.error?.data?.message);
                }
            }
        }),

        // updating faq data
        updateFaq: builder.mutation({
            query: ({ faqId, updatedData }) => ({
                url: `faq/${faqId}`,
                method: 'PATCH',
                body: updatedData,
            }),
            invalidatesTags: (result, error, arg) => [
                tagTypes.FAQS,
                { type: tagTypes.FAQ, id: arg.faqId }
            ],
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    toast.success(result.data.message);
                } catch (error: any) {
                    toast.error(error.error.data.message);
                }
            }
        }),

        deleteFaq: builder.mutation({
            query: (faqId) => ({
                url: `faq/${faqId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.FAQS],
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
    useCreateFaqMutation,
    useDeleteFaqMutation,
    useGetFaqQuery,
    useGetFaqsQuery,
    useUpdateFaqMutation
} = faqApi;