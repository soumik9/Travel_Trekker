import { apiSlice, tagTypes } from "../api/apiSlice";
import toast from 'react-hot-toast';

export const bookingApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // all endpoint here
        getBookingsById: builder.query({
            query: () => `booking/by-auth-id`,
            keepUnusedDataFor: 600,
            providesTags: [tagTypes.BOOKINGS],
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (error: any) {
                    toast.error(error.error.data.message);
                }
            }
        }),

        // all endpoint here
        getBookings: builder.query({
            query: () => `booking`,
            keepUnusedDataFor: 600,
            providesTags: [tagTypes.BOOKINGS],
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (error: any) {
                    toast.error(error.error.data.message);
                }
            }
        }),

        // register room here
        createBooking: builder.mutation({
            query: (data) => ({
                url: 'booking',
                method: 'POST',
                body: data
            }),
            invalidatesTags: [tagTypes.BOOKINGS],
            async onQueryStarted(arg, { queryFulfilled }) {
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
    useCreateBookingMutation,
    useGetBookingsByIdQuery,
    useGetBookingsQuery
} = bookingApi;