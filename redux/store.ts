import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice'
import exerciseReducer from './slices/exerciseSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        exercise: exerciseReducer,
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;