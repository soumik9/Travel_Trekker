import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '../features/api/apiSlice'
// import roleSliceRed from '../features/role/roleSlice'
import authSliceRed from '../features/auth/authSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSliceRed,
        // role: roleSliceRed,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(apiSlice.middleware)
})

// dispatch and store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch