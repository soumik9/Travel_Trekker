import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export enum tagTypes {
    USER = 'User',
    USERS = 'Users',
    PROFILE = 'Profile',
    HOTEL = 'Hotel',
    HOTELS = 'Hotels',
    ROOM = 'Room',
    ROOMS = 'Rooms',
    FAQ = 'Faq',
    FAQS = 'Faqs',
    NEWS = 'News',
    NEWSES = 'Newses',
}

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
        prepareHeaders: async (headers, { getState }) => {
            // @ts-ignore
            const token = getState()?.auth?.accessToken;
            token && headers.set("Authorization", `Bearer ${token}`)
            return headers;
        }
    }),
    tagTypes: [
        tagTypes.USER,
        tagTypes.USERS,
        tagTypes.PROFILE,
        tagTypes.HOTEL,
        tagTypes.HOTELS,
        tagTypes.ROOM,
        tagTypes.ROOMS,
        tagTypes.FAQ,
        tagTypes.FAQS,
        tagTypes.NEWS,
        tagTypes.NEWSES,
    ],
    endpoints: (builder) => ({}),
})