import { apiSlice, tagTypes } from "../api/apiSlice";
import toast from 'react-hot-toast';

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // all users endpoint here
        getUsers: builder.query({
            query: () => `user`,
            keepUnusedDataFor: 600,
            providesTags: [tagTypes.USERS],
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (error: any) {
                    toast.error(error.error.data.message);
                }
            }
        }),

        // get user endpoint here
        getUser: builder.query({
            query: (userId) => `user/${userId}`,
            providesTags: (result, error, arg) => [{
                type: tagTypes.USER, id: arg
            }],
            async onQueryStarted(arg, { queryFulfilled }) {
                try {
                    await queryFulfilled;
                } catch (error: any) {
                    console.log(error?.error?.data?.message);
                }
            }
        }),

        // updating user data
        updateUser: builder.mutation({
            query: ({ userId, updatedData }) => ({
                url: `user/${userId}`,
                method: 'PATCH',
                body: updatedData,
            }),
            invalidatesTags: (result, error, arg) => [
                tagTypes.USERS,
                { type: tagTypes.USER, id: arg.userId }
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

        // updating user data
        updateUserByAuthenticated: builder.mutation({
            query: ({ updatedData }) => ({
                url: `user/authenticated-id`,
                method: 'PATCH',
                body: updatedData,
            }),
            invalidatesTags: (result, error, arg) => [
                tagTypes.USERS,
                { type: tagTypes.USER, id: arg.userId }
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

        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `user/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [tagTypes.USERS],
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
    useGetUsersQuery,
    useGetUserQuery,
    useUpdateUserMutation,
    useUpdateUserByAuthenticatedMutation,
    useDeleteUserMutation,
} = userApi;