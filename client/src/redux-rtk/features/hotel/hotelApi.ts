import { apiSlice, tagTypes } from "../api/apiSlice";
import toast from 'react-hot-toast';

export const hotelApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // register hotel here
        createHotel: builder.mutation({
            query: (data) => ({
                url: 'hotel',
                method: 'POST',
                body: data
            }),
            invalidatesTags: [tagTypes.HOTELS],
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
        getHotels: builder.query({
            query: () => `hotel`,
            keepUnusedDataFor: 600,
            providesTags: [tagTypes.HOTELS],
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (error: any) {
                    toast.error(error.error.data.message);
                }
            }
        }),

        // get hotel endpoint here
        getHotel: builder.query({
            query: (hotelId) => `hotel/${hotelId}`,
            providesTags: (result, error, arg) => [{
                type: tagTypes.HOTEL, id: arg
            }],
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (error: any) {
                    console.log(error?.error?.data?.message);
                }
            }
        }),

        // updating hotel data
        updateHotel: builder.mutation({
            query: ({ hotelId, updatedData }) => ({
                url: `hotel/${hotelId}`,
                method: 'PATCH',
                body: updatedData,
            }),
            invalidatesTags: (result, error, arg) => [
                tagTypes.HOTELS,
                { type: tagTypes.HOTEL, id: arg.hotelId }
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

        deleteHotel: builder.mutation({
            query: (hotelId) => ({
                url: `hotel/${hotelId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.HOTELS],
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
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
    useGetHotelQuery,
    useGetHotelsQuery,
    useCreateHotelMutation,
    useUpdateHotelMutation,
    useDeleteHotelMutation,
} = hotelApi;