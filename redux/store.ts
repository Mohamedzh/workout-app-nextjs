import { configureStore } from '@reduxjs/toolkit';
import exerciseReducer from './slices/exerciseSlice'

export const store = configureStore({
    reducer: {
        exercise: exerciseReducer,
    }
})

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;