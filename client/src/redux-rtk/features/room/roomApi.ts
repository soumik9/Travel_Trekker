import { apiSlice, tagTypes } from "../api/apiSlice";
import toast from 'react-hot-toast';

export const roomApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // register room here
        createRoom: builder.mutation({
            query: (data) => ({
                url: 'room',
                method: 'POST',
                body: data
            }),
            invalidatesTags: [tagTypes.ROOMS],
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
        getRooms: builder.query({
            query: () => `room`,
            keepUnusedDataFor: 600,
            providesTags: [tagTypes.ROOMS],
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (error: any) {
                    toast.error(error.error.data.message);
                }
            }
        }),

        // get hotel endpoint here
        getRoom: builder.query({
            query: (roomId) => `room/${roomId}`,
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

        // updating hotel data
        updateRoom: builder.mutation({
            query: ({ roomId, updatedData }) => ({
                url: `hotel/${roomId}`,
                method: 'PATCH',
                body: updatedData,
            }),
            invalidatesTags: (result, error, arg) => [
                tagTypes.ROOMS,
                { type: tagTypes.ROOM, id: arg.roomId }
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

        deleteRoom: builder.mutation({
            query: (roomId) => ({
                url: `room/${roomId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.ROOMS],
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
    useCreateRoomMutation,
    useDeleteRoomMutation,
    useGetRoomQuery,
    useGetRoomsQuery,
    useUpdateRoomMutation
} = roomApi;