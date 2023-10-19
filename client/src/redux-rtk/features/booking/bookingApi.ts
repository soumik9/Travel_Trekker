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

        // get hotel endpoint here
        getBooking: builder.query({
            query: (orderId) => `booking/${orderId}`,
            providesTags: (result, error, arg) => [{
                type: tagTypes.ROOM, id: arg
            }],
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (error: any) {
                    console.log(error?.error?.data?.message);
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

        // updating hotel data
        updateBookingStatusAdmin: builder.mutation({
            query: ({ bookingId, updatedData }) => ({
                url: `booking/update-status-admin/${bookingId}`,
                method: 'PATCH',
                body: updatedData,
            }),
            invalidatesTags: (result, error, arg) => [
                tagTypes.BOOKINGS,
                { type: tagTypes.BOOKING, id: arg.bookingId }
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
    })
});

export const {
    useCreateBookingMutation,
    useGetBookingsByIdQuery,
    useGetBookingsQuery,
    useGetBookingQuery,
    useUpdateBookingStatusAdminMutation
} = bookingApi;